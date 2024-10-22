"use client"
import {sidebarLinks} from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import React from 'react'
import {useAuth} from "@clerk/nextjs";

export default function NavItems({classes} : {classes: string}) {
    const pathname = usePathname()
    const {userId} = useAuth();
    return (
        <>
            {sidebarLinks.map((item) => {
                const isActive = pathname === item.route
                if (item.route === '/profile'){
                        item.route = `/profile/${userId}`
                }
                return (

                    <Link className={`${classes} ${isActive && 'bg-primary-500'}`} key={item.label} href={item.route}>
                        <Image src={item.imgURL} alt={item.label} width={24} height={24} />
                        <p className='text-light-1 max-lg:hidden'>{item.label}</p>
                    </Link>
                )
            })}
        </>
    )
}
