"use client";

import React, { useState } from 'react';
import { useVerifyEmailMutation } from '../service/getApi';
import { useRouter, useSearchParams } from 'next/navigation';
import Otp from "@/components/otp";

const page = () => {
  const router = useRouter()
  const params = useSearchParams()
  const email = params.get('email')

  const [verifyEmail, { data, isError, isLoading}] = useVerifyEmailMutation()
  const [val, setVal] = useState("")
  

  const handleSubmit = async () =>{
    const temp = val
    setVal("")

    try{
      const res  = await verifyEmail({"email": email, "otp": temp})
      const { data } = res

      localStorage.setItem("accessToken", data.data.accessToken)
      router.push(`/`)
    }catch (err){

    console.log(err)
      alert('sign up again')
      router.push(`/signup`)
    }
  }
  if (val.length > 0) {
    handleSubmit()
  }



  return (
    <div className='flex justify-center align-middle mt-36'>
        <div className='w-4/12 flex items-center flex-col space-y-10'>
          <h1 className='font-black text-4xl font-poppins text-[#25324B]'>Verify Email</h1>

          <p className='text-base epi text-[#7C8493]'>We've sent a verification code to the email address you provided. To complete the verification process, please enter the code here.</p>

          <Otp getOtp={setVal}/>
        </div>
    </div>
  )
}

export default page