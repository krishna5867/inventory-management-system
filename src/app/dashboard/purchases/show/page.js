"use client";

import React, { useEffect } from 'react';
import useFetch from '@/hooks/useFetch';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PurchaseTablePage = () => {
  const { fetchData, data, loading, error } = useFetch({ url: '/api/purchases' });

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleDelete = async (stockId) => {
    try {
      const confirmDelete = confirm('Are you sure you want to delete this stock?');
      if (!confirmDelete) return;
  
      const response = await fetch(`/api/purchases`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: stockId }),
      });
  
      if (response.ok) {
        toast.success('Purchases deleted successfully.');
      } else {
        const errorData = await response.json();
        toast.error(`Failed to delete purchases entry: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error deleting purchases:', error);
      alert(`Error deleting purchases: ${error.message}`);
    }
  };


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
              <th className="px-4 py-2 border border-gray-300">Action</th>
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
                  <td className="border px-4 py-2">
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
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
      <ToastContainer />
    </div>
  );
};

export default PurchaseTablePage;
