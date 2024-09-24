'use client';

import { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import { formatDate } from '@/utils/dateFormat';

export default function ShowSalesData() {
  const [sales, setSales] = useState([]);
  const [filteredSales, setFilteredSales] = useState([]);
  const [filterCustomer, setFilterCustomer] = useState('');
  const [filterDate, setFilterDate] = useState('');
  useEffect(() => {
    const storedSales = localStorage.getItem('sales');
    if (storedSales) {
      const salesData = JSON.parse(storedSales);
      setSales(salesData);
      setFilteredSales(salesData);
    }
  }, []);

  const handleDelete = (indexToDelete) => {
    const updatedSales = sales.filter((_, index) => index !== indexToDelete);
    setSales(updatedSales);
    setFilteredSales(updatedSales);
    localStorage.setItem('sales', JSON.stringify(updatedSales));
  };

  const handleClearAll = () => {
    setSales([]);
    setFilteredSales([]);
    localStorage.removeItem('sales');
  };

  const generateInvoice = (sale) => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Sales Invoice', 105, 20, null, null, 'center');

    doc.setFontSize(12);
    doc.text(`Customer: ${sale.customer}`, 20, 40);
    doc.text(`Product: ${sale.product}`, 20, 50);
    doc.text(`Price: $${sale.price}`, 20, 60);
    doc.text(`Tax: ${sale.tax}%`, 20, 70);
    doc.text(`Total: $${sale.total}`, 20, 80);
    doc.text(`Date: ${sale.date}`, 20, 90);

    doc.save(`invoice_${sale.customer}_${sale.date}.pdf`);
  };

  const handleFilter = () => {
    const filtered = sales.filter((sale) => {
      const isCustomerMatch = filterCustomer
        ? sale.customer.toLowerCase().includes(filterCustomer.toLowerCase())
        : true;
      const isDateMatch = filterDate ? sale.date === filterDate : true;
      return isCustomerMatch && isDateMatch;
    });
    setFilteredSales(filtered);
  };

  async function fetchSales() {
    const response = await fetch('/api/sales');
    const data = await response.json();
    setSales(data);
  }

  useEffect(() => {
    fetchSales();
  }, []);

  return (
    <div className="w-full ml-12 sm:ml-24 md:ml-36 lg:ml-20 mt-6 text-black">
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

      {filteredSales.length > 0 && (
        <div className="flex justify-end mb-4">
          <button
            onClick={handleClearAll}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Clear All
          </button>
        </div>
      )}
      <div className="max-h-screen overflow-y-auto lg:max-h-full lg:overflow-visible rounded">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2">Customer</th>
              <th className="px-4 py-2">Product</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Tax</th>
              <th className="px-4 py-2">Total</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredSales.length > 0 ? (
              filteredSales.map((sale, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{sale.customer}</td>
                  <td className="border px-4 py-2">{sale.product}</td>
                  <td className="border px-4 py-2">
                    Rs.{parseFloat(sale.price).toFixed(2)}
                  </td>
                  <td className="border px-4 py-2">{sale.tax}%</td>
                  <td className="border px-4 py-2">{sale.total}</td>
                  <td className="border px-4 py-2">{formatDate(sale.date)}</td>
                  <td className="border px-4 py-2">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleDelete(index)}
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => generateInvoice(sale)}
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
                <td colSpan="7" className="text-center p-4">
                  No sales data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
