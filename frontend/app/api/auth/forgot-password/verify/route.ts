import '@/lib/ignoreSelfSignedCert';

import { NextRequest, NextResponse } from "next/server";

// Define response type
type ResetPasswordResponse = {
  message?: string;
  error?: string;
};

export async function POST(req: NextRequest) {
  try {
    const { email, password, verificationCode } = await req.json();

    // Validate inputs
    if (!email || !password || !verificationCode) {
      return NextResponse.json<ResetPasswordResponse>(
        { error: "Email, password, and verification code are required" },
        { status: 400 }
      );
    }

    const response = await fetch(`${process.env.BACKEND_URL}/api/auth/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, verificationCode }),
    });

    const data = await response.json();

    if (response.ok) {
      return NextResponse.json<ResetPasswordResponse>(
        { message: "Password reset successfully!" },
        { status: 200 }
      );
    }

    return NextResponse.json<ResetPasswordResponse>(
      { error: data?.error || "Failed to reset password" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error in reset password route:", error);
    return NextResponse.json<ResetPasswordResponse>(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}