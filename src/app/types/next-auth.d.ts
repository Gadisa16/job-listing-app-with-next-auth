import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      accessToken: string; // Add accessToken to the user object
      profileStatus?: string; // Optionally add other fields like profileStatus
      // Add any other custom fields you might have
    };
  }

  interface User {
    accessToken: string; // Ensure User also includes accessToken if needed
    profileStatus?: string;
  }

  interface JWT {
    accessToken: string; // JWT should also include accessToken
    profileStatus?: string;
  }
}
