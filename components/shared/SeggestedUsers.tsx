import {fetchUsers} from "@/lib/actions/user.actions";
import {currentUser} from "@clerk/nextjs/server";
import UserCard from "@/components/cards/UserCard";

async function SeggestedUsers() {
    const user = await currentUser();

    if (!user) {
        return null;
    }

    const users = await fetchUsers({
        userId: user.id,
        searchString: "",
        pageNumber: 1,
        pageSize: 25,
        sortBy: "desc"
    })

    console.log(users);

    return (
        <div className="flex ">
            {users.users.map((user) => (
                <UserCard key={user.id} id={user.id} name={user.name} username={user.username} imgUrl={user.image}
                          personType="User"/>
            ))}
        </div>
    );
}

export default SeggestedUsers;