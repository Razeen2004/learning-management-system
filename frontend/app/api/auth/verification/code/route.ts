import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { email } = await req.json();
        const res = await fetch(`${process.env.BACKEND_URL}/api/auth/send-verify-code`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });
        const data = await res.json();

        if (res.ok) {
            return NextResponse.json({ message: "Verification code sent successfully!" });
        } else {
            return NextResponse.json({ error: data?.error || "Failed to send verification code" }, { status: 400 });
        }

    } catch (error) {
        console.error("Error in send verification code route:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}