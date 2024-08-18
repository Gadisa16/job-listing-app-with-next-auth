import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import build from "next/dist/build";

export const jobsApi = createApi({
    reducerPath: "Jobs",
    baseQuery: fetchBaseQuery({ baseUrl: "https://akil-backend.onrender.com/"}),
    endpoints: (builder) => ({
        getAllJobs: builder.query({
            query: () => "/opportunities/search"
        }),
        getSingleJob: builder.query({
            query: (id) => `/opportunities/${id}`
        }),
        
        signUp: builder.mutation({
            query: (data) => ({
                url: `/signup`,
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: data
            })
        }),
        signIn: builder.mutation({
            query: (data) => ({
                url: `/login`,
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: data
            })
        }),
        verifyEmail: builder.mutation({
            query: (data) => ({
                url: `/verify-email`,
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: data
            })
        })
    })
})

export const { useGetAllJobsQuery, useGetSingleJobQuery, useSignUpMutation, useSignInMutation, useVerifyEmailMutation } = jobsApi