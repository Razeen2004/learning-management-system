"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button";
import { getSession, signIn, signOut, useSession } from "next-auth/react";
import { Session } from "next-auth";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


export function LoginForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div">) {

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const router = useRouter();
    const session = useSession();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (result?.ok) {
                toast("You're signed in!");

                // 💡 Wait for a moment (optional)
                const updatedSession = await getSession() as Session & { user: { isVerified?: boolean } };

                if (updatedSession?.user && updatedSession.user.isVerified) {
                    router.push("/dashboard");
                } else {
                    router.push("/verify");
                    toast("Please verify your email to continue");
                }
            } else {
                toast("Incorrect Email or Password");
            }

        } catch (error) {
            console.error("Login error:", error);
            alert("An error occurred during login");
        }
    };



    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="text"
                                    placeholder="m@example.com"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    <a
                                        href="/forgot-password"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    >
                                        Forgot your password?
                                    </a>
                                </div>
                                <Input id="password" type="password" required onChange={(e) => { setPassword(e.target.value) }} value={password} />
                            </div>
                            <Button type="submit" className="w-full">
                                Login
                            </Button>
                            <Button variant="outline" className="w-full" onClick={() => signIn("google")}>
                                Login with Google
                            </Button>


                            {/* <Button variant="outline" className="w-full">
                                Login with Google
                            </Button>
                            <Button onClick={() => signOut()} variant="outline" className="w-full">
                                Signout
                            </Button> */}
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Don&apos;t have an account?{" "}
                            <a href="/signup" className="underline underline-offset-4">
                                Sign up
                            </a>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
