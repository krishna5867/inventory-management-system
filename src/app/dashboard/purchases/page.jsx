"use client"; 

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PurchaseOrders() {
  const [formData, setFormData] = useState({
    supplier: '',
    product: '',
    purchaseCost: '',
    tax: '',
    date: '',
    quantity: 1, 
    paymentStatus: 'pending', 
  });

  const [purchases, setPurchases] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();  

  useEffect(() => {
    const storedPurchases = JSON.parse(localStorage.getItem('purchases')) || [];
    setPurchases(storedPurchases);
  }, []);

  const updateStock = (productName, quantity) => {
    const storedStock = JSON.parse(localStorage.getItem('stock')) || {};

    const updatedStock = {
      ...storedStock,
      [productName]: (storedStock[productName] || 0) + parseInt(quantity, 10),  
    };

    localStorage.setItem('stock', JSON.stringify(updatedStock));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const totalCost = (parseFloat(formData.purchaseCost) * (1 + parseFloat(formData.tax) / 100)).toFixed(2);

    const newPurchases = [...purchases, { ...formData, totalCost }];
    setPurchases(newPurchases);
    localStorage.setItem('purchases', JSON.stringify(newPurchases));  

    updateStock(formData.product, formData.quantity);

    setFormData({
      supplier: '',
      product: '',
      purchaseCost: '',
      tax: '',
      date: '',
      quantity: 1,  
      paymentStatus: 'pending', 
    });

    setSuccessMessage('Purchase order added and stock updated successfully.');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="w-full ml-12 sm:ml-24 md:ml-36 lg:ml-20 mt-6 text-black">
      <h1 className="text-2xl font-bold mb-4">Add Purchase Order</h1>

      <form onSubmit={handleSubmit} className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Supplier</label>
          <input
            type="text"
            name="supplier"
            value={formData.supplier}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md"
            placeholder="Enter supplier name"
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
          <label className="block text-sm font-medium">Purchase Cost</label>
          <input
            type="number"
            name="purchaseCost"
            value={formData.purchaseCost}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md"
            placeholder="Enter purchase cost"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md"
            placeholder="Enter quantity"
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
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md"
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
          onClick={() => router.push('/dashboard/purchases/show-data')} 
          className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
        >
          Show Data
        </button>
      </div>
    </div>
  );
}
