process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

import { NextResponse, NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { id, role, user } = await req.json();

        const token = req.headers.get("authorization");

        const res = await fetch(`${process.env.BACKEND_URL}/api/admin/user/change/role`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: token || ""
            },
            body: JSON.stringify({ id, role, user }),
        });

        const data = await res.json();

        if (res.ok) {
            return NextResponse.json(data);
        } else {
            return NextResponse.json(
                { error: data?.error || "Role Change failed" },
                { status: 400 }
            );
        }
    } catch (error) {
        console.error("Error in verification route:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}


