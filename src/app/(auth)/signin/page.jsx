'use client'

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from 'next/navigation'
import Link from "next/link";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignIn() {
  const [email, setEmail] = useState("ak@ak.com");
  const [password, setPassword] = useState("password");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res.ok) {
      router.push("/dashboard");
      console.log("User login success");
    } else {
      toast.error(res.error || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center mt-20">
      <div className="border max-w-md w-full py-20 px-10 rounded-xl shadow-md bg-white">
        <form onSubmit={handleSubmit}>
          <h1 className="text-center mb-10 text-xl font-bold">Sign In</h1>
          <div className="flex flex-col w-full gap-4">
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
            <button type="submit" className="w-full mt-2 text-white p-2 rounded-md bg-blue-500 hover:bg-blue-600 focus:ring-1 focus:ring-blue-300">Sign In</button>
            <p>Don't have account <Link href="/register" className="font-bold">Signup</Link></p>

          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
