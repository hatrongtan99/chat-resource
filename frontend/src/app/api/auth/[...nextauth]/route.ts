import { CreateNewUserByProvider, ProviderType } from "@/types/User";
import jwt from "jsonwebtoken";
import { NextAuthOptions, User } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import { BASE_URL } from "@/utils/constant";

const secret = process.env.NEXTAUTH_SECRET;

const secretAccessToken = process.env.SECRET_JWT_ASCCESS_TOKEN;

export const nextAuthOptions: NextAuthOptions = {
    secret,
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: {
                    label: "email",
                    type: "text",
                },
                password: {
                    label: "password",
                    type: "password",
                },
            },
            async authorize(credentials) {
                const res = await fetch(`${BASE_URL}/api/auth/signin`, {
                    method: "POST",
                    body: JSON.stringify({
                        email: credentials?.email,
                        password: credentials?.password,
                    }),
                    headers: {
                        "Content-type": "application/json",
                    },
                });
                const user = await res.json();

                if (res.ok && user) {
                    return user;
                }
                return null;
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async jwt({ token, user, profile, account, session }) {
            try {
                if (profile) {
                    if (account?.provider == "google") {
                        const { sub, email, name } = profile;

                        const res = await fetch(
                            `${BASE_URL}/api/users/provider?email=${email}&providerId=${sub}`
                        );

                        if (res.ok) {
                            const exitsUser = await res.json();
                            if (exitsUser) {
                                const user = await loginSuccess(exitsUser.id);
                                token.user = user as any;
                            }
                        } else {
                            const params = {
                                fullname: name,
                                email,
                                provider_id: sub,
                                provider: ProviderType.GOOGLE,
                            } as CreateNewUserByProvider;
                            const res = await fetch(
                                `${BASE_URL}/api/auth/create`,
                                {
                                    method: "POST",
                                    headers: {
                                        "Content-type": "application/json",
                                    },
                                    body: JSON.stringify(params),
                                }
                            );
                            if (res.ok) {
                                const newUser = await res.json();
                                if (newUser) {
                                    const user = await loginSuccess(newUser.id);
                                    if (user) {
                                        token.user = user as any;
                                    }
                                }
                            }
                        }
                    }
                } else {
                    if (user) {
                        token.user = user as any;
                    }
                }
                if (Date.now() < token.user.accessTokenExpires) {
                    console.log("old token");
                }
                if (Date.now() < token.user.accessTokenExpires) return token;
                if (token?.user.refreshToken) {
                    console.log("get new");
                    const newToken = (await refreshToken(
                        token.user.refreshToken
                    )) as {
                        accessToken: string;
                        accessTokenExpires: number;
                    };
                    token.user.accessToken = newToken.accessToken;
                    token.user.accessTokenExpires = newToken.accessTokenExpires;
                }
                return token;
            } catch (error) {
                return Promise.reject(error);
            }
        },
        session({ session, token }) {
            session.user = token.user as any;
            return session;
        },
        redirect() {
            return "/conversations";
        },
    },
};

const handle = NextAuth(nextAuthOptions);

export { handle as GET, handle as POST };

const loginSuccess = async (id: number) => {
    const newToken = jwt.sign({ id }, secretAccessToken!);
    return new Promise((resolve, rejects) => {
        fetch(`${BASE_URL}/api/auth/success`, {
            headers: {
                Authorization: `Bearer ${newToken}`,
            },
        })
            .then((data) => {
                if (data.ok) {
                    return resolve(data.json());
                }
                return rejects(data);
            })
            .catch((error) => console.log(error));
    });
};

const refreshToken = (rfToken: any) => {
    return new Promise((resolve, rejects) => {
        fetch(`${BASE_URL}/api/auth/refresh-token`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                refreshToken: `Bearer ${rfToken}`,
            }),
        })
            .then((res) => {
                if (res.ok) {
                    return resolve(res.json());
                }
                return rejects(res);
            })
            .catch((error) => console.log(error));
    });
};
