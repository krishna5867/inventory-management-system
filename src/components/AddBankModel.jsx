// components/AddBankModal.js
import React, { useState } from 'react';

const AddBankModal = ({ isOpen, onClose, addBankAccount }) => {
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addBankAccount({ bankName, accountNumber, description });
    onClose();  // Close the modal after submission
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg w-1/4">
        <h2 className="text-xl font-semibold mb-4">Add New Bank Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input type="text" value={bankName} onChange={e => setBankName(e.target.value)} className="mt-2 p-2 block w-full rounded-md border-2 border-gray-300 shadow-sm" placeholder="Bank name" required />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Account Number</label>
            <input type="text" value={accountNumber} onChange={e => setAccountNumber(e.target.value)} className="mt-2 p-2 block w-full rounded-md border-2 border-gray-300 shadow-sm" required />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Bank Description</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} className="mt-2 block w-full rounded-md border-2 border-gray-300 shadow-sm" required></textarea>
          </div>
          <div className="flex justify-end gap-4">
            <button type="button" onClick={onClose} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Close</button>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBankModal;
