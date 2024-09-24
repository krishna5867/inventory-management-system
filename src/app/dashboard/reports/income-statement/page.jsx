'use client';

import { useState, useEffect } from 'react';

export default function IncomeStatement() {
  const [revenue, setRevenue] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [profit, setProfit] = useState(0);

  useEffect(() => {
    const storedTransactions =
      JSON.parse(localStorage.getItem('transactions')) || [];

    const totalRevenue = storedTransactions
      .filter((transaction) => transaction.category === 'Revenue')
      .reduce((acc, transaction) => acc + parseFloat(transaction.amount), 0);

    const totalExpenses = storedTransactions
      .filter((transaction) => transaction.category === 'Expense')
      .reduce((acc, transaction) => acc + parseFloat(transaction.amount), 0);

    setRevenue(totalRevenue);
    setExpenses(totalExpenses);
    setProfit(totalRevenue - totalExpenses);
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-6 text-black">
      <h1 className="text-2xl font-bold mb-4">Income Statement</h1>

      <div className="mb-4">
        <p>
          <strong>Total Revenue:</strong> ${revenue.toFixed(2)}
        </p>
        <p>
          <strong>Total Expenses:</strong> ${expenses.toFixed(2)}
        </p>
        <p>
          <strong>Net Profit:</strong> ${profit.toFixed(2)}
        </p>
      </div>
    </div>
  );
}
