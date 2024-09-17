'use client'

import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { redirect } from 'next/navigation';
import React from 'react'


const Header = () => {
  const { data: session, status } = useSession();

  const handleLogout = () => {
    signOut();
    redirect("/signin")
  }

  return (
    <div className='w-full bg-black'>
      <div className='flex items-center justify-between px-4 py-2'>
        <div>
          <Link href="/">
            <h2 className='text-white font-semibold'>Accounting App</h2>
          </Link>
        </div>
     <div className='text-white'>
     </div>
        <div className='flex gap-x-4'>
          {session ? 
          <button className="bg-black text-white px-4 py-1.5 rounded-full border"
          onClick={()=> signOut()}>
            Sign Out
          </button> 
          : (
            <>
              <Link href="/signin">
                <button className='bg-black text-white px-4 py-1.5 rounded-full border'>Login</button>
              </Link>
              <Link href="/register">
                <button className='bg-black text-white px-4 py-1.5 rounded-full border'>SignUp</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header