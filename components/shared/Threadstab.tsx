import ThreadCart from "@/components/cards/ThreadCart";
import {fetchUserPosts} from "@/lib/actions/user.actions";

interface Props {
    currentUserId: string;
    accountId: string;
    accountType: string;
}

async function Threadstab({currentUserId, accountId, accountType}: Props) {
    //fetch profile threads

    const post = await fetchUserPosts(accountId)


    return (
        <section className="mt-9 flex flex-col gap-10">

            {post.threads.map((thread: any) => (
                <ThreadCart
                    key={thread.id}
                    id={thread.id}
                    currentUserId={currentUserId}
                    parentId={thread.parentId}
                    content={thread.text}
                    author={accountType === "User" ? {
                        name: post.name,
                        image: post.image,
                        id: post.id
                    } : {name: thread.author.name, image: thread.author.image, id: thread.author.id}}
                    community={thread.community}
                    createdAt={thread.createdAt}
                    comments={thread.children}/>

            ))}
        </section>
    );
}

export default Threadstab;