import {SignIn} from '@clerk/nextjs'
import Image from "next/image";

export default function Page() {
    return (
        <div className="flex h-screen w-screen bg-white">
            <div className="right flex-1  relative flex">
                <Image fill className="object-cover" src="/assets/bg.jpg" alt="bg"/>
            </div>
            <div className="left flex-1 flex justify-center items-center">
                <SignIn/>
            </div>

        </div>
    )
}