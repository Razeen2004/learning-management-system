import '@/lib/ignoreSelfSignedCert';

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try{
        const { name, email, password } = await req.json();

        const res = await fetch(`${process.env.BACKEND_URL}/api/auth/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await res.json();

        if (res.ok) {
            return NextResponse.json({ message: "Account created successfully!" });
        } else {
            return NextResponse.json({ error: data?.error || "Registration failed" }, { status: 400 });
        }

    }catch(error){
        console.error("Error in signup route:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}