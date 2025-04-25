"use client";

import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "./ui/input-otp";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useState } from "react";
import { toast } from "sonner"; // Assuming you have a toast component for notifications
import axios from "axios";
import { useSession } from "next-auth/react";

const ForgotPassword = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [boxEmail, setBoxEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [error, setError] = useState("");

  // Handle sending the verification email
  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    try {
      const res = await axios.post("/api/auth/forgot-password", { email });
      toast("Verification code sent successfully!");
      setIsDialogOpen(false);
    } catch (err: any) {
      toast.error(err?.response?.data?.error);
    } finally {
      setIsSending(false);
    }
    setIsSending(false);
  };

  // Handle form submission for OTP and password reset
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await axios.post("/api/auth/forgot-password/verify", {
        email: boxEmail,
        password: password,
        verificationCode: otp,
      });
      toast("Password reset successfully!");
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.error);
    }
    setIsSubmitting(false);
  };

  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Forgot your Password?</CardTitle>
          <CardDescription>
            Enter the 6-digit code sent to your email and set a new password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 mb-4">
            <div className="grid gap-4">
              {/* OTP Input */}
              <div className="flex justify-center gap-2">
                <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              <div className="grid gap-4">
                <Label htmlFor="email2">Enter your Email</Label>
                <Input
                  id="email2"
                  type="text"
                  value={boxEmail}
                  onChange={(e) => setBoxEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              {/* Password Input */}
              <div className="grid gap-4">
                <Label htmlFor="password">New Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter new password"
                  required
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Verifying..." : "Reset Password"}
            </Button>
          </form>
          {/* Dialog Trigger for Email Input */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full">
                {isSending ? "Sending..." : "Send Verification Code"}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Enter Your Email</DialogTitle>
                <DialogDescription>
                  We'll send a verification code to this email address.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSend} className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
                {error && <p className="text-sm text-red-500">{error}</p>}
                <Button type="submit" disabled={isSending}>
                  {isSending ? "Sending..." : "Send Email"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
          <div className="mt-4 text-center text-sm">
            Back to{" "}
            <a href="/signin" className="underline underline-offset-4">
              Login
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPassword;