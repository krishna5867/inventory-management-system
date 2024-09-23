'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';


export default function SalesLedger() {
  const [formData, setFormData] = useState({
    customer: '',
    product: '',
    price: '',
    tax: '',
    date: '',
    paymentStatus: 'pending',  
  });


  const [successMessage, setSuccessMessage] = useState('');  
  const router = useRouter();  

  useEffect(() => {
    const storedSales = JSON.parse(localStorage.getItem('sales'));
    if (!storedSales) {
      localStorage.setItem('sales', JSON.stringify([]));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const total = (parseFloat(formData.price) * (1 + parseFloat(formData.tax) / 100)).toFixed(2);

    const storedSales = JSON.parse(localStorage.getItem('sales')) || [];
    const newSales = [...storedSales, { ...formData, total }];

    localStorage.setItem('sales', JSON.stringify(newSales));
    const response = await fetch('/api/sales', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
      setSuccessMessage('Sale added successfully');

      setFormData({
        customer: '',
        product: '',
        price: '',
        tax: '',
        date: '',
        paymentStatus: 'pending',
      });
    } else {
      setSuccessMessage('Error adding sale: ' + data.error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div>
    <div className="w-full ml-12 sm:ml-24 md:ml-36 lg:ml-20 mt-6 text-black">

        <h1 className="text-2xl font-bold mb-4">Sales Ledger</h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Customer</label>
            <input
              type="text"
              name="customer"
              value={formData.customer}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md"
              placeholder="Enter customer name"
            required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Product</label>
            <input
              type="text"
              name="product"
              value={formData.product}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md"
              placeholder="Enter product name"
            required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md"
              placeholder="Enter price"
            required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Tax (%)</label>
            <input
              type="number"
              name="tax"
              value={formData.tax}
              onChange={handleInputChange}
              className="mt-1  block w-full px-3 py-2 bg-white border border-gray-300 rounded-md"
              placeholder="Enter tax percentage"
            required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md"
            required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Payment Status</label>
            <select
              name="paymentStatus"
              value={formData.paymentStatus}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md"
            required
            >
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>

        {successMessage && (
          <div className="mb-6 text-green-500 font-semibold">
            {successMessage}
          </div>
        )}

        <div className="flex justify-end mb-4">
          <button
            onClick={() => router.push('/dashboard/sales/show')} 
            className="bg-gray-600 mt-4 sm:mt-0 text-white px-4 py-2 rounded-md hover:bg-gray-700"

          >
            Show Data
          </button>
        </div>
      </div>
    </div>
  );
}
