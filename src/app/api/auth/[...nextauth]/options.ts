import GoogleProvider from "next-auth/providers/google";

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    throw new Error("Missing Google OAuth environment variables");
}

export const options = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],

    callbacks: {
    async jwt({ token, user }: { token: any, user: any }) {
        if (user) {
            token.accessToken = user.accessToken;
            token.profileStatus = user.profileStatus;
        }
        return token;
    },
    async session({ session, token }: { session: any, token: any }) {
        session.user.accessToken = token.accessToken;
        session.user.profileStatus = token.profileStatus;
        return session;
    },
    },
}