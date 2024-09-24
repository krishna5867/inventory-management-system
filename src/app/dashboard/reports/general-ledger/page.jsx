'use client';

import { useState, useEffect } from 'react';

export default function CashFlowStatement() {
  const [cashInflow, setCashInflow] = useState(0);
  const [cashOutflow, setCashOutflow] = useState(0);
  const [netCashFlow, setNetCashFlow] = useState(0);

  useEffect(() => {
    const storedTransactions =
      JSON.parse(localStorage.getItem('transactions')) || [];

    const totalInflow = storedTransactions
      .filter((transaction) => transaction.type === 'Inflow')
      .reduce((acc, transaction) => acc + parseFloat(transaction.amount), 0);

    const totalOutflow = storedTransactions
      .filter((transaction) => transaction.type === 'Outflow')
      .reduce((acc, transaction) => acc + parseFloat(transaction.amount), 0);

    setCashInflow(totalInflow);
    setCashOutflow(totalOutflow);
    setNetCashFlow(totalInflow - totalOutflow);
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-6 text-black">
      <h1 className="text-2xl font-bold mb-4">Cash Flow Statement</h1>

      <div className="mb-4">
        <p>
          <strong>Cash Inflow:</strong> ${cashInflow.toFixed(2)}
        </p>
        <p>
          <strong>Cash Outflow:</strong> ${cashOutflow.toFixed(2)}
        </p>
        <p>
          <strong>Net Cash Flow:</strong> ${netCashFlow.toFixed(2)}
        </p>
      </div>
    </div>
  );
}
