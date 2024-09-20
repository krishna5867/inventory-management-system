"use client";
import { useState } from 'react';
import InputField from '@/components/InputField'; 
import AddBankModel from '@/components/AddBankModel'; 
import { CiBank } from "react-icons/ci";

const YourComponent = () => {
  const [formData, setFormData] = useState({
    supplier: '',
    date: '',
    amountPaid: '',
    purchaseDescription: '',
    asset: '', 
    assetName: '',
    assetValue: '',
    assetDescription: '',
  });

  const [showAssetFields, setShowAssetFields] = useState(false);
  const [showBankModal, setShowBankModal] = useState(false);
  const [bankAccounts, setBankAccounts] = useState([{ bankName: 'Bank 1' }, { bankName: 'Bank 2' }]); 

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });

    if (e.target.id === 'asset') {
      setShowAssetFields(e.target.value === 'Yes');
    }
  };

  const handleBankSubmit = (newBank) => {
    setBankAccounts([...bankAccounts, { bankName: newBank }]);
    setShowBankModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  return (
    <div className="bg-white mt-4 ml-10 -mr-16 md:ml-40 sm:-mr-28 lg:-mr-0 lg:ml-32 rounded-lg max-w-4xl mx-auto p-5 h-[600px] overflow-hidden overflow-y-scroll scrollbar-hide">
      <form onSubmit={handleSubmit}>
        <InputField
          label="Vendor Name"
          type="text"
          id="vendorName"
          placeholder="Vendor Name (Paid To)"
          value={formData.supplier}
          onChange={handleInputChange}
          required={true}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-6">
          <InputField
            label="TDS Applicable?"
            id="tds"
            isSelect={true}
            options={["No", "Yes"]}
          />
          <InputField
            label="RCM Applicable?"
            id="rcm"
            isSelect={true}
            options={["No", "Yes"]}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-6 mb-6">
          <InputField
            label="Date Paid"
            type="date"
            id="datePaid"
            value={formData.date}
            onChange={handleInputChange}
            required={true}
          />

          <div>
            <label
              htmlFor="paymentFrom"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Payment From Bank Account
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setShowBankModal(true);
                }}
              className="ml-2 py-1 px-1 xl:ml-4 xl:py-2 xl:px-2 text-xs rounded bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 text-white"
              >
                <span className="hidden lg:block">Add Bank Account</span> 
                <span className="block lg:hidden"><CiBank size={20} /></span>
              </button>
            </label>
            <select
              id="paymentFrom"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            >
              {bankAccounts.map((account, index) => (
                <option key={index}>{account.bankName}</option>
              ))}
            </select>
          </div>
        </div>

        <AddBankModel
          isOpen={showBankModal}
          onClose={() => setShowBankModal(false)}
          addBankAccount={handleBankSubmit}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-6 sm:mb-6">
          <InputField
            label="Amount Paid"
            type="number"
            id="amountPaid"
            placeholder="Amount Paid"
            value={formData.amountPaid}
            onChange={handleInputChange}
            required={true}
          />

          <InputField
            label="Warehouse"
            id="warehouse"
            isSelect={true}
            options={["Jaipur", "Banglore"]}
          />
        </div>

        <InputField
          label="Asset"
          id="asset"
          isSelect={true}
          options={["No", "Yes"]}
          onChange={handleInputChange}
          value={formData.asset}
        />

        {showAssetFields && (
          <div className="mt-4">
            <InputField
              label="Asset Name"
              type="text"
              id="assetName"
              placeholder="Enter Asset Name"
              value={formData.assetName}
              onChange={handleInputChange}
              required={true}
            />
            <InputField
              label="Asset Value"
              type="number"
              id="assetValue"
              placeholder="Enter Asset Value"
              value={formData.assetValue}
              onChange={handleInputChange}
              required={true}
            />
            <InputField
              label="Asset Description"
              type="textarea"
              id="assetDescription"
              placeholder="Enter Asset Description"
              value={formData.assetDescription}
              onChange={handleInputChange}
            />
          </div>
        )}

        <InputField
          label="Payment Method"
          id="paymentMethod"
          isSelect={true}
          options={["Select Payment Method", "Cash", "Cheque", "Online Transfer"]}
        />

        <InputField
          label="Purchase Description"
          type="textarea"
          id="purchaseDescription"
          placeholder="Add order notes, if any"
          value={formData.purchaseDescription}
          onChange={handleInputChange}
        />

        <InputField label="Upload Purchase Bill" type="file" id="purchaseBill" />

        <button
          type="submit"
          className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Add New Purchase
        </button>
      </form>

      <div className="flex justify-end mb-4">
        <button
          onClick={() => router.push("/dashboard/purchases/show-data")}
          className="bg-gray-600 mt-4 sm:mt-0 text-white px-4 py-2 rounded-md hover:bg-gray-700"
        >
          Show Data
        </button>
      </div>
    </div>
  );
};

export default YourComponent;

