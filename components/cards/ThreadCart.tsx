import Link from "next/link";
import Image from "next/image";
import {formatDateString} from "@/lib/utils";

interface Props {
    id: string;
    currentUserId: string;
    parentId: string;
    content: string;
    author: {
        name: string;
        image: string;
        id: string;
    }
    community: {
        id: string;
        name: string;
        image: string;
    }
    createdAt: string;
    comments: {
        author: {
            image: string;
        }
    }[]
    isComment?: boolean;
}

function ThreadCart({id, currentUserId, parentId, content, author, community, createdAt, comments, isComment}: Props) {
    return (
        <article className={`flex w-full flex-col rounded-xl bg-dark-2 p-7 `}>
            <div className="flex items-start justify-between">
                <div className="flex w-full flex-1 flex-row gap-8">
                    <div className="flex flex-col items-center">
                        <Link href={`/profile/${author.id}`} className="relative h-11 w-11">
                            <Image src={author.image} alt='profile' fill className="cursor-pointer rounded-full"/>
                        </Link>
                        <div className="thread-card_bar"/>
                    </div>
                    <div className="flex w-full flex-col">
                        <Link href={`/profile/${author.id}`} className="w-fit">
                            <h4 className="cursor-pointer text-base1-semibold text-light-1">{author.name}</h4>
                        </Link>
                        <div className="flex">
                            <p className="mt-2 text-small-regular text-light-2 break-all whitespace-pre-wrap">{content}</p>
                        </div>
                        <div className="mt-5 flex flex-col gap-3">
                            <div className="flex gap-3.5">
                                <Image className="cursor-pointer object-contain" src="/assets/heart-gray.svg"
                                       alt="heart" width={24} height={24}/>
                                <Link href={`/thread/${id}`}>
                                    <Image
                                        className="cursor-pointer object-contain" src="/assets/reply.svg" alt="reply"
                                        width={24} height={24}/>
                                </Link>
                                <Image className="cursor-pointer object-contain"
                                       src="/assets/repost.svg" alt="repost" width={24}
                                       height={24}/>
                                <Image
                                    className="cursor-pointer object-contain" src="/assets/share.svg" alt="share"
                                    width={24} height={24}/>
                            </div>
                            {isComment && comments.length > 0 && (
                                <Link href={`/thread/${id}`}>
                                    <p className="mt-1 text-subtle-medium text-gray-1">{comments.length} replies</p>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
                {!isComment && community && (
                    <Link
                        href={`/communities/${community.id}`}
                        className='mt-5 flex items-center'
                    >
                        <p className='text-subtle-medium text-gray-1'>
                            {formatDateString(createdAt)}
                            {community && ` - ${community.name} Community`}
                        </p>

                        <Image
                            src={community.image}
                            alt={community.name}
                            width={14}
                            height={14}
                            className='ml-1 rounded-full object-cover'
                        />
                    </Link>
                )}
            </div>


        </article>
    );
}

export default ThreadCart;