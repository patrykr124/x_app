"use client"
import Link from 'next/link'
import React from 'react'
import { sidebarLinks } from '@/constants'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { SignedIn, SignOutButton } from '@clerk/nextjs'
import NavItems from './NavItems'

export default function LeftSidebar() {

    return (
        <section className='custom-scrollbar leftsidebar'>
            <div className="flex w-full flex-1 flex-col gap-6 px-6">
                <NavItems classes='leftsidebar_link' />
            </div>
            <div className="mt-10 px-6">
                <SignedIn>
                    <SignOutButton redirectUrl={'/sign-in'}>
                        <div className="flex cursor-pointer gap-4 p-4">
                            <Image src='/assets/logout.svg' alt='logout' width={24} height={24} />
                            <p className='text-light-2 max-lg:hidden'>Logout</p>
                        </div>
                    </SignOutButton>
                </SignedIn>
            </div>
        </section>
    )
}

