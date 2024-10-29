// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import jobDataTypes from '../../components/types/job_types';
// // import { getSession } from "next-auth/react";
// // import { getServerSession } from 'next-auth';
// // import { headers } from 'next/headers';

// export const jobsApi = createApi({
//     reducerPath: "Jobs",
//     baseQuery: fetchBaseQuery({ 
//         baseUrl: "https://akil-backend.onrender.com/",
//         }),

//     endpoints: (builder) => ({

//         GetAllJobs: builder.query<{ data: jobDataTypes[] }, void>({
//             query: () => "/opportunities/search",
//         }),

//         getSingleJob: builder.query<{ data: jobDataTypes }, string>({
//             query: (id) => `/opportunities/${id}`,  // Use backticks for string interpolation
//         }),

//         signUp: builder.mutation<any, any>({
//             query: (data) => ({
//                 url: "/signup",
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: data,
//             }),
//         }),

//         signIn: builder.mutation<any, { email: string, password: string }>({
//             query: (data) => ({
//                 url: "/login",
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: data,
//             }),
//         }),

//         verifyEmail: builder.mutation<any, any>({
//             query: (data) => ({
//                 url: "/verify-email",
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: data,
//             }),
//         }),

//         // Bookmark a job
//         BookmarkJob: builder.mutation<any, {eventID: string, token:string}>({
//             query: ({eventID, token}) => ({
//                 url: `/bookmarks/${eventID}`,
//                 method: "POST",
//                 // headers: { "Content-Type": "application/json" },
//                 headers:{
//                     Authorization: `Bearer ${token}`
//                 },
//                 body: {}, // Empty body
//             }),
//         }),

//         //Unbookmark a job
//         UnbookmarkJob: builder.mutation<any, {eventID:string, token:string}>({
//             query: ({eventID, token}) => ({
//                 url: `/bookmarks/${eventID}`,
//                 method: "DELETE",
//                 // headers: { "Content-Type": "application/json" },
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             }),
//         }),

//         // Get all bookmarks
//         GetBookmarks: builder.query<any, void>({
//             query: () => "/bookmarks",
//         }),

//     }),
// });

// export const {
//     useGetAllJobsQuery,
//     useGetSingleJobQuery,
//     useSignUpMutation,
//     useSignInMutation,
//     useVerifyEmailMutation,
//     useBookmarkJobMutation,
//     useUnbookmarkJobMutation,
//     useGetBookmarksQuery,
// } = jobsApi;




import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import jobDataTypes from '../../components/types/job_types';
import { getSession } from "next-auth/react"; // Import getSession to fetch the token

export const jobsApi = createApi({
    reducerPath: "Jobs",
    baseQuery: fetchBaseQuery({ 
        baseUrl: "https://akil-backend.onrender.com/",
        // Function to add token to headers
        prepareHeaders: async (headers) => {
            const session = await getSession(); // Fetch the session from next-auth
            if (session?.user?.accessToken) {
                headers.set('Authorization', `Bearer ${session.user.accessToken}`); // Set the token in headers
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({

        // Get all jobs
        GetAllJobs: builder.query<{ data: jobDataTypes[] }, void>({
            query: () => "/opportunities/search",
        }),

        // Get a single job by ID
        getSingleJob: builder.query<{ data: jobDataTypes }, string>({
            query: (id) => `/opportunities/${id}`,
        }),

        // Sign-up mutation
        signUp: builder.mutation<any, any>({
            query: (data) => ({
                url: "/signup",
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: data,
            }),
        }),

        // Sign-in mutation
        signIn: builder.mutation<any, any>({
            query: (data) => ({
                url: "/login",
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: data,
            }),
        }),

        // Verify email mutation
        verifyEmail: builder.mutation<any, any>({
            query: (data) => ({
                url: "/verify-email",
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: data,
            }),
        }),

        // Bookmark a job
        BookmarkJob: builder.mutation<void, string>({
            query: (eventID) => ({
                url: `/bookmarks/${eventID}`,
                method: "POST",
                headers: { "Content-Type": "application/json" }, // Content-Type header
                body: {}, // Empty body
            }),
        }),

        // Unbookmark a job
        UnbookmarkJob: builder.mutation<void, string>({
            query: (eventID) => ({
                url: `/bookmarks/${eventID}`,
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            }),
        }),

        GetBookmarks: builder.query<any, void>({
            query: () => "/bookmarks",
        }),

    }),
});

export const {
    useGetAllJobsQuery,
    useGetSingleJobQuery,
    useSignUpMutation,
    useSignInMutation,
    useVerifyEmailMutation,
    useBookmarkJobMutation,
    useUnbookmarkJobMutation,
    useGetBookmarksQuery,
} = jobsApi;
