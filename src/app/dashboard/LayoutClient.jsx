"use client";

import Link from "next/link";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { usePathname  } from 'next/navigation'

export default function LayoutClient({ children }) {
  const [isVisible, setIsVisible] = useState(false);
  const pathname  = usePathname ();

  const isActive = (path) => {
    return pathname === path ? "bg-gray-700" : "";
  };
  

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

      <div
        className={`shadow-lg absolute top-0 left-0  lg:static w-1/2 sm:w-1/4 lg:w-1/6 pb-10 lg:pb-0 h-screen lg:h-[625px] bg-gray-800 text-white py-2 z-10 transform transition-transform duration-300 ease-in-out ${
          isVisible ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:block`}
      >
        <div>
          <ul className="flex flex-col justify-center items-start gap-0" onClick={handleClick}>
            <Link href="/dashboard" className={`w-full hover:bg-gray-700 ${isActive("/dashboard")}`}>
              <li className="p-4 cursor-pointer uppercase">
                Dashboard
              </li>
            </Link>
            <Link href="/dashboard/sales" className={`w-full hover:bg-gray-700 ${isActive("/dashboard/sales")}`}>
              <li className="p-4  cursor-pointer uppercase">
                Sales
              </li>
            </Link>
            <Link href="/dashboard/purchases" className={`w-full hover:bg-gray-700 ${isActive("/dashboard/purchases")}`}>
              <li className="p-4  cursor-pointer uppercase">
                Purchases
              </li>
            </Link>
            <Link href="/dashboard/stock" className={`w-full hover:bg-gray-700 ${isActive("/dashboard/stock")}`}>
              <li className="p-4 cursor-pointer uppercase">
                Stock
              </li>
            </Link>
            <Link href="/dashboard/reports" className={`w-full hover:bg-gray-700 ${isActive("/dashboard/reports")}`}>
              <li className="p-4 cursor-pointer uppercase">
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
