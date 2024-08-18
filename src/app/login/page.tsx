"use client";
import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { FadeLoader } from 'react-spinners';


type SigninFormType = {
    email: string
    password: string,
}

const SignIn = () => {
    const session = useSession();
    const { register, handleSubmit, formState:{errors}} = useForm<SigninFormType>();

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();

    if (session.data){
        router.push('/');
    }

    const onSubmit = async (data: SigninFormType) => {
        setLoading(true);
        setErrorMessage('');

        try {
            const response = await fetch('https://akil-backend.onrender.com/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json(); // Parse the JSON response

            if (response.ok && result.success) {
                await router.push(`/`); // Await the push to ensure it completes
                return null;
            } else {
                setErrorMessage(result.message || "Invalid credentials!");
            }
            } catch (error) {
                setErrorMessage("An error occurred. Please try again later.");
            } finally {
                setLoading(false);
            }
    };

    if (loading) {
        return  (<FadeLoader
        color="#26A4FF"
        cssOverride={{margin:"13% auto"}}
        />)
    }


return (
<div className='flex justify-end'>
    <form onSubmit={handleSubmit(onSubmit)} className='px-6 space-y-5 w-4/12 mr-44 mt-36'>
    <div className='flex justify-center w-full'>
        <h1 className='text-[#202430] font-poppins text-4xl font-black'>Welcome Back,</h1>
    </div>
    <hr />

    <div className='space-y-4'>
        {errorMessage && setTimeout(() => setErrorMessage(""), 4000) && <p className='text-[red] text-xs font-normal'>{errorMessage}</p>}
        <div className='flex space-y-2 flex-col'>
        <label className='text-[#515B6F] ml-1 epi text-sm font-semibold' htmlFor="email">Email Address</label>
        <input
            className='bg-white rounded-lg border p-3'
            type="email"
            placeholder='Enter email address'
            {...register("email", { required: "Email is required" })}
        />
        {errors.email && <p className='text-red-500 text-sm'>{errors.email.message}</p>}
        </div>

        <div className='flex space-y-2 flex-col'>
        <label className='text-[#515B6F] ml-1 epi text-sm font-semibold' htmlFor="password">Password</label>
        <input
            className='bg-white rounded-lg border p-3'
            type="password"
            placeholder='Enter password'
            {...register("password", { required: "Password is required" })}
        />
        {errors.password && <p className='text-red-500 text-sm'>{errors.password.message}</p>}
        </div>
    </div>

    <button type='submit' className='w-full py-4 text-white epi rounded-full bg-indigo-900'>
        Login
    </button>
    <h2 className='text-base epi'>
        Don't have an account? <Link href={`/signup`}><span className='font-semibold ml-1 text-base text-blue-900'>Sign Up</span></Link>
    </h2>
    </form>
</div>
);
}

export default SignIn


