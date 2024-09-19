// "use client"; 

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';

// export default function PurchaseOrders() {
//   const [formData, setFormData] = useState({
//     supplier: '',
//     product: '',
//     purchaseCost: '',
//     tax: '',
//     date: '',
//     quantity: 1, 
//     paymentStatus: 'pending', 
//   });

//   const [purchases, setPurchases] = useState([]);
//   const [successMessage, setSuccessMessage] = useState('');
//   const router = useRouter();  

//   useEffect(() => {
//     const storedPurchases = JSON.parse(localStorage.getItem('purchases')) || [];
//     setPurchases(storedPurchases);
//   }, []);

//   const updateStock = (productName, quantity) => {
//     const storedStock = JSON.parse(localStorage.getItem('stock')) || {};

//     const updatedStock = {
//       ...storedStock,
//       [productName]: (storedStock[productName] || 0) + parseInt(quantity, 10),  
//     };

//     localStorage.setItem('stock', JSON.stringify(updatedStock));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const totalCost = (parseFloat(formData.purchaseCost) * (1 + parseFloat(formData.tax) / 100)).toFixed(2);

//     const newPurchases = [...purchases, { ...formData, totalCost }];
//     setPurchases(newPurchases);
//     localStorage.setItem('purchases', JSON.stringify(newPurchases));  

//     updateStock(formData.product, formData.quantity);

//     setFormData({
//       supplier: '',
//       product: '',
//       purchaseCost: '',
//       tax: '',
//       date: '',
//       quantity: 1,  
//       paymentStatus: 'pending', 
//     });

//     setSuccessMessage('Purchase order added and stock updated successfully.');
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   return (
//     // <div className="w-full ml-12 sm:ml-24 md:ml-36 lg:ml-20 mt-6 text-black">
//     //   <h1 className="text-2xl font-bold mb-4">Add Purchase Order</h1>

//     //   <form onSubmit={handleSubmit} className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
//     //     <div>
//     //       <label className="block text-sm font-medium">Supplier</label>
//     //       <input
//     //         type="text"
//     //         name="supplier"
//     //         value={formData.supplier}
//     //         onChange={handleInputChange}
//     //         className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md"
//     //         placeholder="Enter supplier name"
//     //         required
//     //       />
//     //     </div>
//     //     <div>
//     //       <label className="block text-sm font-medium">Product</label>
//     //       <input
//     //         type="text"
//     //         name="product"
//     //         value={formData.product}
//     //         onChange={handleInputChange}
//     //         className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md"
//     //         placeholder="Enter product name"
//     //         required
//     //       />
//     //     </div>
//     //     <div>
//     //       <label className="block text-sm font-medium">Purchase Cost</label>
//     //       <input
//     //         type="number"
//     //         name="purchaseCost"
//     //         value={formData.purchaseCost}
//     //         onChange={handleInputChange}
//     //         className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md"
//     //         placeholder="Enter purchase cost"
//     //         required
//     //       />
//     //     </div>
//     //     <div>
//     //       <label className="block text-sm font-medium">Quantity</label>
//     //       <input
//     //         type="number"
//     //         name="quantity"
//     //         value={formData.quantity}
//     //         onChange={handleInputChange}
//     //         className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md"
//     //         placeholder="Enter quantity"
//     //         required
//     //       />
//     //     </div>
//     //     <div>
//     //       <label className="block text-sm font-medium">Tax (%)</label>
//     //       <input
//     //         type="number"
//     //         name="tax"
//     //         value={formData.tax}
//     //         onChange={handleInputChange}
//     //         className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md"
//     //         placeholder="Enter tax percentage"
//     //         required
//     //       />
//     //     </div>
//     //     <div>
//     //       <label className="block text-sm font-medium">Date</label>
//     //       <input
//     //         type="date"
//     //         name="date"
//     //         value={formData.date}
//     //         onChange={handleInputChange}
//     //         className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md"
//     //         required
//     //       />
//     //     </div>
//     //     <div>
//     //       <label className="block text-sm font-medium">Payment Status</label>
//     //       <select
//     //         name="paymentStatus"
//     //         value={formData.paymentStatus}
//     //         onChange={handleInputChange}
//     //         className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md"
//     //         required
//     //       >
//     //         <option value="paid">Paid</option>
//     //         <option value="pending">Pending</option>
//     //         <option value="overdue">Overdue</option>
//     //       </select>
//     //     </div>
//     //     <div className="flex items-end">
//     //       <button
//     //         type="submit"
//     //         className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
//     //       >
//     //         Submit
//     //       </button>
//     //     </div>
//     //   </form>
//     //   {successMessage && (
//     //     <div className="mb-6 text-green-500 font-semibold">
//     //       {successMessage}
//     //     </div>
//     //   )}

//     //   <div className="flex justify-end mb-4">
//     //     <button
//     //       onClick={() => router.push('/dashboard/purchases/show-data')} 
//     //       className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
//     //     >
//     //       Show Data
//     //     </button>
//     //   </div>
//     // </div>


//         <div className="max-w-4xl mx-auto p-5">
//       <form>
//         <div className="mb-6">
//           <label
//             htmlFor="vendorName"
//             className="block mb-2 text-sm font-medium text-gray-900"
//           >
//             Vendor Name
//           </label>
//           <input
//             type="text"
//             id="vendorName"
//             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
//             placeholder="Vendor Name (Paid To)"
//             required
//           />
//         </div>

//         <div className="grid grid-cols-2 gap-6">
//           <div className="mb-6">
//             <label
//               htmlFor="tds"
//               className="block mb-2 text-sm font-medium text-gray-900"
//             >
//               TDS Applicable?
//             </label>
//             <select
//               id="tds"
//               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
//             >
//               <option>No</option>
//               <option>Yes</option>
//             </select>
//           </div>

//           <div className="mb-6">
//             <label
//               htmlFor="rcm"
//               className="block mb-2 text-sm font-medium text-gray-900"
//             >
//               RCM Applicable?
//             </label>
//             <select
//               id="rcm"
//               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
//             >
//               <option>No</option>
//               <option>Yes</option>
//             </select>
//           </div>
//         </div>

//         <div className="mb-6">
//           <label
//             htmlFor="datePaid"
//             className="block mb-2 text-sm font-medium text-gray-900"
//           >
//             Date Paid
//           </label>
//           <input
//             type="date"
//             id="datePaid"
//             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
//             required
//           />
//         </div>

//         <div className="mb-6">
//           <label
//             htmlFor="paymentFrom"
//             className="block mb-2 text-sm font-medium text-gray-900"
//           >
//             Payment From Bank Account{" "}
//             <button
//               onClick={() => setShowModal(true)}
//               className="ml-4 py-2 px-2 text-sm rounded bg-gray-600 text-white"
//             >
//               Add Bank Account
//             </button>
//           </label>
//           <select
//             id="paymentFrom"
//             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
//           >
//             {/* <option>Select Bank Account</option>
//           <option>SBI</option> */}
//             {bankAccounts.map((account, index) => (
//               <option key={index}>{account.bankName}</option>
//             ))}
//           </select>
//         </div>
//         <AddBankModal
//           isOpen={showModal}
//           onClose={() => setShowModal(false)}
//           addBankAccount={addBankAccount}
//         />

//         <div className="mb-6">
//           <label
//             htmlFor="amountPaid"
//             className="block mb-2 text-sm font-medium text-gray-900"
//           >
//             Amount Paid
//           </label>
//           <input
//             type="number"
//             id="amountPaid"
//             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
//             required
//           />
//         </div>

//         <div className="mb-6">
//           <label
//             htmlFor="warehouse"
//             className="block mb-2 text-sm font-medium text-gray-900"
//           >
//             Warehouse
//           </label>
//           <select
//             id="warehouse"
//             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
//           >
//             <option>Select Warehouse</option>
//             {/* Add warehouse options here */}
//           </select>
//         </div>

//         <div className="mb-6">
//           <label
//             htmlFor="paymentMethod"
//             className="block mb-2 text-sm font-medium text-gray-900"
//           >
//             Payment Method
//           </label>
//           <select
//             id="paymentMethod"
//             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
//           >
//             <option>Select Payment Method</option>
//             <option>Cash</option>
//             <option>Cheque</option>
//             <option>Online Transfer</option>
//             {/* Add more payment methods if needed */}
//           </select>
//         </div>

//         <div className="mb-6">
//           <label
//             htmlFor="purchaseDescription"
//             className="block mb-2 text-sm font-medium text-gray-900"
//           >
//             Purchase Description
//           </label>
//           <textarea
//             id="purchaseDescription"
//             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
//             placeholder="Add order notes, if any"
//             rows="4"
//           ></textarea>
//         </div>

//         <div className="mb-6">
//           <label
//             htmlFor="purchaseBill"
//             className="block mb-2 text-sm font-medium text-gray-900"
//           >
//             Upload Purchase Bill
//           </label>
//           <input
//             type="file"
//             id="purchaseBill"
//             className="bg-gray-50 text-sm text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
//           />
//         </div>

//         <button
//           type="submit"
//           className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
//         >
//           Add New Purchase
//         </button>
//       </form>

//       {/* Show Data Button */}
//       <div className="flex justify-end mb-4">
//         <button
//           onClick={() => router.push("/dashboard/purchases/show-data")} // Navigate to "Show Data" page
//           className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
//         >
//           Show Data
//         </button>
//       </div>
//     </div>
//   );
// }




"use client"; // This marks the component as a Client Component

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AddBankModel from "@/components/AddBankModel";

export default function PurchaseOrders() {
  const [showModal, setShowModal] = useState(false);
  const [bankAccounts, setBankAccounts] = useState([
    {
      bankName: "SBI",
      accountNumber: "1234567890",
      description: "Main branch",
    },
  ]);

  const addBankAccount = (newAccount) => {
    setBankAccounts([...bankAccounts, newAccount]);
  };

  const [formData, setFormData] = useState({
    supplier: "",
    product: "",
    purchaseCost: "",
    tax: "",
    date: "",
    quantity: 1, // Add quantity for stock update
    paymentStatus: "pending", // Default payment status
  });

  const [purchases, setPurchases] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter(); // For navigating to "Show Data" page

  // Load purchase data from localStorage on component mount
  useEffect(() => {
    const storedPurchases = JSON.parse(localStorage.getItem("purchases")) || [];
    setPurchases(storedPurchases);
  }, []);

  // Function to update the stock after a purchase
  const updateStock = (productName, quantity) => {
    const storedStock = JSON.parse(localStorage.getItem("stock")) || {};

    // Update the stock for the given product
    const updatedStock = {
      ...storedStock,
      [productName]: (storedStock[productName] || 0) + parseInt(quantity, 10), // Add quantity to existing stock
    };

    // Save the updated stock back to localStorage
    localStorage.setItem("stock", JSON.stringify(updatedStock));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Calculate total cost including tax
    const totalCost = (
      parseFloat(formData.purchaseCost) *
      (1 + parseFloat(formData.tax) / 100)
    ).toFixed(2);

    // Add the new purchase to the list
    const newPurchases = [...purchases, { ...formData, totalCost }];
    setPurchases(newPurchases);
    localStorage.setItem("purchases", JSON.stringify(newPurchases)); // Save updated purchases to localStorage

    // Automatically update stock for the purchased product
    updateStock(formData.product, formData.quantity);

    // Clear the form fields
    setFormData({
      supplier: "",
      product: "",
      purchaseCost: "",
      tax: "",
      date: "",
      quantity: 1, // Reset quantity
      paymentStatus: "pending", // Reset payment status to default
    });

    // Show success message
    setSuccessMessage("Purchase order added and stock updated successfully.");
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-5">
      <form>
        <div className="mb-6">
          <label
            htmlFor="vendorName"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Vendor Name
          </label>
          <input
            type="text"
            id="vendorName"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Vendor Name (Paid To)"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="mb-6">
            <label
              htmlFor="tds"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              TDS Applicable?
            </label>
            <select
              id="tds"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option>No</option>
              <option>Yes</option>
            </select>
          </div>

          <div className="mb-6">
            <label
              htmlFor="rcm"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              RCM Applicable?
            </label>
            <select
              id="rcm"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option>No</option>
              <option>Yes</option>
            </select>
          </div>
        </div>

        <div className="mb-6">
          <label
            htmlFor="datePaid"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Date Paid
          </label>
          <input
            type="date"
            id="datePaid"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="paymentFrom"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Payment From Bank Account{" "}
            <button
              onClick={() => setShowModal(true)}
              className="ml-4 py-2 px-2 text-sm rounded bg-gray-600 text-white"
            >
              Add Bank Account
            </button>
          </label>
          <select
            id="paymentFrom"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            {/* <option>Select Bank Account</option>
          <option>SBI</option> */}
            {bankAccounts.map((account, index) => (
              <option key={index}>{account.bankName}</option>
            ))}
          </select>
        </div>
        <AddBankModel
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          addBankAccount={addBankAccount}
        />

        <div className="mb-6">
          <label
            htmlFor="amountPaid"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Amount Paid
          </label>
          <input
            type="number"
            id="amountPaid"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="warehouse"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Warehouse
          </label>
          <select
            id="warehouse"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option>Select Warehouse</option>
            {/* Add warehouse options here */}
          </select>
        </div>

        <div className="mb-6">
          <label
            htmlFor="paymentMethod"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Payment Method
          </label>
          <select
            id="paymentMethod"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option>Select Payment Method</option>
            <option>Cash</option>
            <option>Cheque</option>
            <option>Online Transfer</option>
            {/* Add more payment methods if needed */}
          </select>
        </div>

        <div className="mb-6">
          <label
            htmlFor="purchaseDescription"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Purchase Description
          </label>
          <textarea
            id="purchaseDescription"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Add order notes, if any"
            rows="4"
          ></textarea>
        </div>

        <div className="mb-6">
          <label
            htmlFor="purchaseBill"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Upload Purchase Bill
          </label>
          <input
            type="file"
            id="purchaseBill"
            className="bg-gray-50 text-sm text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Add New Purchase
        </button>
      </form>

      {/* Show Data Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => router.push("/dashboard/purchases/show-data")} // Navigate to "Show Data" page
          className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
        >
          Show Data
        </button>
      </div>
    </div>
  );
}