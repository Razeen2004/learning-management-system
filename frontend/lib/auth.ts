process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

import { Session } from "next-auth";
import { NextAuthOptions, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

declare module "next-auth" {
    interface User {
        accessToken?: string;
        id: string;
        role?: string;
        isVerified?: string;
        name?: string | null;
        email?: string | null;
        image?: string | null;
    }
    interface Session {
        user?: User & {
            accessToken?: string;
        };
    }
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                try {
                    const res = await fetch(`${process.env.BACKEND_URL}/api/auth/login`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            email: credentials?.email,
                            password: credentials?.password,
                        }),
                    });

                    if (!res.ok) return null;

                    const data = await res.json();

                    return {
                        accessToken: data.token,
                        id: data.id,
                        name: data.name,
                        isVerified: data.isVerified,
                        email: data.email,
                        role: data.role,
                        image: data?.image,
                    };
                } catch (error) {
                    console.error("Error in authorize:", error);
                    return null;
                }
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
    ],
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider === "google") {
                try {
                    const res = await fetch(`${process.env.BACKEND_URL}/api/auth/google-login`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            email: user.email,
                            name: user.name,
                            image: user.image,
                        }),
                    });

                    const data = await res.json();
                    console.log("Google login response:", data);

                    if (!res.ok) {
                        console.error("Error from backend:", data.error || "Unknown error");
                        return false; // Stop login if backend rejects
                    }
                    
                    const u = data.user;

                    user.id = u.id;
                    user.name = u.name;
                    user.isVerified = u.isVerified;
                    user.email = u.email;
                    user.role = u.role;
                    user.image = u.image;
                    user.accessToken = u.token;

                } catch (err) {
                    console.error("Error syncing Google user:", err);
                    return false; // Stop login if there is an error in fetching user data
                }
            }
            return true; // Allow the user to sign in if all goes well
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user?.id;
                token.name = user?.name;
                token.isVerified = user?.isVerified;
                token.email = user?.email;
                token.role = user?.role;
                token.image = user?.image;
                token.accessToken = user?.accessToken;

            }
            return { ...token, ...user };
        },
        async session({ session, token }: { session: Session; token: JWT }) {
            session.user = {
                accessToken: token.accessToken as string,
                id: token.id as string,
                name: token.name,
                isVerified: token.isVerified as string | undefined,
                email: token.email,
                role: token.role as string | undefined,
                image: token.image as string | undefined,
            };
            return session;
        }
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/signin",
        signOut: '/',
    },
};