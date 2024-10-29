"use client";
import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {signIn, useSession } from 'next-auth/react';


type SigninFormType = {
    email: string
    password: string,
}

const SignIn = () => {
    const { data:session, status} = useSession();
    const form = useForm<SigninFormType>();
    const { register, handleSubmit, formState} = form;
    const { errors } = formState;
    const [isLoading, setLoading] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>('');
    const router = useRouter();
    
    const token: any = session?.user?.accessToken
    // console.log(token)
    if (token) {
        router.push("/")
        return
    }

    const onSubmit = async (data: SigninFormType) => {
        setLoading(true)
        const result = await signIn("credentials", {
            redirect: false,
            email: data.email,
            password: data.password,
        });
        console.log(result)
        if (result?.ok) {
            sessionStorage.setItem('accessToken', token);
            router.push("/");
        } else if(result?.status == 401) {
            setErrorMessage("Invalid email or password");
        }
        else{
            setErrorMessage("Something went wrong, please try again");
        }
        setLoading(false)
    };

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
        {isLoading ? "wait..." : "Login"}
    </button>
    <h2 className='text-base epi'>
        Don't have an account? <Link href={`/signup`}><span className='font-semibold ml-1 text-base text-blue-900'>Sign Up</span></Link>
    </h2>
    </form>
</div>
);
}

export default SignIn
