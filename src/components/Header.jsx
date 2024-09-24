'use client';

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';

const Header = () => {
  const { data: session, status } = useSession();

  const handleLogout = () => {
    signOut();
    redirect('/signin');
  };

  return (
    <div className="w-full bg-gray-800 text-black h-[70px]">
      <div className="flex items-center justify-between px-4 py-4">
        <div>
          <h2 className="text-white font-semibold hidden lg:block hover:text-blue-500 cursor-pointer">
            Accounting App
          </h2>
        </div>
        <div className="text-white"></div>
        <div className="flex gap-x-4">
          {session ? (
            <button
              className="bg-blue-500 text-white px-2 py-1 sm:px-4 sm:py-2 rounded-md"
              onClick={() => signOut()}
            >
              Sign Out
            </button>
          ) : (
            <>
              <Link href="/signin">
                <button className="bg-blue-500 hover:bg-blue-600 focus:ring-1 focus:ring-blue-300 text-white px-2 py-1 sm:px-4 sm:py-2 rounded-md">
                  Login
                </button>
              </Link>
              <Link href="/register">
                <button className="bg-blue-500 hover:bg-blue-600 focus:ring-1 focus:ring-blue-300 text-white px-2 py-1 sm:px-4 sm:py-2 rounded-md">
                  SignUp
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
