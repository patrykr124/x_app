"use client"
import React from 'react'
import Image from 'next/image'
import {SignedIn, SignedOut, SignInButton, SignOutButton} from '@clerk/nextjs'
import NavItems from './NavItems'
import {ArrowLeftIcon} from "lucide-react";

export default function LeftSidebar() {

    return (
        <section className='custom-scrollbar leftsidebar'>
            <div className="flex w-full flex-1 flex-col gap-6 px-6">
                <NavItems classes='leftsidebar_link'/>
            </div>
            <div className="mt-10 px-6">
                <SignedIn>
                    <SignOutButton redirectUrl={'/sign-in'}>
                        <div className="flex cursor-pointer gap-4 p-4">
                            <Image src='/assets/logout.svg' alt='logout' width={24} height={24}/>
                            <p className='text-light-2 max-lg:hidden'>Logout</p>
                        </div>
                    </SignOutButton>
                </SignedIn>

                <SignedOut>
                    <SignInButton>
                        <div
                            className="flex bg-primary-500 w-full rounded-lg p-4 flex-row justify-center gap-2  cursor-pointer">
                            <ArrowLeftIcon color="white" className="w-6 h-6"/>
                            <p className='text-white'>Login</p>
                        </div>
                    </SignInButton>
                </SignedOut>

            </div>
        </section>
    )
}

