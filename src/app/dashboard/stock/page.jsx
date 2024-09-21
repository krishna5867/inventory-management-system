"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal";
import InputField from "@/components/InputField";

export default function StockManagement() {
  const [items, setItems] = useState([{ sku: "", quantity: "" }]);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    productName: "",
    stockQuantity: "",
    warehouse: "",
    orderNotes: "",
  });
  const [products, setProducts] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(storedProducts);
  }, []);

  const handleModalToggle = () => setModalOpen(!modalOpen);

  const handleAddItem = () => {
    setItems([...items, { sku: "", quantity: "" }]);
  };

  const handleRemoveItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleInputChange = (index, field, value) => {
    setItems(items.map((item, i) => (i === index ? { ...item, [field]: value } : item)));
  };

  const handleCreateStockOrder = () => {
    console.log("Creating stock order with the following values:");
    console.log("Items: ", items);
    console.log("Form Data: ", formData);
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
        {items.map((item, index) => (
          <div key={index} className="flex flex-col sm:flex-row space-x-0 sm:space-x-2">
            <InputField
              label="SKU"
              isSelect
              id={`sku-${index}`}
              options={["Select SKU / Product", "product 1"]}
              value={item.sku}
              onChange={(e) => handleInputChange(index, "sku", e.target.value)}
            />
            <InputField
              label="Quantity"
              type="number"
              id={`quantity-${index}`}
              placeholder="Quantity"
              value={item.quantity}
              onChange={(e) => handleInputChange(index, "quantity", e.target.value)}
            />
            {index > 0 && (
              <button
                className="bg-red-500 text-white px-2 py-1 rounded h-full mt-8"
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
        <InputField label="Warehouse" isSelect id="warehouse" options={["Jaipur", "Banglore"]} />
        <InputField label="Order Notes" isTextArea id="orderNotes" placeholder="Add order notes" />
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
    </div>
  );
}
