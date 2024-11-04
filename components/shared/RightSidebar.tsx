import React from 'react'
import SeggestedUsers from "@/components/shared/SeggestedUsers";

export default function RightSidebar() {
    return (
        <section className='custom-scrollbar rightsidebar'>
            <div className="flex flex-1 flex-col justify-start gap-6">
                <h3 className='text-heading4-medium text-light-1'>Suggested Users</h3>
                <SeggestedUsers/>
            </div>
        </section>
    )
}
