'use client';

import { useState, useEffect } from 'react';

export default function BalanceSheet() {
  const [assets, setAssets] = useState(0);
  const [liabilities, setLiabilities] = useState(0);
  const [equity, setEquity] = useState(0);

  useEffect(() => {
    const storedTransactions =
      JSON.parse(localStorage.getItem('transactions')) || [];

    const totalAssets = storedTransactions
      .filter((transaction) => transaction.category === 'Asset')
      .reduce((acc, transaction) => acc + parseFloat(transaction.amount), 0);

    const totalLiabilities = storedTransactions
      .filter((transaction) => transaction.category === 'Liability')
      .reduce((acc, transaction) => acc + parseFloat(transaction.amount), 0);

    setAssets(totalAssets);
    setLiabilities(totalLiabilities);
    setEquity(totalAssets - totalLiabilities);
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-6 text-black">
      <h1 className="text-2xl font-bold mb-4">Balance Sheet</h1>

      <div className="mb-4">
        <p>
          <strong>Total Assets:</strong> ${assets.toFixed(2)}
        </p>
        <p>
          <strong>Total Liabilities:</strong> ${liabilities.toFixed(2)}
        </p>
        <p>
          <strong>Total Equity:</strong> ${equity.toFixed(2)}
        </p>
      </div>
    </div>
  );
}
