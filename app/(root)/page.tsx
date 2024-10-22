import {fetchPost} from "@/lib/actions/thread.actions";

import ThreadCart from "@/components/cards/ThreadCart";
import {currentUser} from "@clerk/nextjs/server";

import Link from "next/link";


export default async function Home() {

    const threadFetch = await fetchPost(1, 30);
    const user = await currentUser();


    return (
        <section className="mt-9 flex flex-col gap-10">
            {threadFetch.posts.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-10">
                    <p className="no-result">No threads found</p>
                    <Link href="/create-thread" className="bg-primary-500 text-white px-6 py-4 rounded-xl">Create a
                        Thread!</Link>
                </div>

            ) : (
                <>
                    {threadFetch.posts.map((post) => (
                        <ThreadCart
                            key={post.id}
                            id={post.id}
                            currentUserId={user?.id || ""}
                            parentId={post.parentId}
                            content={post.text}
                            author={post.author}
                            community={post.community}
                            createdAt={post.createdAt}
                            comments={post.children}
                            isComment
                        />
                    ))}
                </>
            )}
        </section>

    );
}
