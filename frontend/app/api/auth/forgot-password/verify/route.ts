import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const { email, password, verificationCode } = await req.json();
        const response = await fetch(`${process.env.BACKEND_URL}/api/auth/reset-password`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password, verificationCode }),
        });

        const data = await response.json();
        if (response.ok) {
            return NextResponse.json({ message: "Password reset successfully!" });
        }
        return NextResponse.json({ error: data?.error || "Failed to reset password" }, { status: 400 });

    } catch (error) {
        console.error("Error in forgot password route:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}