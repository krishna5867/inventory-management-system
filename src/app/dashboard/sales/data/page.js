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
  const [filterStatus, setFilterStatus] = useState('');
  const [filteredSales, setFilteredSales] = useState([]);
  // console.log(filteredSales, filterStatus);

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
      const isStatusMatch = filterStatus
        ? sale.paymentStatus.toLowerCase() === filterStatus.toLowerCase()
        : true;
      return isCustomerMatch && isDateMatch && isStatusMatch;
    });
    setFilteredSales(filtered);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'customer':
        setFilterCustomer(value);
        break;
      case 'date':
        setFilterDate(value);
        break;
      case 'status':
        setFilterStatus(value);
        break;
      default:
        break;
    }
    // handleFilter();
  };

  const handleClearAll = () => {
    setFilterCustomer('');
    setFilterDate('');
    setFilterStatus('');
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
    return new Promise((resolve) => {
      const doc = new jsPDF();
      const saleDate = new Date(sale.date);
      const dateParts = saleDate.toISOString().split('T')[0].split('-');

      doc.setFontSize(18);
      doc.text(`Sales Invoice`, 105, 20, null, null, 'center');
      doc.setFontSize(12);
      doc.text(`Customer: ${sale.customer}`, 20, 40);
      doc.text(`Product: ${sale.product}`, 20, 50);
      doc.text(`Price: Rs.${sale.price}`, 20, 60);
      doc.text(`Tax: ${sale.tax}%`, 20, 70);
      doc.text(
        `Total: ${(sale.price + (sale.price * sale.tax) / 100).toFixed(2)}`,
        20,
        80
      );
      doc.text(`Date: ${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`, 20, 90);
      doc.save(`invoice_${sale.customer}_${saleDate}.pdf`);
      setTimeout(resolve, 500);
    });
  };

  const generateCombinedInvoice = (sales) => {
    const doc = new jsPDF();

    sales.forEach((sale, index) => {
      const saleDate = new Date(sale.date);
      const dateParts = saleDate.toISOString().split('T')[0].split('-');

      doc.setFontSize(18);
      doc.text('Sales Invoice', 105, 20, null, null, 'center');

      doc.setFontSize(12);
      doc.text(`Customer: ${sale.customer}`, 20, 40);
      doc.text(`Product: ${sale.product}`, 20, 50);
      doc.text(`Price: Rs.${sale.price}`, 20, 60);
      doc.text(`Tax: ${sale.tax}%`, 20, 70);
      doc.text(
        `Total: ${(sale.price + (sale.price * sale.tax) / 100).toFixed(2)}`,
        20,
        80
      );
      doc.text(`Date: ${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`, 20, 90);

      if (index < sales.length - 1) {
        doc.addPage();
      }
    });

    doc.save(`combined_invoice_${new Date().toISOString().split('T')[0]}.pdf`);
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
            name="customer"
            value={filterCustomer}
            onChange={handleFilterChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md"
            placeholder="Enter customer name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Filter by Date</label>
          <input
            type="date"
            name="date"
            value={filterDate}
            onChange={handleFilterChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md"
          />
        </div>
      </div>

      <div className="mb-4 flex gap-4">
        <button
          onClick={handleFilter}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Filter
        </button>

        {(filteredSales.length > 0 || filterCustomer || filterDate) && (
          <div className="">
            <button
              onClick={handleClearAll}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
              Clear All
            </button>
          </div>
        )}
      </div>

      <div className="mb-4 flex justify-end items-center gap-4">
        <label className="text-sm font-medium">Sort by</label>
        <div className="flex items-center">
          <select
            name="status"
            value={filterStatus}
            onChange={handleFilterChange}
            className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md"
            required
          >
            <option value="">All</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>
        <button
          // onClick={() => filteredSales.forEach(sale => generateInvoice(sale))}
          onClick={() => generateCombinedInvoice(filteredSales)}
          className="bg-gray-600 text-white px-4 py-2 rounded-md hov    er:bg-gray-700"
        >
          Generate Invoices
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2">Customer</th>
              <th className="px-4 py-2">StateName</th>
              <th className="px-4 py-2">Invoice Number</th>
              <th className="px-4 py-2">Invoice Date</th>
              <th className="px-4 py-2">Invoice Value</th>
              <th className="px-4 py-2">HSN/SAC</th>
              <th className="px-4 py-2">Goods/Service Description</th>
              <th className="px-4 py-2">Taxable Value</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2">Unit</th>
              <th className="px-4 py-2">Rate</th>
              <th className="px-4 py-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            {filteredSales && filteredSales.length > 0 ? (
              filteredSales.map((item, index) => (
                <tr key={index} className="border-b">
                  {/* <td className="border px-4 py-2">{item.customer}</td>
                  <td className="border px-4 py-2">{item.product}</td>
                  <td className="border px-4 py-2">Rs. {item.price}</td>
                  <td className="border px-4 py-2">{item.tax}%</td>
                  <td className="border px-4 py-2">
                    Rs.{' '}
                    {(item.price + (item.price * item.tax) / 100).toFixed(2)}
                  </td>
                  <td className={`border px-4 py-2 font-semibold ${item.paymentStatus === 'cancelled' ? 'text-red-600' : ''}`}>
                    {item.paymentStatus}
                  </td> */}
                  <td className="border px-4 py-2">{item.customerName}</td>
                  <td className="border px-4 py-2">{item.stateName}</td>
                  <td className="border px-4 py-2">{item.invoiceNumber}</td>
                  <td className="border px-4 py-2">
                    {formatDate(item.invoiceDate)}
                  </td>
                  <td className="border px-4 py-2">{item.invoiceValue}</td>
                  <td className="border px-4 py-2">{item.hsnSac}</td>
                  <td className="border px-4 py-2">{item.description}</td>
                  <td className="border px-4 py-2">{item.taxableValue}%</td>
                  <td className="border px-4 py-2">{item.quantity}</td>
                  <td className="border px-4 py-2">{item.unit}</td>
                  <td className="border px-4 py-2">{item.rate}</td>
                  <td className="border px-4 py-2">{item.amount}</td>
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
                        Invoice
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
