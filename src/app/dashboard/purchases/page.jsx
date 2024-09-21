"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import InputField from '@/components/InputField';
import AddBankModel from '@/components/AddBankModel';
import { CiBank } from "react-icons/ci";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Purchase = () => {
  const [formData, setFormData] = useState({
    vendorName: '',
    tds: 'no',
    rem: 'no',
    paidDate: '',
    amountPaid: '',
    warehouseLocation: 'Jaipur',
    asset: '',
    assetName: '',
    assetValue: '',
    assetDescription: '',
    purchaseDescription: '',
    purchaseBill: '',
  });

  const [showAssetFields, setShowAssetFields] = useState(false);
  const [showBankModal, setShowBankModal] = useState(false);
  const [bankAccounts, setBankAccounts] = useState([{ bankName: 'Bank 1' }, { bankName: 'Bank 2' }])
  const router = useRouter();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));

    if (id === 'asset') {
      setShowAssetFields(value === 'Yes');
    }
  };

  const handleAddBankAccount = async (formData) => {
    try {
      const response = await fetch('/api/purchases/addbank', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        toast.success('Bank Details added successfully!');
        setBankAccounts((prevAccounts) => [...prevAccounts, formData]);
        setShowBankModal(false);
      } else {
        toast.error(`Failed to add bank details: ${result.message}`);
      }
    } catch (error) {
      console.error('Error adding bank details:', error);
      toast.error('Failed to add bank details');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await fetch('/api/purchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        toast.success('Purchase added successfully!');
      } else {
        toast.error(`Failed to add purchase: ${result.message}`);
      }
    } catch (error) {
      console.error('Error adding purchase:', error);
      toast.error('Failed to add purchase');
    }
  };

  return (
    <>
       <h1 className="text-2xl font-bold my-6 ml-20 sm:ml-32 lg:ml-28">Purchase Management</h1>
      <div className="bg-white w-auto ml-20 -mr-12 sm:ml-32 sm:-mr-16 md:-mr-24 lg:-mr-0 lg:ml-24 xl:ml-28 rounded-lg p-5 py-8 my-3 h-[533px] overflow-hidden overflow-y-scroll scrollbar-hide">
      <form onSubmit={handleSubmit}>
          <InputField
            label="Vendor Name"
            type="text"
            id="vendorName"
            placeholder="Vendor Name (Paid To)"
            value={formData.vendorName}
            onChange={handleInputChange}
            required={true}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-6">
            <InputField
              label="TDS Applicable?"
              id="tds"
              isSelect={true}
              options={["No", "Yes"]}
              value={formData.tds}
              onChange={handleInputChange}
            />
            <InputField
              label="RCM Applicable?"
              id="rem"
              isSelect={true}
              options={["No", "Yes"]}
              value={formData.rem}
              onChange={handleInputChange}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-6 mb-6">
            <InputField
              label="Date Paid"
              type="date"
              id="paidDate"
              value={formData.paidDate}
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
                value={formData.paymentFrom}
                onChange={handleInputChange}
                required
              >
                {bankAccounts?.map((account, index) => (
                  <option key={index} value={account.bankName}>
                    {account.bankName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <AddBankModel
            isOpen={showBankModal}
            onClose={() => setShowBankModal(false)}
            onSubmit={handleAddBankAccount}
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
              label="warehouseLocation"
              id="warehouseLocation"
              isSelect={true}
              options={["Jaipur", "Bangalore"]}
              value={formData.warehouseLocation}
              onChange={handleInputChange}
              isTextArea={true}
            />
          </div>

          <InputField
            label="Asset"
            id="asset"
            isSelect={true}
            options={["No", "Yes"]}
            value={formData.asset}
            onChange={handleInputChange}
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
            value={formData.paymentMethod}
            onChange={handleInputChange}
          />

          <InputField
            label="Purchase Description"
            type="textarea"
            id="purchaseDescription"
            placeholder="Add order notes, if any"
            value={formData.purchaseDescription}
            onChange={handleInputChange}
          />

          <InputField
            label="Upload Purchase Bill"
            type="file"
            id="purchaseBill"
            onChange={(e) => setFormData({ ...formData, purchaseBill: e.target.files[0] })}
          />

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
      <ToastContainer />
    </>

  );
};

export default Purchase;