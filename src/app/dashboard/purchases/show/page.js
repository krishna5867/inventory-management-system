"use client";

import React, { useEffect } from 'react';
import useFetch from '@/hooks/useFetch';

const PurchaseTablePage = () => {
  const { fetchData, data, loading, error } = useFetch({ url: '/api/purchases' });

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="p-4 w-full">
      <h1 className="text-2xl font-bold mb-4">Purchase Information</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-10">
              <th className="px-4 py-2 border border-gray-300">Vendor Name</th>
              <th className="px-4 py-2 border border-gray-300">TDS</th>
              <th className="px-4 py-2 border border-gray-300">REM</th>
              <th className="px-4 py-2 border border-gray-300">Payment From</th>
              <th className="px-4 py-2 border border-gray-300">Amount Paid</th>
              <th className="px-4 py-2 border border-gray-300">Warehouse Location</th>
              <th className="px-4 py-2 border border-gray-300">Asset</th>
              <th className="px-4 py-2 border border-gray-300">Asset Name</th>
              <th className="px-4 py-2 border border-gray-300">Asset Value</th>
              <th className="px-4 py-2 border border-gray-300">Asset Description</th>
              <th className="px-4 py-2 border border-gray-300">Purchase Description</th>
              <th className="px-4 py-2 border border-gray-300">Purchase Bill</th>
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="border px-4 py-2">{item.vendorName}</td>
                  <td className="border px-4 py-2">{item.tds}</td>
                  <td className="border px-4 py-2">{item.rem}</td>
                  <td className="border px-4 py-2">{item.paymentFrom}</td>
                  <td className="border px-4 py-2">{item.amountPaid}</td>
                  <td className="border px-4 py-2">{item.warehouseLocation}</td>
                  <td className="border px-4 py-2">{item.asset}</td>
                  <td className="border px-4 py-2">{item.assetName}</td>
                  <td className="border px-4 py-2">{item.assetValue !== null ? item.assetValue : 'N/A'}</td>
                  <td className="border px-4 py-2">{item.assetDescription}</td>
                  <td className="border px-4 py-2">{item.purchaseDescription}</td>
                  <td className="border px-4 py-2">{item.purchaseBill}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="12" className="text-center p-4">No purchase data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PurchaseTablePage;
