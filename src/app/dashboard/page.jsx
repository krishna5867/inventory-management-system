"use client";  

import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,  
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import Notification from '../../components/Notification';  

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const [notifications, setNotifications] = useState([]);  

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];

    const unpaidInvoices = [
      { customer: 'John Doe', dueDate: '2023-09-15', amount: 200 },
      { customer: 'Jane Smith', dueDate: '2023-09-10', amount: 500 },
    ];

    const lowStockProducts = [
      { productName: 'Laptop', stockQuantity: 3, reorderLevel: 5 },
      { productName: 'Phone', stockQuantity: 2, reorderLevel: 10 },
    ];

    const assetUpdates = [
      { assetName: 'Office Equipment', status: 'Needs Maintenance' },
    ];

    const paymentReminders = unpaidInvoices
      .filter(invoice => new Date(invoice.dueDate) < new Date(today))
      .map(invoice => `Payment reminder: ${invoice.customer} owes $${invoice.amount} (due ${invoice.dueDate})`);

    const stockAlerts = lowStockProducts
      .filter(product => product.stockQuantity <= product.reorderLevel)
      .map(product => `Low stock alert: ${product.productName} has only ${product.stockQuantity} units left (reorder level: ${product.reorderLevel})`);

    const assetAlerts = assetUpdates.map(asset => `Asset update: ${asset.assetName} - ${asset.status}`);

    const allNotifications = [...paymentReminders, ...stockAlerts, ...assetAlerts];
    setNotifications(allNotifications);
  }, []);

  const data = {
    labels: ['Sales', 'Purchases', 'Stock', 'Assets', 'Balance'],
    datasets: [
      {
        label: 'Overview',
        data: [12345, 8765, 5000, 15000, 50000],
        backgroundColor: ['rgba(255,99,132,0.2)', 'rgba(54,162,235,0.2)', 'rgba(255,206,86,0.2)', 'rgba(75,192,192,0.2)'],
      },
    ],
  };

return (
  <div className="w-full ml-10 sm:ml-24 lg:ml-12 xl:ml-0 h-[610px] overflow-hidden overflow-y-scroll scrollbar-hide">
    <div className="max-w-5xl mx-auto text-black mt-5 h-full ">
    
      {notifications.length > 0 && (
        <div className="mb-6">
          {notifications.map((message, index) => (
            <Notification key={index} message={message} type="error" />
          ))}
        </div>
      )}

      <div>
        <h1 className="text-2xl font-bold mb-4">Welcome, </h1>
      </div>

      <div>
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="bg-white shadow-md p-4 rounded-md">
            <h2 className="text-xl font-semibold">Total Sales</h2>
            <p className="text-4xl font-bold mt-2">₹12,345</p>
          </div>
          <div className="bg-white shadow-md p-4 rounded-md">
            <h2 className="text-xl font-semibold">Total Purchases</h2>
            <p className="text-4xl font-bold mt-2">₹8,765</p>
          </div>
          <div className="bg-white shadow-md p-4 rounded-md">
            <h2 className="text-xl font-semibold">Available Stocks</h2>
            <p className="text-4xl font-bold mt-2">5 Items</p>
          </div>
          <div className="bg-white shadow-md p-4 rounded-md">
            <h2 className="text-xl font-semibold">Total Assets</h2>
            <p className="text-4xl font-bold mt-2">50 Items</p>
          </div>
          <div className="bg-white shadow-md p-4 rounded-md">
            <h2 className="text-xl font-semibold">Account Balance</h2>
            <p className="text-4xl font-bold mt-2">₹50,000</p>
          </div>
        </div>
      </div>

      <div className="mt-20 w-11/12 xl:w-full">
        <h1 className="text-2xl font-bold mb-6">Overview Chart</h1>
        <Bar data={data} />
      </div>
    </div>
  </div>
);
}