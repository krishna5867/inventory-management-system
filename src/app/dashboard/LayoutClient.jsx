"use client";

import Link from "next/link";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";

export default function LayoutClient({ children }) {
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="gap-2 flex relative">
      <div className="absolute -top-14 left-5 lg:hidden" onClick={handleClick}>
        {isVisible ? (
          <button>
            <IoClose size={30} color="white" />
          </button>
        ) : (
          <button>
            <GiHamburgerMenu size={25} color="white" />
          </button>
        )}
      </div>

      {/* NavBar */}
      <div
        className={`shadow-lg absolute top-0 left-0  lg:static w-1/3 sm:w-1/4 lg:w-1/6 pb-10 lg:pb-0 lg:h-screen bg-gray-800 text-white px-2 py-2 z-10 transform transition-transform duration-300 ease-in-out ${
          isVisible ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:block`}
      >
        <div>
          <ul className="flex flex-col justify-center items-start gap-5" onClick={handleClick}>
            <Link href="/dashboard">
              <li className="p-2 cursor-pointer uppercase hover:text-gray-400">
                Dashboard
              </li>
            </Link>
            <Link href="/dashboard/sales">
              <li className="p-2 hover:text-gray-400 cursor-pointer uppercase">
                Sales
              </li>
            </Link>
            <Link href="/dashboard/purchases">
              <li className="p-2 hover:text-gray-400 cursor-pointer uppercase">
                Purchases
              </li>
            </Link>
            <Link href="/dashboard/assets">
              <li className="p-2 hover:text-gray-400 cursor-pointer uppercase">
                Assets
              </li>
            </Link>
            <Link href="/dashboard/stock">
              <li className="p-2 hover:text-gray-400 cursor-pointer uppercase">
                Stock
              </li>
            </Link>
            <Link href="/dashboard/reports">
              <li className="p-2 hover:text-gray-400 cursor-pointer uppercase">
                Reports
              </li>
            </Link>
          </ul>
        </div>
      </div>

      <div className="w-3/4">{children}</div>
    </div>
  );
}
