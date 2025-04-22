"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { FormEventHandler, useRef, useState } from "react";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "./ui/input-otp";
import { toast } from "sonner";
import axios from "axios";
import { useSession } from "next-auth/react";

const VerifyEmailForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [otp, setOtp] = useState("");
    const router = useRouter();
    const session = useSession();


    const handleSubmit = (e: any) => {
        e.preventDefault();
        setIsSubmitting(true);
        const code = otp;
        const email = session?.data?.user?.email;

        axios.post("/api/auth/verification", { email, verificationCode: code })
            .then((res) => {
                if (res.status === 200) {
                    toast("Email verified successfully!");
                    router.push("/dashboard");
                } else {
                    toast.error("Verification failed. Please try again.");
                }
            })
            .catch((err) => {
                console.error(err);
                toast.error("An error occurred during verification. Please try again.");
            })
            .finally(() => {
                setIsSubmitting(false);
            });

    }

    const handleSend = async (e: any) => {
        e.preventDefault();
        setIsSending(true);

        const verify = await axios.post("/api/auth/verification/code", {
            email: session?.data?.user?.email,
        });

        if (verify.status === 200) {
            toast.success("Verification code sent successfully!");
        } else {
            toast.error("Failed to send verification code");
        }
        setIsSending(false);

    }

    return (
        <div className={cn("flex flex-col gap-6")}>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Verify Your Email</CardTitle>
                    <CardDescription>
                        Enter the 6-digit code sent to your email address
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
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
                            </div>
                            <Button type="submit" className="w-full" disabled={isSubmitting}>
                                {isSubmitting ? "Verifying..." : "Verify Email"}
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full"
                                onClick={handleSend}
                            >
                                {isSending ? "Sending..." : "Send Code"}
                            </Button>
                        </div>
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
    )
};

export default VerifyEmailForm;