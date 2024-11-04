"use client"
import SearchUserInput from "@/components/forms/SearchUserInput";
import SearchCart from "@/components/cards/SearchCart";
import {useEffect, useState} from "react";


interface User {
    id: string;
    name: string;
    username: string;
    image: string;
}

interface Props {
    userId: string;
    allUsers: User[];
}


function SearchComponents({userId,allUsers}: Props) {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        setUsers(allUsers);
    }, [allUsers]);

    return (
        <div>
            <h1 className="head-text mb-10">
                <SearchUserInput allUsers={allUsers} setUsers={setUsers} setLoading={setLoading} userId={userId}/>
            </h1>

            <div className="mt-14 flex flex-col gap-9">
                <SearchCart loading={loading} users={users}/>
            </div>
        </div>
    );
}

export default SearchComponents;