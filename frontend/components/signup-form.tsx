import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function Signup({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div">) {
    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Signup</CardTitle>
                    <CardDescription>
                        Enter your email below to signup to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="flex flex-col gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Username</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="m@example.com"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="text"
                                    placeholder="johndoe"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    <a
                                        href="#"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    >
                                    </a>
                                </div>
                                <Input id="password" type="password" required />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Confirm Password</Label>
                                    <a
                                        href="#"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    />
                                </div>
                                <Input id="password" type="password" required />
                            </div>
                            <Button type="submit" className="w-full">
                                Signup
                            </Button>
                            <Button variant="outline" className="w-full">
                                Login with Google
                            </Button>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Already have an account?{" "}
                            <a href="/signin" className="underline underline-offset-4">
                                Sign in
                            </a>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
