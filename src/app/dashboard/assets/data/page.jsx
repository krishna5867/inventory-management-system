'use client';

import { useState, useEffect } from 'react';

const determineAssetStatus = (usefulLife, purchaseDate) => {
  const currentYear = new Date().getFullYear();
  const purchaseYear = new Date(purchaseDate).getFullYear();
  const yearsPassed = currentYear - purchaseYear;

  return yearsPassed >= usefulLife ? 'Expired' : 'Active';
};

export default function AssetLedger() {
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    const storedAssets = localStorage.getItem('assets');
    if (storedAssets) {
      setAssets(JSON.parse(storedAssets));
    }
  }, []);

  const handleDelete = (indexToDelete) => {
    const updatedAssets = assets.filter((_, index) => index !== indexToDelete);
    setAssets(updatedAssets);
    localStorage.setItem('assets', JSON.stringify(updatedAssets));
  };

  const handleClearAll = () => {
    setAssets([]);
    localStorage.removeItem('assets');
  };

  return (
    <div className="w-full ml-14 sm:ml-20 md:ml-28 lg:ml-12 mt-6 text-black h-[600px] overflow-hidden overflow-y-scroll scrollbar-hide">
      <h1 className="text-2xl font-bold mb-4">Asset Ledger</h1>

      {assets.length > 0 && (
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
              <th className="px-4 py-2">Asset Name</th>
              <th className="px-4 py-2">Asset Type</th>
              <th className="px-4 py-2">Purchase Cost</th>
              <th className="px-4 py-2">Useful Life (years)</th>
              <th className="px-4 py-2">Depreciation Rate (%)</th>
              <th className="px-4 py-2">Current Value</th>
              <th className="px-4 py-2">Purchase Date</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {assets.length > 0 ? (
              assets.map((asset, index) => {
                const status = determineAssetStatus(
                  asset.usefulLife,
                  asset.purchaseDate
                );

                return (
                  <tr key={index}>
                    <td className="border px-4 py-2">{asset.name}</td>
                    <td className="border px-4 py-2">{asset.assetType}</td>
                    <td className="border px-4 py-2">
                      ${parseFloat(asset.purchaseCost).toFixed(2)}
                    </td>
                    <td className="border px-4 py-2">
                      {asset.usefulLife} years
                    </td>
                    <td className="border px-4 py-2">
                      {asset.depreciationRate}%
                    </td>
                    <td className="border px-4 py-2">
                      ${parseFloat(asset.currentValue).toFixed(2)}
                    </td>
                    <td className="border px-4 py-2">{asset.purchaseDate}</td>
                    <td
                      className={`border px-4 py-2 ${status === 'Expired' ? 'text-red-600' : 'text-green-600'}`}
                    >
                      {status}
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
                <td colSpan="9" className="text-center p-4">
                  No asset data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
