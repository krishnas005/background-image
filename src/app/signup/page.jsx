"use client";

import React, {useEffect} from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Navbar from '@/components/Navbar';

const SignupPage = () => {
    const router = useRouter();
    const [user,setUser] = React.useState({
        email: "",
        username: "",
        password: ""
    })

    const [ButtonDisabled,setButtonDisabled] = React.useState(false);
    const [loading,setloading] = React.useState(false);

    const onSignup = async (e) => {
        e.preventDefault();
        try {
            setloading(true);
            // const response = await axios.post('/api/users/signup',user);
            const res = await fetch('http://localhost:3000/api/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });
            if (res.ok) {
                router.push('/login');
                } else {
                const errorData = await res.json();
                throw new Error(`Failed to create a user: ${errorData.error}`);
                }
            
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        } finally {
            setloading(false)
        }
    };

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    },[user]);

    return (
    <>
    <div className='pb-14'>
        <Navbar/>
    </div>
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">{loading ? 'Loading' : 'SignUp'}</h1>
        <form onSubmit={onSignup}>
        <div className="mb-4">
            <label htmlFor="email" className="block mb-1">Email:</label>
            <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            required
            className="border border-gray-300 p-2 w-full"
            onChange={(e) => setUser({...user,email:e.target.value})}
            />
        </div>
        <div className="mb-4">
            <label htmlFor="username" className="block mb-1">Username:</label>
            <input
            type="text"
            id="username"
            name="username"
            required
            value={user.username}
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
            required
            value={user.password}
            className="border border-gray-300 p-2 w-full"
            onChange={(e) => setUser({...user,password:e.target.value})}
            />
        </div>
        <div className='text-center'>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">{ButtonDisabled ? "You can't SignUp" : "Signup"}</button>
        </div>
        <Link href={'/login'}>Login</Link>
        </form>
    </div>
    </>
    );
};

export default SignupPage;
