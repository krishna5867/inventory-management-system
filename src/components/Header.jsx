import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { redirect } from 'next/navigation';
import React from 'react'
import { getServerSession } from "next-auth";


const Header = async () => {
  const session = await getServerSession();

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
        <div className='flex gap-x-4'>
          {/* {session ? 
          <button className="bg-black text-white px-4 py-1.5 rounded-full border">
            Sign Out
          </button> 
          : (
            <> */}
              <Link href="/signin">
                <button className='bg-black text-white px-4 py-1.5 rounded-full border'>Login</button>
              </Link>
              <Link href="/register">
                <button className='bg-black text-white px-4 py-1.5 rounded-full border'>SignUp</button>
              </Link>
            {/* </> */}
          {/* )} */}
        </div>
      </div>
    </div>
  )
}

export default Header