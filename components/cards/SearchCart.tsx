'use client'
import UserCard from "@/components/cards/UserCard";

interface Users {
    id: string;
    name: string;
    username: string;
    image: string;
}

interface Props {
    users: Users[];
    loading: boolean;
}


function SearchCart({users, loading}: Props) {


    return (
        <div>
            {loading ? <p className="loading">Loading...</p> :
                (
                    <>

                        {users.map((user) => (
                            <UserCard key={user.id} id={user.id} name={user.name} username={user.username}
                                      imgUrl={user.image} personType="User"/>
                        ))}
                    </>
                )

            }

        </div>
    );
}

export default SearchCart;