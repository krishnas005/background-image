"use client";

import Link from 'next/link';
import React from 'react';
import {useRouter} from 'next/navigation';
import Navbar from '@/components/Navbar';

const LoginPage = () => {

  const [user,setUser] = React.useState({
    username: "",
    password: ""
  })

  const router = useRouter();

  const onSubmit  = async(e) => {
    e.preventDefault();
    if (!user.username || !user.password) {
      alert('All fields are required');
      return;
    }

    try {
        const res = await fetch('https://background-image.vercel.app/api/users/signup', {
          // http://localhost:3000/api/users/login
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (res.ok) {
        router.push('/');
      } else {
        const errorData = await res.json();
        throw new Error(`Failed to create a user: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Login failed', error.message);
      alert('Login failed. Please try again.');
    }
  };

  return (
    <>
    <div className="pb-14">
    <Navbar />
    </div>
    <div className="max-w-md mx-auto mt-14 pt-14 p-6 border rounded shadow-lg ">
      <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block mb-1">Username:</label>
          <input
            type="username"
            id="username"
            name="username"
            value={user.username}
            required
            className="border border-gray-300 p-2 w-full"
            onChange={(e) => setUser({...user,username:e.target.value})}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-1">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={user.password}
            required
            className="border border-gray-300 p-2 w-full"
            onChange={(e) => setUser({...user,password:e.target.value})}
          />
        </div>
        <div className='text-center'><button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Login</button></div>
      </form>
      <Link href={'/signup'}>SignUp</Link>
    </div>
    </>
  );
};

export default LoginPage;
