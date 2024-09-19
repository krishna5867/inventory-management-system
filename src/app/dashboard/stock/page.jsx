"use client"; 

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
// import Notification from '.../../components/Notification';

const sendEmailNotification = async (email, subject, text) => {
  try {
    const res = await fetch('/api/send-email', {
      method: 'POST',
      body: JSON.stringify({ email, subject, text }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.ok) {
      console.log('Email sent successfully');
    } else {
      console.error('Failed to send email');
    }
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

export default function StockManagement() {
  const [formData, setFormData] = useState({
    productName: '',
    stockQuantity: '',
    reorderLevel: '',
    price: '',
  });

  const [products, setProducts] = useState([]);
  const [lowStockAlerts, setLowStockAlerts] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter(); 

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    setProducts(storedProducts);

    const lowStockProducts = storedProducts.filter(product => product.stockQuantity <= product.reorderLevel);
    setLowStockAlerts(lowStockProducts);

    lowStockProducts.forEach(product => {
      const email = 'admin@example.com';  
      const subject = `Low Stock Alert for ${product.productName}`;
      const message = `${product.productName} is running low with only ${product.stockQuantity} units left. Please reorder.`;
      sendEmailNotification(email, subject, message);  
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProduct = { 
      ...formData, 
      stockQuantity: parseInt(formData.stockQuantity), 
      reorderLevel: parseInt(formData.reorderLevel), 
      price: parseFloat(formData.price),
      history: [], 
    };

    const newProducts = [...products, newProduct];
    setProducts(newProducts);
    localStorage.setItem('products', JSON.stringify(newProducts));

    setFormData({
      productName: '',
      stockQuantity: '',
      reorderLevel: '',
      price: '',
    });

    setSuccessMessage('Product added successfully.');

    const lowStockProducts = newProducts.filter(product => product.stockQuantity <= product.reorderLevel);
    setLowStockAlerts(lowStockProducts);

    lowStockProducts.forEach(product => {
      const email = 'admin@example.com'; 
      const subject = `Low Stock Alert for ${product.productName}`;
      const message = `${product.productName} has only ${product.stockQuantity} units left. Please reorder.`;
      sendEmailNotification(email, subject, message);  
    });
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
      <h1 className="text-2xl font-bold mb-4">Stock Management</h1>

      {lowStockAlerts.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-red-600">Low Stock Alerts</h2>
          <ul>
            {lowStockAlerts.map((product, index) => (
              <li key={index} className="text-red-500">
                {product.productName} is running low with only {product.stockQuantity} units left (Reorder Level: {product.reorderLevel}).
              </li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Product Name</label>
          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md"
            placeholder="Enter product name"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Stock Quantity</label>
          <input
            type="number"
            name="stockQuantity"
            value={formData.stockQuantity}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md"
            placeholder="Enter stock quantity"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Reorder Level</label>
          <input
            type="number"
            name="reorderLevel"
            value={formData.reorderLevel}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md"
            placeholder="Enter reorder level"
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
            placeholder="Enter product price"
            required
          />
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
          onClick={() => router.push('/dashboard/stock/show-data')}  
          className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
        >
          Show Data
        </button>
      </div>
    </div>
  );
}
