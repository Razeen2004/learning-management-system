import { NextRequest, NextResponse } from "next/server";

// Define response type
type ForgotPasswordResponse = {
  message?: string;
  error?: string;
};

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json<ForgotPasswordResponse>(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const res = await fetch(`${process.env.BACKEND_URL}/api/auth/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (res.ok) {
      return NextResponse.json<ForgotPasswordResponse>(
        { message: "Recovery email sent successfully!" },
        { status: 200 }
      );
    } else {
      return NextResponse.json<ForgotPasswordResponse>(
        { error: data?.error || "Failed to send recovery email" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error in forgot password route:", error);
    return NextResponse.json<ForgotPasswordResponse>(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}