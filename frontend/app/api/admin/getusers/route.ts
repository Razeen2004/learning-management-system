process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

import { getServerSession } from 'next-auth';
import { NextResponse, NextRequest } from 'next/server';

// route.ts (API route in app/api/admin/getusers)

export async function POST(req: NextRequest) {
    try {
        const { user } = await req.json();
        // Get token from incoming request
        const token = req.headers.get("authorization");

        const res = await fetch(`${process.env.BACKEND_URL}/api/admin/get/allusers`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: token || "",
            },
            body: JSON.stringify({ user }),
        });

        const data = await res.json();

        if (res.ok) {
            // ✅ Return the users to frontend
            return NextResponse.json(data);
        } else {
            return NextResponse.json(
                { error: data?.error || "Users Fetching failed" },
                { status: 400 }
            );
        }
    } catch (error) {
        console.error("Error in verification route:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
