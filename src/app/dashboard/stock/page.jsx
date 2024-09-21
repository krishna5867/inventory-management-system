"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal";
import InputField from "@/components/InputField";
import useSku from '@/hooks/sku';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StockManagement = () => {
  const { sku } = useSku();
  console.log(sku);
  
  const { status, error, data } = sku;
  const [modalOpen, setModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    warehouseLocation: "jaipur",
    orderDescription: "",
    items: [{ skuId: data?.length > 0 ? data[0]?.sku : "", stockQuantity: "" }],
  });
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  const handleModalToggle = () => setModalOpen(!modalOpen);

  const handleAddItem = () => {
    setFormData((prevData) => ({
      ...prevData,
      items: [...prevData.items, { skuId: "", stockQuantity: "" }],
    }));
  };

  const handleRemoveItem = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      items: prevData.items.filter((_, i) => i !== index),
    }));
  };


  const handleFormDataChange = (field, value, index = null) => {
    if (index !== null) {
      setFormData((prevData) => ({
        ...prevData,
        items: prevData.items.map((item, i) =>
          i === index ? { ...item, [field]: value } : item
        ),
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [field]: value }));
    }
  };

  const handleCreateStockOrder = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await fetch('/api/stock', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        toast.success('Stock added successfully!');
      } else {
        toast.error(`Failed to add stock: ${result.message}`);
      }
    } catch (error) {
      console.error('Error adding stock:', error);
      toast.error('Failed to add stock');
    }
  };

  return (
    <div className="w-full ml-16 sm:ml-24 md:ml-32 lg:ml-10 xl:ml-16 mt-6 text-black h-[600px] overflow-hidden overflow-y-scroll scrollbar-hide">
      <h1 className="text-2xl font-bold mb-4">Stock Management</h1>
      <div className="bg-white p-6 rounded-lg space-y-4">
        <h2 className="font-bold text-lg">Add New Stock Order</h2>
        <button onClick={handleModalToggle} className="py-2 px-4 bg-blue-500 text-white rounded">
          Add New SKU
        </button>
        <Modal isOpen={modalOpen} onClose={handleModalToggle} onSubmit={handleModalToggle} />

        {status === "loading" && <p>Loading SKUs...</p>}
        {status === "failed" && <p>Error: {error}</p>}

        {status === "succeeded" && formData.items.map((item, index) => (
          <div key={index} className="flex space-x-2">
            <InputField
              label="SKU"
              isSelect
              id={`sku-${index}`}
              options={data.map((skuItem) => ({ label: skuItem.sku, value: skuItem.id }))}
              value={item.skuId}
              onChange={(e) => handleFormDataChange("skuId", e.target.value, index)}
            />
            <InputField
              label="Quantity"
              type="number"
              id={`quantity-${index}`}
              placeholder="Quantity"
              value={item.stockQuantity}
              onChange={(e) => handleFormDataChange("stockQuantity", e.target.value, index)}
            />
            {index > 0 && (
              <button
                className="bg-red-500 text-white px-2 py-1 rounded mt-8"
                onClick={() => handleRemoveItem(index)}
              >
                Remove
              </button>
            )}
          </div>
        ))}

        <button className="bg-green-500 text-white p-2 rounded" onClick={handleAddItem}>
          Add
        </button>

        <InputField
          label="Warehouse"
          isSelect={true}
          id="warehouse"
          options={[
            { label: "Jaipur", value: "Jaipur" },
            { label: "Bangalore", value: "Bangalore" }
          ]}
          value={formData.warehouseLocation}
          onChange={(e) => handleFormDataChange("warehouseLocation", e.target.value)}
        />
        <InputField
          label="Order Notes"
          isTextArea
          id="orderNotes"
          placeholder="Add order notes"
          value={formData.orderDescription}
          onChange={(e) => handleFormDataChange("orderDescription", e.target.value)}
        />

        <button className="bg-blue-500 text-white p-2 rounded w-full" onClick={handleCreateStockOrder}>
          Create Stock Order
        </button>
      </div>
      {successMessage && <div className="mb-6 text-green-500 font-semibold">{successMessage}</div>}

      <div className="flex justify-end mb-4">
        <button
          onClick={() => router.push("/dashboard/stock/show-data")}
          className="bg-gray-600 text-white mt-6 px-4 py-2 rounded-md hover:bg-gray-700"
        >
          Show Data
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default StockManagement;
