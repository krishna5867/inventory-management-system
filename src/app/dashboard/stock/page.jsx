"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal";
import InputField from "@/components/InputField";
import useSku from '@/hooks/useSku';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StockManagement = () => {
  const { sku } = useSku();

  const { status, error, data } = sku;
  const [modalOpen, setModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    warehouseLocation: "jaipur",
    orderDescription: "",
    items: [{ skuId: data?.length > 0 ? data[0]?.sku : "", stockQuantity: "" }],
  });
  const router = useRouter();

  const handleAddSku = async (formData) => {
    try {
      const response = await fetch('/api/stock/sku', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        toast.success('SKU added successfully!');
        setModalOpen(false);
      } else {
        toast.error(`Failed to add SKU: ${result.message}`);
      }
    } catch (error) {
      console.error('Error adding SKU details:', error);
      toast.error('Failed to add SKU details', error);
    }

  }

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
        setFormData({
          warehouseLocation: 'Jaipur',
          orderDescription: '',
          items: [{ skuId: data?.length > 0 ? data[0]?.sku : "", stockQuantity: "" }],
        });

      } else {
        toast.error(`${result.message}`);
      }
    } catch (error) {
      console.error('Error adding stock:', error);
      toast.error('Failed to add stock');
    }
  };

  return (
    <div className="w-full ml-16 sm:ml-24 md:ml-32 lg:ml-10 xl:ml-16 mt-6 text-black h-[600px] overflow-hidden overflow-y-scroll scrollbar-hide">
      <h1 className="text-2xl font-bold mb-4">Stock Management</h1>
      <form onSubmit={handleCreateStockOrder}>
        <div className="bg-white p-6 rounded-lg space-y-4">
          <h2 className="font-bold text-lg">Add New Stock Order</h2>
          <button onClick={(e) => {
            e.preventDefault();
            setModalOpen(true);
          }} className="py-2 px-4 bg-blue-500 text-white rounded">
            Add New SKU
          </button>
          <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} onSubmit={handleAddSku} />

          {status === "loading" && <p>Loading SKUs...</p>}
          {status === "failed" && <p>Error: {error}</p>}

          {status === "succeeded" && formData.items.map((item, index) => (
            <div key={index} className="flex space-x-2 items-center">
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
                <button type="button"
                  className="bg-red-500 text-white px-2 py-1.5 rounded"
                  onClick={() => handleRemoveItem(index)}
                >
                  Remove
                </button>
              )}
            </div>
          ))}

          <button type="button" className="bg-green-500 text-white p-2 rounded" onClick={handleAddItem}>
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

          <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
            Create Stock Order
          </button>
        </div>
        <div className="flex justify-end mb-4">
          <button
            type="button"
            onClick={() => router.push("/dashboard/stock/show-data")}
            className="bg-gray-600 text-white mt-6 px-4 py-2 rounded-md hover:bg-gray-700"
          >
            Show Data
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default StockManagement;
