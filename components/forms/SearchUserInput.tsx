"use client"

import {useState} from "react";
import {fetchUsers} from "@/lib/actions/user.actions";

interface Props {
    userId: string;
    setLoading: (value: boolean) => void;
    setUsers: (value: any) => void;
    allUsers: any[]

}

function SearchUserInput({userId, setLoading, setUsers, allUsers}: Props) {
    const [search, setSearch] = useState('');



    async function handleSearchInput(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        setSearch(value);


        try {
            const result = await fetchUsers({
                userId: userId,
                searchString: value,
                pageNumber: 1,
                pageSize: 25,
                sortBy: "desc"
            });
            setUsers(result.users);

        } catch (err) {
            console.error("Błąd podczas wyszukiwania użytkowników:", err);
        } finally {
            setLoading(false);
        }


    }


    return (
        <>
            <input placeholder="Search users" className="searchbar_input " type="text" value={search}
                   onChange={handleSearchInput}/>
        </>
    );
}

export default SearchUserInput;