"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Modal from '@/components/Modal';

export default function StockManagement() {
  const [items, setItems] = useState([{ sku: '', quantity: '' }]);
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);
  const handleSubmits = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    handleClose();
  };

  const handleAddItem = () => {
    setItems([...items, { sku: '', quantity: '' }]);
  };

  const handleRemoveItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const handleInputChange = (index, field, value) => {
    const newItems = items.map((item, i) => {
      if (i === index) {
        return { ...item, [field]: value };
      }
      return item;
    });
    setItems(newItems);
  };

  /////////////

  const [formData, setFormData] = useState({
    productName: '',
    stockQuantity: '',
    reorderLevel: '',
    price: '',
  });

  const [products, setProducts] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter(); 

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    setProducts(storedProducts);
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
  };

  return (
    <div className="w-full ml-12 sm:ml-24 md:ml-36 lg:ml-20 mt-6 text-black">
      <h1 className="text-2xl font-bold mb-4">Stock Management</h1>
      
      <div className="bg-white p-6 rounded-lg space-y-4">
        <h2 className="font-bold text-lg">Add New Stock Order</h2>
        <button onClick={handleOpen} className="py-2 px-4 bg-blue-500 text-white rounded">
        Add New SKU
      </button>
      <Modal isOpen={modalOpen} onClose={handleClose} onSubmit={handleSubmits} />
        {items.map((item, index) => (
          <div key={index} className="flex space-x-2">
            <select
              className="border p-2 rounded"
              value={item.sku}
              onChange={(e) => handleInputChange(index, 'sku', e.target.value)}
            >
              {/* Options should be fetched from your database or state */}
              <option value="">Select SKU / Product</option>
            </select>
            <input
              type="number"
              className="border p-2 rounded"
              placeholder="Quantity"
              value={item.quantity}
              onChange={(e) => handleInputChange(index, 'quantity', e.target.value)}
            />
            {index > 0 && (
              <button
                className="bg-red-500 text-white p-2 rounded"
                onClick={() => handleRemoveItem(index)}
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button className="bg-green-500 text-white p-2 rounded" onClick={handleAddItem}>Add</button>
        <div>
          <label className="block">Warehouse</label>
          <select className="border p-2 rounded w-full">
            <option>option 1</option>
          </select>
        </div>
        <div>
          <label className="block">Order Notes</label>
          <textarea className="border p-2 rounded w-full" placeholder="Add order notes, if any"></textarea>
        </div>
        <button className="bg-blue-500 text-white p-2 rounded w-full">Create Stock Order</button>
      </div>

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
