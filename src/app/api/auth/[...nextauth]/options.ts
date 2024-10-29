import { NextAuthOptions } from 'next-auth';
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
    //providers or the things we use for authentication
    providers: [

        GoogleProvider({
        clientId: process.env.GOOGLE_ID as string,
        clientSecret: process.env.GOOGLE_Secret as string,
        }),


        CredentialsProvider({
            name: "Credentials",
            credentials: {
            email: { label: 'Email', type: 'text' },
            password: { label: 'Password', type: 'password' },
        },

        async authorize(credentials:any) {
            const response = await fetch('https://akil-backend.onrender.com/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
            }),
            });

            const data = await response.json();
            // console.log(data);

            if (data.success && data.data) {
            return {
                id: data.data.id,
                name: data.data.name,
                email: data.data.email,
                accessToken: data.data.accessToken,
                refreshToken: data.data.refreshToken,
                profileStatus: data.data.profileStatus,
            };
            }

            return null;
        },
        }),

    ],


    session: {
        strategy: 'jwt', // Use JWT for session (can also use 'database' if using a database)
        maxAge: 7 * 24 * 60 * 60, // Set session to expire after 24 hours (in seconds)
    },


    callbacks: {
        async jwt({ token, user }: { token: any, user: any }) {
        if (user) {
            token.accessToken = user.accessToken;
            token.profileStatus = user.profileStatus;
            // console.log("jwt callback:", token)
        }
        return token;
        },

        async session({ session, token }: { session: any, token: any }) {
            session.user.accessToken = token.accessToken;
            session.user.profileStatus = token.profileStatus;
            // console.log("session callback:", session)
            return session;
        },
    },


    pages: {
        signIn: '/login',
    },
};