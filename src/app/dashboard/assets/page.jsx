'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AssetManagement() {
  const [formData, setFormData] = useState({
    name: '',
    purchaseCost: '',
    purchaseDate: '',
    usefulLife: '',
    assetType: '',
  });

  const [assets, setAssets] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

  const depreciationRates = {
    equipment: 10,
    vehicles: 15,
    furniture: 5,
    other: 8,
  };

  useEffect(() => {
    const storedAssets = JSON.parse(localStorage.getItem('assets')) || [];
    setAssets(storedAssets);
  }, []);

  const calculateDepreciation = (
    purchaseCost,
    usefulLife,
    assetType,
    purchaseDate
  ) => {
    const currentYear = new Date().getFullYear();
    const purchaseYear = new Date(purchaseDate).getFullYear();
    const yearsPassed = currentYear - purchaseYear;

    const depreciationRate =
      depreciationRates[assetType] || depreciationRates['other'];

    const totalDepreciation =
      purchaseCost * (depreciationRate / 100) * yearsPassed;

    const currentValue = purchaseCost - totalDepreciation;

    return currentValue > 0 ? currentValue : 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const purchaseCost = parseFloat(formData.purchaseCost);

    const currentValue = calculateDepreciation(
      purchaseCost,
      formData.usefulLife,
      formData.assetType,
      formData.purchaseDate
    );

    const newAssets = [...assets, { ...formData, purchaseCost, currentValue }];
    setAssets(newAssets);
    localStorage.setItem('assets', JSON.stringify(newAssets));

    setFormData({
      name: '',
      purchaseCost: '',
      purchaseDate: '',
      usefulLife: '',
      assetType: '',
    });

    setSuccessMessage('Asset added and depreciation calculated successfully.');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="w-full ml-12 sm:ml-24 md:ml-36 lg:ml-20 mt-6 text-black">
      <h1 className="text-2xl font-bold mb-4">Asset Management</h1>

      <form
        onSubmit={handleSubmit}
        className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <div>
          <label className="block text-sm font-medium">Asset Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md"
            placeholder="Enter asset name"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Purchase Cost</label>
          <input
            type="number"
            name="purchaseCost"
            value={formData.purchaseCost}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md"
            placeholder="Enter purchase cost"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Purchase Date</label>
          <input
            type="date"
            name="purchaseDate"
            value={formData.purchaseDate}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">
            Useful Life (years)
          </label>
          <input
            type="number"
            name="usefulLife"
            value={formData.usefulLife}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md"
            placeholder="Enter useful life in years"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Asset Type</label>
          <select
            name="assetType"
            value={formData.assetType}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md"
            required
          >
            <option value="">Select Asset Type</option>
            <option value="equipment">Equipment</option>
            <option value="vehicles">Vehicles</option>
            <option value="furniture">Furniture</option>
            <option value="other">Other</option>
          </select>
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
          onClick={() => router.push('/dashboard/assets/show-data')}
          className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
        >
          Show Data
        </button>
      </div>
    </div>
  );
}
