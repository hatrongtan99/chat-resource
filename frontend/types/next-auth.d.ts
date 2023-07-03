import { UserWithAuth } from "@/types/User";
import NextAuth from "next-auth/next";

declare module "next-auth" {
    interface Session {
        user: UserWithAuth;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        user: {
            accessToken: string;
            refreshToken: string;
            accessTokenExpires: number;
            user: UserWithAuth;
        };
    }
}
