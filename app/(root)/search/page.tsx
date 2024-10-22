import {currentUser} from "@clerk/nextjs/server";
import {fetchAllUsers, fetchUser} from "@/lib/actions/user.actions";
import {redirect} from "next/navigation";
import UserCard from "@/components/cards/UserCard";

async function Page() {

    const user = await currentUser();
    if (!user){
        return null;
    }

    const userInfo = await fetchUser(user.id)

    if (!userInfo){
        redirect('/onboarding');
    }

   const result = await fetchAllUsers({
       userId: user.id,
       searchString: "",
       pageNumber: 1,
       pageSize: 25,
       sortBy: "desc"
   });


    return (
       <section>
           <h1 className="head-text mb-10">
               Search
           </h1>
           
           <div className="mt-14 flex flex-col gap-9">
               {result.users.length === 0 ? ( <p className="no-result">No users</p>) : (
                   <>
                       {result.users.map(user => (
                           <UserCard key={user.id} id={user.id} name={user.name} username={user.username} imgUrl={user.image} personType="User" />
                       ))}
                   </>
               )}
           </div>
       </section>
    );
}

export default Page;