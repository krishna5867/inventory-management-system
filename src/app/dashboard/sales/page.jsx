'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

    const total = (
      parseFloat(formData.price) *
      (1 + parseFloat(formData.tax) / 100)
    ).toFixed(2);

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
      toast.success('Sale added successfully');
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
      toast.error('Error adding sale: ' + data.error);
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
    <div className="flex justify-center items-center">
      <div className="w-full mx-4 mt-4 text-black h-[590px] overflow-hidden overflow-y-scroll scrollbar-hide">
        <h1 className="text-2xl font-bold mb-2">Sales Ledger</h1>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-5"
        >
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
            <label className="block text-sm font-medium">
              Goods/Service Description
            </label>
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
            onClick={() => router.push('/dashboard/sales/data')}
            className="bg-gray-600 mt-4 sm:mt-0 text-white px-4 py-2 rounded-md hover:bg-gray-700"
          >
            Show Data
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// export default function SalesLedger() {
//   const [formData, setFormData] = useState({
//     customerName: '',
//     stateName: '',
//     invoiceNumber: '',
//     invoiceDate: '',
//     invoiceValue: '',
//     hsnSac: '',
//     description: '',
//     taxableValue: '',
//     quantity: '',
//     unit: '',
//     rate: '',
//     amount: '',
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

//     const total = (
//       parseFloat(formData.price) *
//       (1 + parseFloat(formData.tax) / 100)
//     ).toFixed(2);

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
//       toast.success('Sale added successfully');
//       setFormData({
//         customerName: '',
//         stateName: '',
//         invoiceNumber: '',
//         invoiceDate: '',
//         invoiceValue: '',
//         hsnSac: '',
//         description: '',
//         taxableValue: '',
//         quantity: '',
//         unit: '',
//         rate: '',
//         amount: '',
//       });
//     } else {
//       toast.error('Error adding sale: ' + data.error);
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
//     <div className='w-3/4 m-auto flex justify-between items-center bg-red-500'>
//       <div className="w-auto h-auto flex flex-col justify-center items-center m-auto">
//         <h1 className="text-2xl font-bold mb-2">Sales Ledger</h1>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="w-full h-auto flex flex-col justify-center items-start gap-4 bg-white p-10 rounded-lg">
//         <div className='flex flex-col sm:flex-row justify-start items-start gap-4 sm:gap-20'>
//         <div>
//           <label className="block text-sm font-medium">Customer Name</label>
//           <input
//             type="text"
//             name="customerName"
//             value={formData.customerName}
//             onChange={handleInputChange}
//             className="mt-1 block w-96 px-3 py-2 bg-white border border-gray-300 rounded-md"
//             placeholder="Enter customer name"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium">State Name</label>
//           <input
//             type="text"
//             name="stateName"
//             value={formData.stateName}
//             onChange={handleInputChange}
//             className="mt-1 block w-96 px-3 py-2 bg-white border border-gray-300 rounded-md"
//             placeholder="Enter state name"
//             required
//           />
//         </div>
//         </div>
//         <div className='flex flex-col sm:flex-row justify-start items-start gap-4 sm:gap-20'>
//         <div>
//           <label className="block text-sm font-medium">Invoice Number</label>
//           <input
//             type="text"
//             name="invoiceNumber"
//             value={formData.invoiceNumber}
//             onChange={handleInputChange}
//             className="mt-1 block w-96 px-3 py-2 bg-white border border-gray-300 rounded-md"
//             placeholder="Enter invoice number"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium">Invoice Date</label>
//           <input
//             type="date"
//             name="invoiceDate"
//             value={formData.invoiceDate}
//             onChange={handleInputChange}
//             className="mt-1 block w-96 px-3 py-2 bg-white border border-gray-300 rounded-md"
//             required
//           />
//         </div>
//         </div>

//         <div className='flex flex-col sm:flex-row justify-start items-start gap-4 sm:gap-20'>
//         <div>
//           <label className="block text-sm font-medium">Invoice Value</label>
//           <input
//             type="number"
//             name="invoiceValue"
//             value={formData.invoiceValue}
//             onChange={handleInputChange}
//             className="mt-1 block w-96 px-3 py-2 bg-white border border-gray-300 rounded-md"
//             placeholder="Enter invoice value"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium">HSN/SAC</label>
//           <input
//             type="text"
//             name="hsnSac"
//             value={formData.hsnSac}
//             onChange={handleInputChange}
//             className="mt-1 block w-96 px-3 py-2 bg-white border border-gray-300 rounded-md"
//             placeholder="Enter HSN/SAC code"
//             required
//           />
//         </div>
//         </div>

//         <div className='flex flex-col sm:flex-row justify-start items-start gap-4 sm:gap-20'>
//         <div>
//           <label className="block text-sm font-medium">Goods/Service Description</label>
//           <input
//             type="text"
//             name="description"
//             value={formData.description}
//             onChange={handleInputChange}
//             className="mt-1 block w-96 px-3 py-2 bg-white border border-gray-300 rounded-md"
//             placeholder="Enter description"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium">Taxable Value</label>
//           <input
//             type="number"
//             name="taxableValue"
//             value={formData.taxableValue}
//             onChange={handleInputChange}
//             className="mt-1 block w-96 px-3 py-2 bg-white border border-gray-300 rounded-md"
//             placeholder="Enter taxable value"
//             required
//           />
//         </div>
//         </div>

//         <div className='flex flex-col sm:flex-row justify-start items-start gap-4 sm:gap-20'>
//         <div>
//           <label className="block text-sm font-medium">Quantity</label>
//           <input
//             type="number"
//             name="quantity"
//             value={formData.quantity}
//             onChange={handleInputChange}
//             className="mt-1 block w-96 px-3 py-2 bg-white border border-gray-300 rounded-md"
//             placeholder="Enter quantity"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium">Unit</label>
//           <input
//             type="text"
//             name="unit"
//             value={formData.unit}
//             onChange={handleInputChange}
//             className="mt-1 block w-96 px-3 py-2 bg-white border border-gray-300 rounded-md"
//             placeholder="Enter unit"
//             required
//           />
//         </div>
//         </div>

//         <div className='flex flex-col sm:flex-row justify-start items-start gap-4 sm:gap-20'>
//         <div>
//           <label className="block text-sm font-medium">Rate</label>
//           <input
//             type="number"
//             name="rate"
//             value={formData.rate}
//             onChange={handleInputChange}
//             className="mt-1 block w-96 px-3 py-2 bg-white border border-gray-300 rounded-md"
//             placeholder="Enter rate"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium">Amount</label>
//           <input
//             type="number"
//             name="amount"
//             value={formData.amount}
//             onChange={handleInputChange}
//             className="mt-1 block w-96 px-3 py-2 bg-white border border-gray-300 rounded-md"
//             placeholder="Enter amount"
//             required
//           />
//         </div>
//         </div>

//         <div className="flex items-end">
//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
//           >
//             Submit
//           </button>
//         </div>
//       </form>
//         {successMessage && (
//           <div className="mb-6 text-green-500 font-semibold">
//             {successMessage}
//           </div>
//         )}

//         <div className="flex justify-end mb-4">
//           <button
//             onClick={() => router.push('/dashboard/sales/data')}
//             className="bg-gray-600 mt-4 sm:mt-0 text-white px-4 py-2 rounded-md hover:bg-gray-700"
//           >
//             Show Data
//           </button>
//         </div>
//       </div>
//       <ToastContainer />
//     </div>
//   );
// }
