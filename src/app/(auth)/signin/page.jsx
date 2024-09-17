'use client'

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from 'next/navigation'
import Link from "next/link";

export default function SignIn() {
  const [email, setEmail] = useState("kk@kk.com");
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
      alert("Invalid email or password");
    }
  };

  return (
    <div className="flex justify-center items-center mt-32">
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
        <button type="submit" className="w-full mt-2 bg-black text-white p-2 rounded-md hover:bg-black/90">Sign In</button>
        <p>Don't have account <Link href="/register" className="font-bold">Signup</Link></p>

      </div>

      </form>
     </div>
    </div>
  );
}
