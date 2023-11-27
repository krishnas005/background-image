"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  const [data, setData] = useState('nothing');

  const logout = async () => {
    try {
      await fetch('https://background-image.vercel.app/api/users/logout', {
        // http://localhost:3000/api/users/logout
        method: 'POST',
      });
      alert('Logout successful');
      router.push('/login');
    } catch (error) {
      console.log(error.message);
    }
  };

  const getUserDetails = async () => {
    try {
      // const response = await fetch('https://background-image.vercel.app/api/users/me');
      const response = await fetch('http://localhost:3000/api/users/me');
      if (!response.ok) {
        throw new Error('Failed to fetch user details');
      }
      const userData = await response.json();
      setData(userData.data._id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 min-h-screen py-2">
      <h1>Successfully logged in!!</h1>
      <hr />
      <p>Profile Page</p>
      <h2 className="p-1 rounded bg-green-500">
        {data === 'nothing' ? (
          'Nothing'
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <hr />
      <button
        onClick={logout}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Logout
      </button>
      <button
        onClick={getUserDetails}
        className="bg-green-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Get User Details
      </button>
    </div>
  );
}
