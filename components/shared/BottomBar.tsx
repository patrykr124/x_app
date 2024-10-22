import { sidebarLinks } from '@/constants'
import React from 'react'
import NavItems from './NavItems'

export default function BottomBar() {
  return (
    <section className='bottombar'>
      <div className="bottombar_container">
        <NavItems classes='bottombar_link' />
      </div>
    </section>
  )
}
