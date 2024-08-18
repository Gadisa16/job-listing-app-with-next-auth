import React, { useState } from 'react'
interface Props {
    getOtp: (text: string) => void
}


const Otp = ({getOtp}: Props) => {
    const [otp, setOtp] = useState(new Array(4).fill(""))

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
        const current_val = e.target.value
        setOtp([...otp.map((data, ind) => (
            ind === i ?  current_val : data
        ))])
        // if next field exist move focus or cursor
        if (e.target.nextSibling !== null){
            if (current_val !== null){
            const next = e.target.nextSibling as HTMLElement
            
            next?.focus()
        }}
    }

    const handleSubmit = () => {
        let res = ""
        otp.map((data, i) => (res = res + data))
        console.log(res)
        getOtp(res)

    }


return (
    <div className='mt-40 '>
        <div className='flex space-x-8'>
            {otp.map((data, ind) => (
            <input key={ind} type="text" placeholder='0' value={data} maxLength={1} onChange={(e) => handleChange(e, ind)} className='border-2 border-[#4640DE] bg-[#ddddff] rounded-lg px-8 mr-6 w-20 h-14' />
        ))}
        </div>

        <div className='mx-auto text-center w-1/2'>
            <p className='text-base epi mt-14'>You can request to <span className='text-purple-600'>resend </span>code in <span className='text-purple-600'>0:30</span></p>
        </div>
            <button onClick={handleSubmit} className='w-full epi text-lg text-white mt-10 py-3 rounded-full bg-[#c7c5fd] hover:bg-[#7a77da]' >continue</button>

    </div>
)
}

export default Otp