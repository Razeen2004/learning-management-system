process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

import axios from 'axios';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { id, user } = await req.json();
        const token = req.headers.get("authorization");

        const response = await axios.post(`${process.env.BACKEND_URL}/api/admin/user/delete`, { id, user }, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: token || "",
            }
        });

        if (response.status !== 200) {
            return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
        }

        return NextResponse.json(response.data, { status: 200 });
    } catch (error: any) {
        console.error('Error deleting user:', error.message);
        return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
    }
}