"use client"; 

import { useRouter } from 'next/navigation';

export default function Reports() {
  const router = useRouter();

  return (
    <div className="w-full ml-16 sm:ml-28 lg:ml-12 mx-auto mt-6 text-black">
      <h1 className="text-2xl font-bold mb-6">Financial Reports</h1>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <button
          onClick={() => router.push('/dashboard/reports/general-ledger')}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          General Ledger
        </button>

        <button
          onClick={() => router.push('/dashboard/reports/income-statement')}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Income Statement
        </button>

        <button
          onClick={() => router.push('/dashboard/reports/balance-sheet')}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Balance Sheet
        </button>

        <button
          onClick={() => router.push('/dashboard/reports/cash-flow')}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Cash Flow
        </button>

        <button
          onClick={() => router.push('/dashboard/reports/tax-calculations')}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Tax Calculations
        </button>
      </div>
    </div>
  );
}
