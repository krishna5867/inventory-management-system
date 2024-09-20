import React, { useState } from 'react';
import InputField from './InputField';

const AddBankModal = ({ isOpen, onClose, addBankAccount }) => {
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addBankAccount({ bankName, accountNumber, description });
    onClose();  
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg w-72 sm:w-1/2 md:w-1/3">
        <h2 className="text-xl font-semibold mb-4">Add New Bank Account</h2>
        <form onSubmit={handleSubmit}>
          <InputField
            label="Name"
            type="text"
            id="bankName"
            placeholder="Bank name"
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
            required={true}
          />
          <InputField
            label="Account Number"
            type="text"
            id="accountNumber"
            placeholder="Account number"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            required={true}
          />
          <InputField
            label="Bank Description"
            isTextArea={true}
            id="description"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required={true}
          />
          <div className="flex justify-end gap-4">
            <button type="button" onClick={onClose} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
              Close
            </button>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBankModal;
