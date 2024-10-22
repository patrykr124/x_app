"use server";
import {revalidatePath} from "next/cache";
import Thread from "../models/thread.model";
import User from "../models/user.model";
import connectToDB from "../mongoose";
import {threadId} from "node:worker_threads";


interface Params {
    text: string;
    author: string;
    communityId: string | null;
    path: string;
}

export async function createThread({text, author, communityId, path,}: Params) {
    try {
        connectToDB();

        const createdThread = await Thread.create({
            text,
            author,
            community: null,
        });

        await User.findByIdAndUpdate(author, {
            $push: {threads: createdThread._id},
        });

        revalidatePath(path);
    } catch (error) {
        console.error(error);
        throw new Error("Failed to create thread");
    }
}

export async function fetchPost(pageNumber = 1, pageSize = 20) {
    connectToDB();

    const postsQuery = Thread.find({parentId: {$eq: null}})
        .sort({createdAt: "desc"})
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .populate({path: "author", model: User})
        .populate({
            path: "children",
            populate: {
                path: "author",
                model: User,
                select: "_id name parentId image",
            },
        });

    const totalPostsCount = await Thread.countDocuments({
        parentId: {$eq: null},
    });

    const posts = await postsQuery.exec();
    const isNext = totalPostsCount > pageSize * posts.length;

    return {posts, isNext};
}

export async function fetchThread(threadId: string) {
    connectToDB();

    try {
        const threadInfo = await Thread.findById(threadId).populate({
            path: 'author',
            model: User,
            select: "_id id name image"
        }).populate({
            path: "children",
            populate: [
                {
                    path: "author",
                    model: User,
                    select: "_id id name parentId image"
                },
                {
                    path: "children",
                    model: Thread,
                    populate: {
                        path: 'author',
                        model: User,
                        select: "_id id name parentId image",
                    }
                }
            ]
        }).exec();
        return threadInfo;
    } catch (error) {
        throw new Error("Failed to fetch thread");
    }


}


export async function addCommentToThread(
    threadId: string,
    commentText: string,
    userId: string,
    path: string,
) {
    connectToDB();
    try {

        const originalThreads = await Thread.findById(threadId);

        if (!originalThreads) {
            throw new Error("Failed to add comment");
        }

        const newComment = new Thread({
            text: commentText,
            author: userId,
            parentId: threadId,
        });

        const savedComment = await newComment.save();
        originalThreads.children.push(savedComment._id);
        await originalThreads.save();

        revalidatePath(path);
    } catch (err) {
        console.error("Error while adding comment:", err);
        throw new Error("Unable to add comment");
    }
}


export async function getActivities(userId: string) {

    try {
        await connectToDB();

        //find all threads created by the user
        const userThreads = await Thread.find({author: userId});

        //find all comments/post created by the user
        const childrenThreadIds = userThreads.reduce((acc, thread) => {
            return acc.concat(thread.children)
        }, [])

        const replies = await Thread.find({
            _id: {$in: childrenThreadIds},
            author: {$ne: userId}
        }).populate({path: "author", model: User, select: 'name image _id'})

        return replies;
    } catch (error) {
        console.error("Error while getting activities:", error);
        throw new Error("Failed to get activities");
    }
}
