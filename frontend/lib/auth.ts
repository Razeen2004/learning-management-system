import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

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
                        id: data.id,
                        name: data.name,
                        isVerified: data.isVerified,
                        email: data.email,
                        role: data.role
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

                    if (!res.ok) {
                        console.error("Error from backend:", data.error || "Unknown error");
                        return false; // Stop login if backend rejects
                    }

                    // Attach the user data to the JWT token
                    user.id = data.user.id;
                    user.role = data.user.role;
                    user.isVerified = data.user.isVerified;

                } catch (err) {
                    console.error("Error syncing Google user:", err);
                    return false; // Stop login if there is an error in fetching user data
                }
            }
            return true; // Allow the user to sign in if all goes well
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.isVerified = user?.isVerified;
                token.email = user.email;
                token.role = user?.role;
                token.image = user?.image;
            }
            return token;
        },
        async session({ session, token }) {
            session.user = {
                id: token.id,
                name: token.name,
                isVerified: token.isVerified,
                email: token.email,
                role: token.role,
                image: token.image,
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