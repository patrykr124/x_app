"use server";

import {revalidatePath} from "next/cache";
import User from "../models/user.model";
import connectToDB from "../mongoose";
import Thread from "@/lib/models/thread.model";
import {FilterQuery, SortOrder} from "mongoose";
import {search} from "effect/String";

export async function updateUser(
    username: string,
    name: string,
    bio: string,
    image: string,
    userId: string,
    path: string
): Promise<void> {
    await connectToDB();

    try {
        await User.findOneAndUpdate(
            {id: userId},
            {username: username.toLowerCase(), name, bio, image, onboarded: true},
            {upsert: true}
        );

        if (path === "/profile/edit") {
            revalidatePath(path);
        }
    } catch (error) {
        console.error(error);
        throw new Error("Failed to update user");
    }
}

export async function fetchUser(userId: string) {
    try {
        await connectToDB();
        const userFetch = await User.findOne({id: userId});
        return userFetch;
    } catch (error: any) {
        console.error(error);
        throw new Error("Failed to fetch user");
    }
}


export async function fetchUserPost(userId: string) {
    try {
        await connectToDB()
        const userPostFetch = await User.findOne({id: userId})
            .populate({
                path: "threads",
                model: Thread,
                populate: {
                    path: "children",
                    model: Thread,
                    populate: {
                        path: "author",
                        model: User,
                        select: 'name image id'
                    }
                }
            });
        return userPostFetch;
    } catch (err) {
        throw new Error("Failed to fetch user");
    }
}


export async function fetchAllUsers({userId, searchString = "", pageNumber = 1, pageSize = 10, sortBy = "desc"}: {
    userId: string,
    searchString: string,
    pageNumber?: number,
    pageSize?: number,
    sortBy: SortOrder,
}) {


    try {
        connectToDB();
        const skipAmount = (pageNumber - 1) * pageSize;
        const regex = new RegExp(searchString, "i");

        const query: FilterQuery<typeof User> = {
            id: {$ne: userId}
        }

        if (searchString.trim() !== "") {
            query.$or = [
                {username: {$regex: regex}},
                {name: {$regex: regex}}
            ]
        }

        const sortOptions = {createdAt: sortBy};
        const userQuery = User.find(query).sort(sortOptions).skip(skipAmount).limit(pageSize);

        const totalUserCount = await User.countDocuments(query)

        const users = await userQuery.exec();

        const isNext = totalUserCount > skipAmount + users.length;
        return { users, isNext };

    } catch (err) {
        throw new Error("Failed to fetch all users");
    }
}





