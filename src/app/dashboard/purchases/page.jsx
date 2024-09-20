"use client";
import { useState } from "react";
import InputField from "@/components/InputField";
import AddBankModel from "@/components/AddBankModel";
import { CiBank } from "react-icons/ci";

const Purchase = () => {
  const [formData, setFormData] = useState({
    vendorName: "",
    date: "",
    amountPaid: "",
    purchaseDescription: "",
    asset: "NO",
    assetName: "",
    assetValue: "",
    assetDescription: "",
    TDSApplicable: "NO",
    RCMApplicable: "NO",
    paymentFromBankAccount: "Bank 1",
    warehouse: "Jaipur",
    paymentMethod: "cash",
    purchaseBill: "",
  });

  const [showAssetFields, setShowAssetFields] = useState(false);
  const [showBankModal, setShowBankModal] = useState(false);
  const [bankAccounts, setBankAccounts] = useState([
    { bankName: "Bank 1" },
    { bankName: "Bank 2" },
  ]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });

    if (e.target.id === "asset") {
      setShowAssetFields(e.target.value === "Yes");
    }
  };

  const handleBankSubmit = (newBank) => {
    setBankAccounts((prev) => [...prev, newBank]);
    setFormData((prev) => ({ ...prev, paymentFromBankAccount: newBank.bankName }));
    setShowBankModal(false);
  };
  
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  return (
    <div>
       <h1 className="text-2xl font-bold my-6 ml-20 sm:ml-32 lg:ml-28">Purchase Management</h1>
    <div className="bg-white w-auto ml-20 -mr-12 sm:ml-32 sm:-mr-16 md:-mr-24 lg:-mr-0 lg:ml-24 xl:ml-28 rounded-lg p-5 py-8 my-3 h-[533px] overflow-hidden overflow-y-scroll scrollbar-hide">
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
            id="TDSApplicable"
            isSelect={true}
            options={["No", "Yes"]}
            value={formData.TDSApplicable}
            onChange={handleInputChange}
          />
          <InputField
            label="RCM Applicable?"
            id="RCMApplicable"
            isSelect={true}
            options={["No", "Yes"]}
            value={formData.RCMApplicable}
            onChange={handleInputChange}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-6 mb-6">
          <InputField
            label="Date Paid"
            type="date"
            id="date"
            value={formData.date}
            onChange={handleInputChange}
            required={true}
          />

          <div>
            <label
              htmlFor="paymentFrom"
              className="block mb-2 text-sm font-medium text-gray-900 -mt-3"
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
              id="paymentFromBankAccount"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={formData.paymentFromBankAccount}
              onChange={handleInputChange}
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
            value={formData.warehouse}
            onChange={handleInputChange}
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
              isTextArea={true}
            />
          </div>
        )}

        <InputField
          label="Payment Method"
          id="paymentMethod"
          isSelect={true}
          options={[
            "Select Payment Method",
            "Cash",
            "Cheque",
            "Online Transfer",
          ]}
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
          isTextArea={true}
        />

        <InputField
          label="Upload Purchase Bill"
          type="file"
          id="purchaseBill"
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
    </div>
  );
};

export default Purchase;
