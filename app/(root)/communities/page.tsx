import {currentUser} from "@clerk/nextjs/server";
import {fetchUser} from "@/lib/actions/user.actions";
import {redirect} from "next/navigation";

async function Page({params}: { params: string }) {
    const user = await currentUser();
    if (!user) {
        return null;
    }

    const userInfo = await fetchUser(user.id)

    if (!userInfo) {
        redirect('/onboarding');
    }
    return (
        <section>
            <h1 className="head-text mb-10">

            </h1>
        </section>
    );
}

export default Page;