import Link from "next/link"
import Page from "./page"
export default function Layout({ children }) {
    return (
        <div className="flex gap-2">
            <div className="w-1/4 bg-black text-white h-screen">
                <div>
                    <ul>
                        <Link href="/dashboard">
                            <li className="text-black bg-gray-300 p-2 cursor-pointer uppercase">
                                dashboard
                            </li>
                        </Link>
                        <Link href="/dashboard/sales">
                            <li className="p-2 hover:bg-gray-300 hover:text-black cursor-pointer uppercase">
                            sales
                            </li>
                        </Link>
                        <Link href="/dashboard/purchases">
                            <li className="p-2 hover:bg-gray-300 hover:text-black cursor-pointer uppercase">
                            purchases
                            </li>
                        </Link>
                        <Link href="/dashboard/assets">
                            <li className="p-2 hover:bg-gray-300 hover:text-black cursor-pointer uppercase">
                            assets
                            </li>
                        </Link>
                        <Link href="/dashboard/stock">
                            <li className="p-2 hover:bg-gray-300 hover:text-black cursor-pointer uppercase">
                            Stock
                            </li>
                        </Link>
                        <Link href="/dashboard/transactions">
                            <li className="p-2 hover:bg-gray-300 hover:text-black cursor-pointer uppercase">
                            Transactions
                            </li>
                        </Link>
                    </ul>
                </div>
            </div>
            <div className="w-3/4">
                {children}
            </div>
        </div>
    )
}