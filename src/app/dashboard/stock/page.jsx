"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal";
import InputField from "@/components/InputField";

export default function StockManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    warehouse: "jaipur",
    orderNotes: "",
    items: [{ sku: "", quantity: "" }],
  });
  const router = useRouter();

  const handleAddItem = () => {
    setFormData((prevData) => ({
      ...prevData,
      items: [...prevData.items, { sku: "", quantity: "" }],
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

  const handleCreateStockOrder = () => {
    console.log("Creating stock order:", formData);
  };

  const skuFields = [
    { label: "SKU", name: "sku", type: "text", placeholder: "Enter SKU", required: true },
    { label: "Product Name", name: "productName", type: "text", placeholder: "Enter Product Name", required: true },
    { label: "Description", name: "description", type: "text", placeholder: "Enter Description", isTextArea: true },
  ];

  return (
    <div className="w-full ml-16 mt-6 text-black h-[600px] overflow-y-scroll overflow-hidden scrollbar-hide">
      <h1 className="text-2xl font-bold mb-4">Stock Management</h1>
      <div className="bg-white p-6 rounded-lg space-y-4">
        <h2 className="font-bold text-lg">Add New Stock Order</h2>
        <button onClick={() => setIsModalOpen(true)} className="py-2 px-4 bg-blue-500 text-white rounded">
          Add New SKU
        </button>
        <Modal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={() => console.log("Submitting SKU")}
          title="Add New SKU"
          fields={skuFields}
        />
        
        {formData.items.map((item, index) => (
          <div key={index} className="flex space-x-2">
            <InputField
              label="SKU"
              isSelect
              id={`sku-${index}`}
              options={["Select SKU", "Product 1"]}
              value={item.sku}
              onChange={(e) => handleFormDataChange("sku", e.target.value, index)}
            />
            <InputField
              label="Quantity"
              type="number"
              id={`quantity-${index}`}
              placeholder="Quantity"
              value={item.quantity}
              onChange={(e) => handleFormDataChange("quantity", e.target.value, index)}
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
          isSelect
          id="warehouse"
          options={["Jaipur", "Bangalore"]}
          value={formData.warehouse}
          onChange={(e) => handleFormDataChange("warehouse", e.target.value)}
        />
        <InputField
          label="Order Notes"
          isTextArea
          id="orderNotes"
          placeholder="Add order notes"
          value={formData.orderNotes}
          onChange={(e) => handleFormDataChange("orderNotes", e.target.value)}
        />

        <button className="bg-blue-500 text-white p-2 rounded w-full" onClick={handleCreateStockOrder}>
          Create Stock Order
        </button>
      </div>

      <div className="flex justify-end mb-4">
        <button
          onClick={() => router.push("/dashboard/stock/show-data")}
          className="bg-gray-600 text-white mt-6 px-4 py-2 rounded-md hover:bg-gray-700"
        >
          Show Data
        </button>
      </div>
    </div>
  );
}






