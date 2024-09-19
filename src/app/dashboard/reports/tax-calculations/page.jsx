"use client"; 

import { useState, useEffect } from 'react';

const GST_RATE = 0.10; 

export default function TaxCalculations() {
  const [totalTax, setTotalTax] = useState(0);

  useEffect(() => {
    const storedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];

    const taxAmount = storedTransactions
      .filter((transaction) => transaction.category === 'Revenue')
      .reduce((acc, transaction) => acc + (parseFloat(transaction.amount) * GST_RATE), 0);

    setTotalTax(taxAmount);
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-6 text-black">
      <h1 className="text-2xl font-bold mb-4">Tax Calculations (GST/VAT)</h1>

      <div className="mb-4">
        <p><strong>Total GST/VAT Collected on Sales:</strong> ${totalTax.toFixed(2)}</p>
      </div>
    </div>
  );
}
