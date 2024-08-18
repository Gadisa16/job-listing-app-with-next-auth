"use client";
import { useGetAllJobsQuery } from "@/app/service/getApi";
import { signOut } from "next-auth/react";

function Top() {
    const { data, error, isLoading } = useGetAllJobsQuery(); // Use RTK Query hook

    return (
        // left-part
        <div className='w-[97%] md:w-[80%] mx-auto mb-[70px] mt-8 flex justify-between'>
            <div className="w-[236px] h-[38px]">
                <p className="font-poppins text-[5vw] md:text-4xl font-extrabold leading-[38.4px] text-left text-customBlue">Opportunities</p>
                <p className="text-customGray font-epilogue text-base font-normal leading-[25.6px] text-left mt-2">showing {data?.data.length} results</p>
            </div>

            {/* middle-part || sort-by */}
            <div className="">
                <span className="text-customGray font-epilogue text-base font-extralight leading-[20.6px] text-right">Sort by:</span>
                <select className='font-epilogue text-[vw] md:text-base font-medium leading-[25.6px]'>
                    <option>Most relevant</option>
                    <option>Newest</option>
                    <option>Oldest</option>
                </select>
            </div>

            {/* right-part || sign-out */}
            <div className="">
                <button
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                >
                    Sign Out
                </button>
            </div>

        </div>
    );
}

export default Top;
