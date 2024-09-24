'use client';

import React, { useState } from 'react';
import InputField from './InputField';

const Modal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    sku: '',
    productName: '',
    description: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
    setFormData({
      sku: '',
      productName: '',
      description: '',
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-5 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-sm w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add New SKU</h2>
        </div>
        <InputField
          label="SKU"
          type="text"
          id="sku"
          name="sku"
          placeholder="Sku"
          value={formData.sku}
          onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
          required={true}
        />
        <InputField
          label="Product Name"
          type="text"
          id="productName"
          name="productName"
          placeholder="Product Name"
          value={formData.productName}
          onChange={(e) =>
            setFormData({ ...formData, productName: e.target.value })
          }
          required={true}
        />
        <InputField
          label="Description"
          type="text"
          id="description"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
        <div className="flex items-center justify-between">
          <button
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Close
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
