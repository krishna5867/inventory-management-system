'use client';

import React, { useState, useEffect } from 'react';
import useSales from '@/hooks/useSales';
import jsPDF from 'jspdf';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SalesTablePage = () => {
  const { sales } = useSales();
  const { data, status, error } = sales;

  const [filterCustomer, setFilterCustomer] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [filteredSales, setFilteredSales] = useState([]);

  useEffect(() => {
    setFilteredSales(data || []);
  }, [data]);

  const handleFilter = () => {
    const filtered = (data || []).filter((sale) => {
      const isCustomerMatch = sale.customer
        .toLowerCase()
        .includes(filterCustomer.toLowerCase());
      const saleDate = new Date(sale.date).toISOString().split('T')[0];
      const isDateMatch = filterDate ? saleDate === filterDate : true;
      return isCustomerMatch && isDateMatch;
    });
    setFilteredSales(filtered);
  };

  const handleClearAll = () => {
    setFilterCustomer('');
    setFilterDate('');
    setFilteredSales(data || []);
  };

  const handleDelete = async (salesId) => {
    try {
      const confirmDelete = confirm(
        'Are you sure you want to delete this stock?'
      );
      if (!confirmDelete) return;

      const response = await fetch(`/api/sales`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: salesId }),
      });

      if (response.ok) {
        toast.success('Sales deleted successfully.');
      } else {
        const errorData = await response.json();
        toast.error(`Failed to delete Sales entry: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error deleting Sales:', error);
      toast.error(`Error deleting Sales: ${error.message}`);
    }
  };

  const generateInvoice = (sale) => {
    const doc = new jsPDF();
    const saleDate = new Date(sale.date);
    const dateParts = saleDate.toISOString().split('T')[0].split('-');

    doc.setFontSize(18);
    doc.text('Sales Invoice', 105, 20, null, null, 'center');

    doc.setFontSize(12);
    doc.text(`Customer: ${sale.customer}`, 20, 40);
    doc.text(`Product: ${sale.product}`, 20, 50);
    doc.text(`Price: Rs.${sale.price}`, 20, 60);
    doc.text(`Tax: ${sale.tax}%`, 20, 70);
    doc.text(`Total: ${(sale.price + (sale.price * sale.tax) / 100).toFixed(2)}`, 20, 80);
    doc.text(`Date: ${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`, 20, 90);
    doc.save(`invoice_${sale.customer}_${saleDate}.pdf`);
  };

  if (status === 'loading') return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="p-4 w-full">
      <h1 className="text-2xl font-bold mb-4">All Sales Data</h1>
      <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">
            Filter by Customer
          </label>
          <input
            type="text"
            value={filterCustomer}
            onChange={(e) => setFilterCustomer(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md"
            placeholder="Enter customer name"
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
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Filter
        </button>
      </div>

      {(filteredSales.length > 0 || filterCustomer || filterDate) && (
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
            <tr className="bg-gray-10">
              <th className="px-4 py-2 border border-gray-300">
                Customer Name
              </th>
              <th className="px-4 py-2 border border-gray-300">Product</th>
              <th className="px-4 py-2 border border-gray-300">Price</th>
              <th className="px-4 py-2 border border-gray-300">Tax</th>
              <th className="px-4 py-2 border border-gray-300">Total</th>
              <th className="px-4 py-2 border border-gray-300">
                Payment Status
              </th>
              <th className="px-4 py-2 border border-gray-300">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredSales && filteredSales.length > 0 ? (
              filteredSales.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="border px-4 py-2">{item.customer}</td>
                  <td className="border px-4 py-2">{item.product}</td>
                  <td className="border px-4 py-2">Rs. {item.price}</td>
                  <td className="border px-4 py-2">{item.tax}%</td>
                  <td className="border px-4 py-2">
                    Rs.{' '}
                    {(item.price + (item.price * item.tax) / 100).toFixed(2)}
                  </td>
                  <td className="border px-4 py-2">{item.paymentStatus}</td>
                  <td className="border px-4 py-2">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => generateInvoice(item)}
                        className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                      >
                        Generate Invoice
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-4">
                  No Sales data available
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

export default SalesTablePage;
