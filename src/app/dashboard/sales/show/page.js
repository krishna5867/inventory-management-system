"use client";

import React, { useEffect } from 'react';
import useSales from '@/hooks/useSales';

const PurchaseTablePage = () => {
  const {sales} = useSales();
  const {data, status, error} = sales;

  if (status === "loading") return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="p-4 w-full">
      <h1 className="text-2xl font-bold mb-4">All Sales Data</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-10">
              <th className="px-4 py-2 border border-gray-300">Customer Name</th>
              <th className="px-4 py-2 border border-gray-300">Product</th>
              <th className="px-4 py-2 border border-gray-300">price</th>
              <th className="px-4 py-2 border border-gray-300">Tax</th>
              <th className="px-4 py-2 border border-gray-300">Payment Status</th>
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="border px-4 py-2">{item.customer}</td>
                  <td className="border px-4 py-2">{item.product}</td>
                  <td className="border px-4 py-2">Rs. {item.price}</td>
                  <td className="border px-4 py-2">{item.tax}%</td>
                  <td className="border px-4 py-2">{item.paymentStatus}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="12" className="text-center p-4">No Sales data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PurchaseTablePage;
