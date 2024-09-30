'use client';

import React, { useState } from 'react';
import InputField from './InputField';

const AddWarehouseMadal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    warehouseLocation: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
    setFormData({
      warehouseLocation: '',
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg w-72 sm:w-1/2 md:w-1/3">
        <h2 className="text-xl font-semibold mb-4">Add Warehouse</h2>
        <InputField
          label="Warehouse Location Name"
          type="text"
          id="warehouseLocation"
          name="warehouseLocation"
          placeholder="Warehouse Location"
          value={formData.warehouseLocation}
          onChange={(e) =>
            setFormData({ ...formData, warehouseLocation: e.target.value })
          }
          required={true}
        />
        <div className="flex justify-end gap-4">
          <button
            type="button"
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

export default AddWarehouseMadal;
