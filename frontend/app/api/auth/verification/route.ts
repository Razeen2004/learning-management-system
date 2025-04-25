import '@/lib/ignoreSelfSignedCert';

import { NextResponse, NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { email, verificationCode } = await req.json();

        const res = await fetch(`${process.env.BACKEND_URL}/api/auth/verify`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, verificationCode }),
        });
        const data = await res.json();

        if (res.ok) {
            return NextResponse.json({ message: "Email verified successfully!" });
        } else {
            return NextResponse.json({ error: data?.error || "Verification failed" }, { status: 400 });
        }
    }
    catch (error) {
        console.error("Error in verification route:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}