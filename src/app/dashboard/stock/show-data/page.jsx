"use client";

import useFetch from '@/hooks/useFetch';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useStock from '@/hooks/useStock';

export default function ShowStockData() {
  const [products, setProducts] = useState([]);
  const [lowStockAlerts, setLowStockAlerts] = useState([]);

  // const { fetchData, data: stocks, loading, error } = useFetch({ url: '/api/stock' });
  const {stock} = useStock();
  const {data:stocks, status, error} = stock
  

  const handleDelete = async (stockId) => {
    try {
      const confirmDelete = confirm('Are you sure you want to delete this stock?');
      if (!confirmDelete) return;
  
      const response = await fetch(`/api/stock`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: stockId }),
      });
  
      if (response.ok) {
        toast.success('Stock deleted successfully.');
      } else {
        const errorData = await response.json();
        toast.error(`Failed to delete stock: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error deleting stock:', error);
      alert(`Error deleting stock: ${error.message}`);
    }
  };

  const handleClearAll = () => {
    setProducts([]);
    localStorage.removeItem('products');
  };

  // useEffect(() => {
  //   fetchData();
  // }, [fetchData]);

  if (status === 'loading') return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // if (!stocks || stocks.length === 0) {
  //   return <p>No stock data available</p>;
  // }

  return (
    <div className="w-full ml-14 sm:ml-20 md:ml-28 lg:ml-12 mt-6 text-black h-[600px] overflow-hidden overflow-y-scroll scrollbar-hide">
      <h1 className="text-2xl font-bold mb-4">Stock Ledger</h1>

      {/* {lowStockAlerts.length > 0 && (
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
      )} */}

      <div className="max-h-screen overflow-y-auto lg:max-h-full lg:overflow-visible rounded">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2">Product Details</th>
              <th className="px-4 py-2">Warehouse</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
           <tbody>
            {stocks && stocks.map(stock => (
              <tr key={stock.id} className="border-b">
          
                <td className="border px-4 py-2">
                  {stock.items.map((item, index) => (
                    <div key={index} className="mb-2">
                      <p>
                        <strong>Product:</strong> {item.sku.productName}
                      </p>
                      <p>
                        <strong>Quantity:</strong> {item.stockQuantity}
                      </p>
                    </div>
                  ))}
                </td>
                <td className="border px-4 py-2">{stock.warehouseLocation}</td>
                <td className="border px-4 py-2">{stock.orderDescription}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleDelete(stock.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
}
