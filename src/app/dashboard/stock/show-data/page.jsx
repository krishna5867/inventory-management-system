"use client"; 

import { useState, useEffect } from 'react';

const needsReorder = (stockQuantity, reorderLevel) => {
  return stockQuantity <= reorderLevel;
};

export default function ShowStockData() {
  const [products, setProducts] = useState([]);
  const [lowStockAlerts, setLowStockAlerts] = useState([]);

  useEffect(() => {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      const parsedProducts = JSON.parse(storedProducts);
      setProducts(parsedProducts);

      const lowStockProducts = parsedProducts.filter(product => product.stockQuantity <= product.reorderLevel);
      setLowStockAlerts(lowStockProducts);
    }
  }, []);

  const handleDelete = (indexToDelete) => {
    const updatedProducts = products.filter((_, index) => index !== indexToDelete);
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts)); 
  };

  const handleClearAll = () => {
    setProducts([]);  
    localStorage.removeItem('products'); 
  };

  return (
    <div className="w-full ml-14 sm:ml-20 md:ml-28 lg:ml-12 mt-6 text-black h-[600px] overflow-hidden overflow-y-scroll scrollbar-hide">
      <h1 className="text-2xl font-bold mb-4">Stock Ledger</h1>

      {lowStockAlerts.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-red-600">Low Stock Alerts</h2>
          <ul>
            {lowStockAlerts.map((product, index) => (
              <li key={index} className="text-red-500">
                {product.productName} is running low with only {product.stockQuantity} units left (Reorder Level: {product.reorderLevel}).
              </li>
            ))}
          </ul>
        </div>
      )}

      {products.length > 0 && (
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
            <th className="px-4 py-2">Product Name</th>
            <th className="px-4 py-2">Stock Quantity</th>
            <th className="px-4 py-2">Reorder Level</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Reorder Status</th> 
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product, index) => {
              const reorderStatus = needsReorder(product.stockQuantity, product.reorderLevel)
                ? 'Reorder Needed'
                : 'Sufficient Stock';

              return (
                <tr key={index}>
                  <td className="border px-4 py-2">{product.productName}</td>
                  <td className="border px-4 py-2">{product.stockQuantity}</td>
                  <td className="border px-4 py-2">{product.reorderLevel}</td>
                  <td className="border px-4 py-2">${parseFloat(product.price).toFixed(2)}</td>
                  <td className={`border px-4 py-2 ${reorderStatus === 'Reorder Needed' ? 'text-red-600' : 'text-green-600'}`}>
                    {reorderStatus} 
                  </td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleDelete(index)} 
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="6" className="text-center p-4">No products available</td>
            </tr>
          )}
        </tbody>
      </table>
      </div>
    </div>
  );
}
