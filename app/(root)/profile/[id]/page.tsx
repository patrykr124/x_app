import {currentUser} from "@clerk/nextjs/server";
import {fetchUser} from "@/lib/actions/user.actions";
import {redirect} from "next/navigation";
import ProfileHeader from "@/components/shared/ProfileHeader";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {profileTabs} from "@/constants";
import Image from "next/image";
import Threadstab from "@/components/shared/Threadstab";

async function Page({params}: { params: { id: string } }) {
    const user = await currentUser();
    if (!user) return null;

    const userInfo = await fetchUser(params.id);

    if (!userInfo) redirect('/onboarding');


    return (
        <section>
            <ProfileHeader accountId={userInfo.id} authUserId={user.id} name={userInfo.name}
                           username={userInfo.username} imgUrl={userInfo.image} bio={userInfo.bio}/>
            <div className="mt-9">
                <Tabs defaultValue="threads" className="w-full">
                    <TabsList className="tab">
                        {profileTabs.map((tab) => (
                            <TabsTrigger className="tab" key={tab.label} value={tab.value}>
                                <Image src={tab.icon} alt="icon" width={24} height={24} className="object-contain"/>
                                <p className="max-sm:hidden">{tab.label}</p>
                                {tab.label === 'Threads' && (
                                    <p className="ml-1 rounded-xl bg-light-4 px-2 py-1 text-tiny-medium text-light-2">
                                        {userInfo?.threads?.length}
                                    </p>
                                )}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    {profileTabs.map((tab) => (
                        <TabsContent key={tab.label} value={tab.value} className="w-full text-light-1">
                            <Threadstab currentUserId={user.id} accountId={userInfo.id} accountType="User"></Threadstab>
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
        </section>
    );
}

export default Page;