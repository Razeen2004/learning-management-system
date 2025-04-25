import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    const { email } = await req.json();

    try{
        const res = await fetch(`${process.env.BACKEND_URL}/api/auth/forgot-password`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        })
        const data = await res.json();

        if(res.ok) {
            return NextResponse.json({ message: "Recovery email sent successfully!" });
        }else{
            return NextResponse.json({ error: data?.error || "Failed to send recovery email" }, { status: 400 });
        }

    }catch (error) {
        console.error("Error in forgot password route:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}