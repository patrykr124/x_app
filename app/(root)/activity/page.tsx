import {currentUser} from "@clerk/nextjs/server";
import {fetchUser, getActivity} from "@/lib/actions/user.actions";
import {redirect} from "next/navigation";
import Link from "next/link";
import Image from "next/image";

async function Page() {
    const user = await currentUser();
    if (!user) {
        return null;
    }

    const userInfo = await fetchUser(user.id);
    if (!userInfo) {
        redirect('/onboarding');
    }

    const activities = await getActivity(userInfo._id)

    return (
        <section>
            <section className="mt-10 flex flex-col gap-5">
                {activities.length > 0 ? (<>
                    {activities.map((activity) => (
                        <Link key={activity._id} href={`/thread/${activity.parentId}`}>
                            <article className="activity-card">
                                <Image className="rounded-full object-cover" src={activity.author.image} alt="activity"
                                       width={20} height={20}/>
                                <p className="!text-small-regular text-light-1">
                                    <span className="mr-1 text-primary-500">
                                        {activity.author.name}
                                    </span>
                                    replied to your thread
                                </p>
                            </article>
                        </Link>
                    ))}
                </>) : (<p className="text-base-regular text-light-3">No activity yet</p>)}
            </section>
        </section>
    );
}

export default Page;