'use client';

import React, { useState, useEffect } from 'react';
import useFetch from '@/hooks/useFetch';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PurchaseTablePage = () => {
  const { fetchData, data, loading, error } = useFetch({
    url: '/api/purchases',
  });
  console.log(data);

  const [filteredPurchases, setFilteredPurchases] = useState([]);
  const [filterSupplier, setFilterSupplier] = useState('');
  const [filterDate, setFilterDate] = useState('');

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    setFilteredPurchases(data || []);
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleDelete = async (stockId) => {
    try {
      const confirmDelete = confirm(
        'Are you sure you want to delete this stock?'
      );
      if (!confirmDelete) return;

      const response = await fetch(`/api/purchases`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: stockId }),
      });

      if (response.ok) {
        toast.success('Purchase deleted successfully.');
        fetchData();
      } else {
        const errorData = await response.json();
        toast.error(`Failed to delete purchase entry: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error deleting purchase:', error);
      toast.error(`Error deleting purchase: ${error.message}`);
    }
  };

  const handleFilter = () => {
    const filtered = (data || []).filter((purchase) => {
      const isSupplierMatch = filterSupplier
        ? purchase.vendorName
            .toLowerCase()
            .includes(filterSupplier.toLowerCase())
        : true;
      const purchaseDate = new Date(purchase.paidDate)
        .toISOString()
        .split('T')[0];
      const isDateMatch = filterDate ? purchaseDate === filterDate : true;
      return isSupplierMatch && isDateMatch;
    });
    setFilteredPurchases(filtered);
  };

  const handleClearAll = () => {
    setFilteredPurchases(data || []);
    setFilterSupplier('');
    setFilterDate('');
  };

  const handleDownload = (base64Data, filename) => {
    const link = document.createElement('a');
    link.href = `data:application/pdf;base64,${base64Data}`;
    link.download = filename;
    link.click();
  };

  return (
    <div className="p-4 w-full">
      <h1 className="text-2xl font-bold mb-4">All Purchase Information</h1>
      <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">
            Filter by Supplier
          </label>
          <input
            type="text"
            value={filterSupplier}
            onChange={(e) => setFilterSupplier(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md"
            placeholder="Enter supplier name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Filter by Date</label>
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md"
          />
        </div>
      </div>

      <div className="mb-4">
        <button
          onClick={handleFilter}
          className="text-white px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-300"
        >
          Filter
        </button>
      </div>

      {(filteredPurchases.length > 0 ||
        filterDate.length > 0 ||
        filterSupplier.length > 0) && (
        <div className="flex justify-end mb-4">
          <button
            onClick={handleClearAll}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Clear All
          </button>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border border-gray-300">Vendor Name</th>
              <th className="px-4 py-2 border border-gray-300">TDS</th>
              <th className="px-4 py-2 border border-gray-300">REM</th>
              <th className="px-4 py-2 border border-gray-300">Payment From</th>
              <th className="px-4 py-2 border border-gray-300">Amount Paid</th>
              <th className="px-4 py-2 border border-gray-300">
                Warehouse Location
              </th>
              <th className="px-4 py-2 border border-gray-300">Asset</th>
              <th className="px-4 py-2 border border-gray-300">Asset Name</th>
              <th className="px-4 py-2 border border-gray-300">Asset Value</th>
              <th className="px-4 py-2 border border-gray-300">
                Asset Description
              </th>
              <th className="px-4 py-2 border border-gray-300">
                Purchase Description
              </th>
              <th className="px-4 py-2 border border-gray-300">
                Purchase Bill
              </th>
              <th className="px-4 py-2 border border-gray-300">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredPurchases.length > 0 ? (
              filteredPurchases.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="border px-4 py-2">{item.vendorName}</td>
                  <td className="border px-4 py-2">{item.tds}</td>
                  <td className="border px-4 py-2">{item.rem}</td>
                  <td className="border px-4 py-2">{item.paymentFrom}</td>
                  <td className="border px-4 py-2">{item.amountPaid}</td>
                  <td className="border px-4 py-2">{item.warehouseLocation}</td>
                  <td className="border px-4 py-2">{item.asset}</td>
                  <td className="border px-4 py-2">{item.assetName}</td>
                  <td className="border px-4 py-2">
                    {item.assetValue !== null ? item.assetValue : 'N/A'}
                  </td>
                  <td className="border px-4 py-2">{item.assetDescription}</td>
                  <td className="border px-4 py-2">
                    {item.purchaseDescription}
                  </td>
                  <td className="border px-4 py-2 text-center group">
                    {typeof item.purchaseBill === 'string' ? (
                      <a
                        href={`data:application/pdf;base64,${item.purchaseBill}`}
                        download={`${item.vendorName}-bill.pdf`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <button
                          onClick={() =>
                            handleDownload(
                              item.purchaseBill,
                              'purchase-bill.pdf'
                            )
                          }
                          className="text-blue-500 group-hover:underline"
                        >
                          View
                        </button>
                      </a>
                    ) : (
                      <span>Invalid or missing bill data</span>
                    )}
                  </td>
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
                <td colSpan="13" className="text-center p-4">
                  No purchase data available
                </td>
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
