import ThreadCart from "@/components/cards/ThreadCart";
import {currentUser} from "@clerk/nextjs/server";
import {fetchUser} from "@/lib/actions/user.actions";
import {redirect} from "next/navigation";

import Comment from "@/components/forms/Comment";
import {fetchThreadById} from "@/lib/actions/thread.actions";

async function Page({params}: { params: { id: string } }) {
    if (!params.id) return null;
    const user = await currentUser();
    if (!user) return null;

    const userInfo = await fetchUser(user.id);
    if (!userInfo?.onboarded) redirect('/onboarding');

    const threadInfo = await fetchThreadById(params.id);
    return (
        <section className="relative">
            <div className="">
                <ThreadCart
                    key={threadInfo.id}
                    id={threadInfo.id}
                    currentUserId={user?.id || ""}
                    parentId={threadInfo.parentId}
                    content={threadInfo.text}
                    author={threadInfo.author}
                    community={threadInfo.community}
                    createdAt={threadInfo.createdAt}
                    comments={threadInfo.children}
                    isComment

                />
            </div>
            <div className="mt-7">
                <Comment
                    threadId={params.id}
                    currentUserImg={userInfo.image}
                    currentUserId={JSON.stringify(userInfo._id)}
                />
            </div>
            <div className="mt-10 gap-4 md:gap-10 flex flex-col">
                {threadInfo.children.map((childItem: any) => (
                    <ThreadCart key={childItem.id}
                                id={childItem.id}
                                currentUserId={childItem?.id || ""}
                                parentId={childItem.parentId}
                                content={childItem.text}
                                author={childItem.author}
                                community={childItem.community}
                                createdAt={childItem.createdAt}
                                comments={childItem.children}
                                isComment
                    />

                ))}
            </div>
        </section>
    );
}

export default Page;