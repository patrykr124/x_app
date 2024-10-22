"use client"
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import Link from "next/link";

interface Props {
    key: string,
    id: string,
    name: string,
    username: string,
    imgUrl: string,
    personType: string,
}

function UserCard({key, id, name, username, imgUrl, personType}: Props) {
    const router = useRouter();
    return (
        <article className="user-card">
            <Link href={`/profile/${id}`}>
                <div className="user-card_avatar ">
                    <Image src={imgUrl} alt="profileImg" width={48} height={48} className="rounded-full object-cover"/>
                    <div className="flex-1 text-ellipsis">
                        <h4 className="text-base-semibold text-light-1">{name}</h4>
                        <p className="text-subtle-medium text-gray-1">@{username}</p>
                    </div>
                </div>
            </Link>
            <Button onClick={() => router.push(`/profile/${id}`)} className="user-card_btn">View</Button>
        </article>
    );
}

export default UserCard;