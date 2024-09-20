"use client"; 

import { useState, useEffect } from 'react';
import jsPDF from 'jspdf';  

export default function ShowPurchaseData() {
  const [purchases, setPurchases] = useState([]);
  const [filteredPurchases, setFilteredPurchases] = useState([]); 
  const [filterSupplier, setFilterSupplier] = useState('');  
  const [filterDate, setFilterDate] = useState('');  

  useEffect(() => {
    const storedPurchases = localStorage.getItem('purchases');
    if (storedPurchases) {
      const purchaseData = JSON.parse(storedPurchases);
      setPurchases(purchaseData);
      setFilteredPurchases(purchaseData);  
    }
  }, []);

  const handleDelete = (indexToDelete) => {
    const updatedPurchases = purchases.filter((_, index) => index !== indexToDelete);
    setPurchases(updatedPurchases);
    setFilteredPurchases(updatedPurchases);  
    localStorage.setItem('purchases', JSON.stringify(updatedPurchases)); 
  };

  const handleClearAll = () => {
    setPurchases([]);  
    setFilteredPurchases([]); 
    localStorage.removeItem('purchases');  
  };

  const generateInvoice = (purchase) => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Purchase Invoice', 105, 20, null, null, 'center');

    doc.setFontSize(12);
    doc.text(`Supplier: ${purchase.supplier}`, 20, 40);
    doc.text(`Product: ${purchase.product}`, 20, 50);
    doc.text(`Purchase Cost: $${purchase.purchaseCost}`, 20, 60);
    doc.text(`Quantity: ${purchase.quantity}`, 20, 70);
    doc.text(`Tax: ${purchase.tax}%`, 20, 80);
    doc.text(`Total Cost: $${purchase.totalCost}`, 20, 90);
    doc.text(`Payment Status: ${purchase.paymentStatus}`, 20, 100);
    doc.text(`Date: ${purchase.date}`, 20, 110);

    doc.save(`invoice_${purchase.supplier}_${purchase.date}.pdf`);
  };

  const handleFilter = () => {
    const filtered = purchases.filter(purchase => {
      const isSupplierMatch = filterSupplier ? purchase.supplier.toLowerCase().includes(filterSupplier.toLowerCase()) : true;
      const isDateMatch = filterDate ? purchase.date === filterDate : true;
      return isSupplierMatch && isDateMatch;
    });
    setFilteredPurchases(filtered);
  };

  return (
    <div className="w-full ml-14 sm:ml-20 md:ml-28 lg:ml-12 mt-6 text-black h-[600px] overflow-hidden overflow-y-scroll scrollbar-hide">
      <h1 className="text-2xl font-bold mb-4">All Purchase Orders</h1>

      <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Filter by Supplier</label>
          <input
            type="text"
            value={filterSupplier}
            onChange={(e) => setFilterSupplier(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md"
            placeholder="Enter supplier name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Filter by Date</label>
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md"
          />
        </div>
      </div>

      <div className="mb-4">
        <button
          onClick={handleFilter}
          className=" text-white px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-300"
        >
          Filter
        </button>
      </div>

      {filteredPurchases.length > 0 && (
        <div className="flex justify-end mb-4">
          <button
            onClick={handleClearAll}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Clear All
          </button>
        </div>
      )}

      <div className="max-h-screen overflow-y-auto lg:max-h-full lg:overflow-visible rounded">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-4 py-2">Supplier</th>
            <th className="px-4 py-2">Product</th>
            <th className="px-4 py-2">Quantity</th> 
            <th className="px-4 py-2">Purchase Cost</th>
            <th className="px-4 py-2">Tax</th>
            <th className="px-4 py-2">Total Cost</th>
            <th className="px-4 py-2">Payment Status</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredPurchases.length > 0 ? (
            filteredPurchases.map((purchase, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{purchase.supplier}</td>
                <td className="border px-4 py-2">{purchase.product}</td>
                <td className="border px-4 py-2">{purchase.quantity}</td> 
                <td className="border px-4 py-2">${parseFloat(purchase.purchaseCost).toFixed(2)}</td>
                <td className="border px-4 py-2">{purchase.tax}%</td>
                <td className="border px-4 py-2">${purchase.totalCost}</td>
                <td className="border px-4 py-2">{purchase.paymentStatus}</td>
                <td className="border px-4 py-2">{purchase.date}</td>
                <td className="border px-4 py-2">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleDelete(index)}  
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => generateInvoice(purchase)}  
                      className="text-white px-2 py-1 rounded bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-300"
                    >
                      Generate Invoice
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="text-center p-4">No purchase data available</td>
            </tr>
          )}
        </tbody>
      </table>
      </div>
    </div>
  );
}
