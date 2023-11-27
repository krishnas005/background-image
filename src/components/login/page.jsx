"use client";

import Link from 'next/link';
import React from 'react';
import {useRouter} from 'next/navigation';
import Navbar from '@/components/Navbar';
import { UserAuth } from '@/context/AuthContext'

const LoginPage = () => {

  const {user,googleSignIn, logout} = UserAuth();

  const [users,setUser] = React.useState({
    username: "",
    password: ""
  })

  const router = useRouter();

  const onSubmit  = async(e) => {
    e.preventDefault();
    if (!users.username || !users.password) {
      alert('All fields are required');
      return;
    }

    try {
        // const res = await fetch('https://background-image.vercel.app/api/users/login', {
        const res = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (res.ok) {
        // localStorage.setItem('token',res.token);
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
    {!user ? (<div className='pt-8'>
    <div className = "max-w-md mx-auto mt-14 p-6 border rounded shadow-lg bg-gray-100 ">
      <h1 className="text-2xl font-bold mb-4 text-center text-blue-800">Login</h1>
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block mb-1">Username:</label>
          <input
            type="username"
            id="username"
            name="username"
            value={users.username}
            required
            className="border border-gray-300 p-2 w-full"
            onChange={(e) => setUser({...users,username:e.target.value})}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-1">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={users.password}
            required
            className="border border-gray-300 p-2 w-full"
            onChange={(e) => setUser({...users,password:e.target.value})}
          />
        </div>
        <div className='text-center'><button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Login</button></div>
      </form>
      <div className='text-center mt-4'><span>Don&apos;t have an account?</span><Link className='text-blue-600' href={'/signup'}> Create an account</Link></div>
    </div>
    </div>) : (<div className='flex justify-center mt-44 text-4xl text-blue-600 text-semibold'>You are already logged in!</div>)}
    </>
  );
};

export default LoginPage;