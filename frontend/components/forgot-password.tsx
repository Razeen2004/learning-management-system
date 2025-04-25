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

const ForgotPassword = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [error, setError] = useState("");

  // Handle sending the verification email
  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setError("");

    try {
      // Replace with your actual API call
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Failed to send verification email");
      }

      toast({
        title: "Email Sent",
        description: "A verification code has been sent to your email.",
      });
      setIsDialogOpen(false); // Close the dialog
    } catch (err) {
      setError(err.message || "Something went wrong");
      toast({
        title: "Error",
        description: err.message || "Failed to send verification email",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  // Handle form submission for OTP and password reset
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // Replace with your actual API call
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, token: otp, newPassword: password }),
      });

      if (!response.ok) {
        throw new Error("Invalid verification code or email");
      }

      toast({
        title: "Success",
        description: "Your password has been reset successfully.",
      });
      // Optionally redirect to login
      window.location.href = "/signin";
    } catch (err) {
      setError(err.message || "Something went wrong");
      toast({
        title: "Error",
        description: err.message || "Failed to reset password",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
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
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPassword;