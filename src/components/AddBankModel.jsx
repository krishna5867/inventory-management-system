'use client';

import React, { useState } from 'react';
import InputField from './InputField';

const AddBankModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    bankName: '',
    accountNumber: '',
    description: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
    setFormData({
      bankName: '',
      accountNumber: '',
      description: '',
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg w-72 sm:w-1/2 md:w-1/3">
        <h2 className="text-xl font-semibold mb-4">Add New Bank Account</h2>
        <InputField
          label="Name"
          type="text"
          id="bankName"
          name="bankName"
          placeholder="Bank name"
          value={formData.bankName}
          onChange={(e) =>
            setFormData({ ...formData, bankName: e.target.value })
          }
          required={true}
        />
        <InputField
          label="Account Number"
          type="text"
          id="accountNumber"
          name="accountNumber"
          placeholder="Account number"
          value={formData.accountNumber}
          onChange={(e) =>
            setFormData({ ...formData, accountNumber: e.target.value })
          }
          required={true}
        />
        <InputField
          label="Bank Description"
          isTextArea={true}
          id="description"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
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

export default AddBankModal;
