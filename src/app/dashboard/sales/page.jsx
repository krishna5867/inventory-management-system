// 'use client'

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';


// export default function SalesLedger() {
//   const [formData, setFormData] = useState({
//     customer: '',
//     product: '',
//     price: '',
//     tax: '',
//     date: '',
//     paymentStatus: 'pending',  
//   });


//   const [successMessage, setSuccessMessage] = useState('');  
//   const router = useRouter();  

//   useEffect(() => {
//     const storedSales = JSON.parse(localStorage.getItem('sales'));
//     if (!storedSales) {
//       localStorage.setItem('sales', JSON.stringify([]));
//     }
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     const total = (parseFloat(formData.price) * (1 + parseFloat(formData.tax) / 100)).toFixed(2);

//     const storedSales = JSON.parse(localStorage.getItem('sales')) || [];
//     const newSales = [...storedSales, { ...formData, total }];

//     localStorage.setItem('sales', JSON.stringify(newSales));
//     const response = await fetch('/api/sales', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(formData),
//     });

//     const data = await response.json();

//     if (response.ok) {
//       setSuccessMessage('Sale added successfully');

//       setFormData({
//         customer: '',
//         product: '',
//         price: '',
//         tax: '',
//         date: '',
//         paymentStatus: 'pending',
//       });
//     } else {
//       setSuccessMessage('Error adding sale: ' + data.error);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   return (
//     <div>
//     <div className="w-full ml-12 sm:ml-24 md:ml-36 lg:ml-20 mt-6 text-black">

//         <h1 className="text-2xl font-bold mb-4">Sales Ledger</h1>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-5 py-10">
//           <div>
//             <label className="block text-sm font-medium">Customer</label>
//             <input
//               type="text"
//               name="customer"
//               value={formData.customer}
//               onChange={handleInputChange}
//               className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md"
//               placeholder="Enter customer name"
//             required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium">Product</label>
//             <input
//               type="text"
//               name="product"
//               value={formData.product}
//               onChange={handleInputChange}
//               className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md"
//               placeholder="Enter product name"
//             required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium">Price</label>
//             <input
//               type="number"
//               name="price"
//               value={formData.price}
//               onChange={handleInputChange}
//               className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md"
//               placeholder="Enter price"
//             required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium">Tax (%)</label>
//             <input
//               type="number"
//               name="tax"
//               value={formData.tax}
//               onChange={handleInputChange}
//               className="mt-1  block w-full px-3 py-2 bg-white border border-gray-300 rounded-md"
//               placeholder="Enter tax percentage"
//             required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium">Date</label>
//             <input
//               type="date"
//               name="date"
//               value={formData.date}
//               onChange={handleInputChange}
//               className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md"
//             required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium">Payment Status</label>
//             <select
//               name="paymentStatus"
//               value={formData.paymentStatus}
//               onChange={handleInputChange}
//               className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md"
//             required
//             >
//               <option value="paid">Paid</option>
//               <option value="pending">Pending</option>
//               <option value="overdue">Overdue</option>
//             </select>
//           </div>
//           <div className="flex items-end">
//             <button
//               type="submit"
//               className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
//             >
//               Submit
//             </button>
//           </div>
//         </form>

//         {successMessage && (
//           <div className="mb-6 text-green-500 font-semibold">
//             {successMessage}
//           </div>
//         )}

//         <div className="flex justify-end mb-4">
//           <button
//             onClick={() => router.push('/dashboard/sales/show-data')} 
//             className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
//           >
//             Show Data
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }




'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';


export default function SalesLedger() {
  const [formData, setFormData] = useState({
    customerName: '',
    stateName: '',  
    invoiceNumber: '',
    invoiceDate: '',
    invoiceValue: '',
    hsnSac: '',
    description: '',
    taxableValue: '',
    quantity: '',
    unit: '',
    rate: '',
    amount: '',
  });


  const [successMessage, setSuccessMessage] = useState('');  
  const router = useRouter();  

  useEffect(() => {
    const storedSales = JSON.parse(localStorage.getItem('sales'));
    if (!storedSales) {
      localStorage.setItem('sales', JSON.stringify([]));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const total = (parseFloat(formData.price) * (1 + parseFloat(formData.tax) / 100)).toFixed(2);

    const storedSales = JSON.parse(localStorage.getItem('sales')) || [];
    const newSales = [...storedSales, { ...formData, total }];

    localStorage.setItem('sales', JSON.stringify(newSales));
    const response = await fetch('/api/sales', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
      setSuccessMessage('Sale added successfully');

      setFormData({
        customerName: '',
        stateName: '',  
        invoiceNumber: '',
        invoiceDate: '',
        invoiceValue: '',
        hsnSac: '',
        description: '',
        taxableValue: '',
        quantity: '',
        unit: '',
        rate: '',
        amount: '',
      });
    } else {
      setSuccessMessage('Error adding sale: ' + data.error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div>
    <div className="w-full ml-12 sm:ml-24 md:ml-36 lg:ml-16 mt-4 text-black h-[590px] overflow-hidden overflow-y-scroll scrollbar-hide">

        <h1 className="text-2xl font-bold mb-2">Sales Ledger</h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-5">
        <div>
          <label className="block text-sm font-medium">Customer Name</label>
          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md"
            placeholder="Enter customer name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">State Name</label>
          <input
            type="text"
            name="stateName"
            value={formData.stateName}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md"
            placeholder="Enter state name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Invoice Number</label>
          <input
            type="text"
            name="invoiceNumber"
            value={formData.invoiceNumber}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md"
            placeholder="Enter invoice number"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Invoice Date</label>
          <input
            type="date"
            name="invoiceDate"
            value={formData.invoiceDate}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Invoice Value</label>
          <input
            type="number"
            name="invoiceValue"
            value={formData.invoiceValue}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md"
            placeholder="Enter invoice value"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">HSN/SAC</label>
          <input
            type="text"
            name="hsnSac"
            value={formData.hsnSac}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md"
            placeholder="Enter HSN/SAC code"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Goods/Service Description</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md"
            placeholder="Enter description"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Taxable Value</label>
          <input
            type="number"
            name="taxableValue"
            value={formData.taxableValue}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md"
            placeholder="Enter taxable value"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md"
            placeholder="Enter quantity"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Unit</label>
          <input
            type="text"
            name="unit"
            value={formData.unit}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md"
            placeholder="Enter unit"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Rate</label>
          <input
            type="number"
            name="rate"
            value={formData.rate}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md"
            placeholder="Enter rate"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md"
            placeholder="Enter amount"
            required
          />
        </div>

        <div className="flex items-end">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </form>

        {successMessage && (
          <div className="mb-6 text-green-500 font-semibold">
            {successMessage}
          </div>
        )}

        <div className="flex justify-end mb-4">
          <button
            onClick={() => router.push('/dashboard/sales/show-data')} 
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            Show Data
          </button>
        </div>
      </div>
    </div>
  );
}

