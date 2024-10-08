'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('accountant'); // default role
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name, role }),
    });

    if (res.ok) {
      const resData = await res.json();
      toast.success(resData.message);
      setName('');
      setEmail('');
      setPassword('');
      setRole('accountant');
      // router.push("/signin");
    } else {
      const errorData = await res.json();
      toast.error(errorData.message);
    }
  };

  return (
    <div className="flex justify-center items-center mt-10">
      <div className="border max-w-md w-full py-20 px-10 rounded-xl shadow-md bg-white">
        <form onSubmit={handleSubmit}>
          <h1 className="text-center mb-10 text-xl font-bold">Register</h1>
          <div className="flex flex-col w-full gap-4">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-black p-2 w-full rounded-sm"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-black p-2 w-full rounded-sm"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-black p-2 w-full rounded-sm"
              required
            />
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="border border-black px-2 py-2 rounded-sm"
            >
              <option value="admin">Admin</option>
              <option value="accountant">Accountant</option>
            </select>
            <button
              type="submit"
              className="w-full mt-2  text-white p-2 rounded-md bg-blue-500 hover:bg-blue-600 focus:ring-1 focus:ring-blue-300"
            >
              Sign Up
            </button>
            <p>
              Already have an account{' '}
              <Link href="/signin" className="font-bold">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
