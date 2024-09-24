'use client'; // Client-side component

import { useEffect, useState } from 'react';

export default function Notification({ message, type }) {
  const [visible, setVisible] = useState(true);

  // Automatically hide the notification after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 5000);
    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`p-4 mb-4 text-white ${type === 'error' ? 'bg-red-500' : 'bg-green-500'} rounded-md`}
    >
      {message}
    </div>
  );
}
