import SearchComponents from "@/components/SearchComponents";
import {currentUser} from "@clerk/nextjs/server";
import {fetchUser, fetchUsers} from "@/lib/actions/user.actions";
import {redirect} from "next/navigation";

async function Page() {

    const user = await currentUser();
    if (!user) {
        return null;
    }

    const allUsers = await fetchUsers({
        userId: user.id,
        searchString: "",
        pageNumber: 1,
        pageSize: 25,
        sortBy: "desc"
    })

    const userInfo = await fetchUser(user.id)

    if (!userInfo) {
        redirect('/onboarding');
    }


    return (
        <section>
            <SearchComponents allUsers={allUsers.users} userId={user.id}/>
        </section>
    );
}

export default Page;