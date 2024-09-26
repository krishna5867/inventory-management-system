'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import InputField from '@/components/InputField';
import AddBankModel from '@/components/AddBankModel';
import { CiBank } from 'react-icons/ci';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddWarehouseMadal from '@/components/AddWarehouseMadal';
import { useBankDetails, useWarehouseLocation } from '@/hooks';

const Purchase = () => {
  const { bankDetails, status, error } = useBankDetails();
  const {locationDetails} = useWarehouseLocation();

  const [formState, setFormState] = useState({
    vendorName: '',
    tds: 'no',
    rem: 'no',
    paidDate: '',
    paymentFrom: '',
    amountPaid: '',
    warehouseLocation: '',
    asset: '',
    assetName: '',
    assetValue: '',
    assetDescription: '',
    purchaseDescription: '',
    purchaseBill: null,
  });

  const [showAssetFields, setShowAssetFields] = useState(false);
  const [showBankModal, setShowBankModal] = useState(false);
  const [showWarehouseModal, setShowWarehouseModal] = useState(false);
  const router = useRouter();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormState((prevFormState) => ({
      ...prevFormState,
      [id]: value,
    }));

    if (id === 'asset') {
      setShowAssetFields(value === 'yes');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormState((prevFormState) => ({
      ...prevFormState,
      purchaseBill: file,
    }));
  };

  const handleAddBankAccount = async (bankFormData) => {
    try {
      const response = await fetch('/api/purchases/addbank', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bankFormData),
      });

      const result = await response.json();
      if (response.ok) {
        toast.success('Bank Details added successfully!');
        setShowBankModal(false);
      } else {
        toast.error(`Failed to add bank details: ${result.message}`);
      }
    } catch (error) {
      console.error('Error adding bank details:', error);
      toast.error('Failed to add bank details');
    }
  };


  const handleAddWarehouse = async (warehouseFormData) => {
      try {
        const response = await fetch('/api/purchases/addwarehouse', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(warehouseFormData),
        });
  
        const result = await response.json();
        if (response.ok) {
          toast.success('Warehouse Location added successfully!');
          setShowBankModal(false);
        } else {
          toast.error(`Failed to add Warehouse Location: ${result.message}`);
        }
      } catch (error) {
        console.error('Error adding Warehouse Location:', error);
        toast.error('Failed to add Warehouse Location');
      }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.keys(formState).forEach((key) => {
      if (formState[key] !== null) {
        formData.append(key, formState[key]);
      }
    });

    if (formState.purchaseBill) {
      formData.append('purchaseBill', formState.purchaseBill);
    } else {
      console.error('No file selected');
    }

    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      const response = await fetch('/api/purchases', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        toast.success('Purchase created successfully');
      } else {
        const errorData = await response.json();
        toast.error(`Error creating purchase: ${errorData.message}`);
      }
    } catch (error) {
      toast.error(`Failed to create purchase: ${error.message}`);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold my-6 ml-20 sm:ml-32 lg:ml-28">
        Purchase Management
      </h1>
      <div className="bg-white w-auto ml-20 -mr-12 sm:ml-32 sm:-mr-16 md:-mr-24 lg:-mr-0 lg:ml-24 xl:ml-28 rounded-lg p-5 py-8 my-3 h-[533px] overflow-hidden overflow-y-scroll scrollbar-hide">
        <form onSubmit={handleSubmit}>
          <InputField
            label="Vendor Name"
            type="text"
            id="vendorName"
            placeholder="Vendor Name (Paid To)"
            value={formState.vendorName}
            onChange={handleInputChange}
            required={true}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-6">
            <InputField
              label="TDS Applicable?"
              id="tds"
              isSelect={true}
              options={[
                { label: 'No', value: 'no' },
                { label: 'Yes', value: 'yes' },
              ]}
              value={formState.tds}
              onChange={handleInputChange}
            />
            <InputField
              label="RCM Applicable?"
              id="rem"
              isSelect={true}
              options={[
                { label: 'No', value: 'no' },
                { label: 'Yes', value: 'yes' },
              ]}
              value={formState.rem}
              onChange={handleInputChange}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-6 mb-6">
            <InputField
              label="Date Paid"
              type="date"
              id="paidDate"
              value={formState.paidDate}
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
                  <span className="block lg:hidden">
                    <CiBank size={20} />
                  </span>
                </button>
              </label>
              <select
                id="paymentFrom"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                value={formState.paymentFrom}
                onChange={handleInputChange}
                required
              >
                {bankDetails.data?.map((account, index) => (
                  <option key={index} value={account.accountNumber}>
                    {account.bankName}-{account.accountNumber}
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
              value={formState.amountPaid}
              onChange={handleInputChange}
              required={true}
            />
            {/* Warehouse modal */}
            <div>
              <label
                htmlFor="warehouseLocation"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Warehouse Location
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setShowWarehouseModal(true);
                  }}
                  className="ml-2 py-1 px-1 xl:ml-4 xl:py-2 xl:px-2 text-xs rounded bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 text-white"
                >
                  <span className="hiddenlg:block">Add Warehouse Location</span>
                </button>
              </label>
              <select
                id="warehouseLocation"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                value={formState.warehouseLocation}
                onChange={handleInputChange}
                required
              >
                {locationDetails.data?.map((item, index) => (
                  <option key={index} value={item.warehouseLocation}>
                    {item.warehouseLocation}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <AddWarehouseMadal
            isOpen={showWarehouseModal}
            onClose={() => setShowWarehouseModal(false)}
            onSubmit={handleAddWarehouse}
          />

          {/* <InputField
            label="Warehouse Location"
            id="warehouseLocation"
            isSelect={true}
            options={[
              { label: 'Jaipur', value: 'Jaipur' },
              { label: 'Bangalore', value: 'Bangalore' },
            ]}
            value={formState.warehouseLocation}
            onChange={handleInputChange}
          /> */}
          <InputField
            label="Asset"
            id="asset"
            isSelect={true}
            options={[
              { label: 'No', value: 'no' },
              { label: 'Yes', value: 'yes' },
            ]}
            value={formState.asset}
            onChange={handleInputChange}
          />
          {showAssetFields && (
            <div className="mt-4">
              <InputField
                label="Asset Name"
                type="text"
                id="assetName"
                placeholder="Enter Asset Name"
                value={formState.assetName}
                onChange={handleInputChange}
                required={true}
              />
              <InputField
                label="Asset Value"
                type="number"
                id="assetValue"
                placeholder="Enter Asset Value"
                value={formState.assetValue}
                onChange={handleInputChange}
                required={true}
              />
              <InputField
                label="Asset Description"
                type="textarea"
                id="assetDescription"
                placeholder="Enter Asset Description"
                value={formState.assetDescription}
                onChange={handleInputChange}
              />
            </div>
          )}

          <InputField
            label="Payment Method"
            id="paymentMethod"
            isSelect={true}
            options={[
              { label: 'Select Payment Method', value: '' },
              { label: 'Cash', value: 'cash' },
              { label: 'Cheque', value: 'cheque' },
              { label: 'Online Transfer', value: 'online-transfer' },
            ]}
            value={formState.paymentMethod}
            onChange={handleInputChange}
          />

          <InputField
            label="Purchase Description"
            type="textarea"
            id="purchaseDescription"
            placeholder="Add order notes, if any"
            value={formState.purchaseDescription}
            onChange={handleInputChange}
          />

          <InputField
            label="Upload Purchase Bill"
            type="file"
            name="purchaseBill"
            onChange={handleFileChange}
          />

          <button
            type="submit"
            className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Add New Purchase
          </button>
        </form >

        <div className="flex justify-end mb-4">
          <button
            onClick={() => router.push('/dashboard/purchases/data')}
            className="bg-gray-600 mt-4 sm:mt-0 text-white px-4 py-2 rounded-md hover:bg-gray-700"
          >
            Show Data
          </button>
        </div>
      </div >
      <ToastContainer />
    </>
  );
};

export default Purchase;
