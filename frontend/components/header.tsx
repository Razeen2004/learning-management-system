'use client';

import * as React from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Bird, Moon, Sun } from 'lucide-react';

export function Header() {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [isMounted, setIsMounted] = React.useState(false);

    // Set isMounted to true after the component mounts on the client
    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    // Toggle between 'light' and 'dark' based on the resolved theme
    const toggleTheme = () => {
        setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
    };

    return (
        <header className="bg-background border-b ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="flex items-center gap-2">
                            <Bird/>
                            <span className="text-2xl font-bold text-primary">Nexlify</span>
                        </Link>
                    </div>

                    {/* Navigation */}
                    <nav className="hidden md:flex space-x-8">
                        <Link
                            href="/"
                            className="text-foreground hover:text-primary transition-colors"
                        >
                            Home
                        </Link>
                        <Link
                            href="/about"
                            className="text-foreground hover:text-primary transition-colors"
                        >
                            About
                        </Link>
                        <Link
                            href="/courses"
                            className="text-foreground hover:text-primary transition-colors"
                        >
                            Courses
                        </Link>
                        <Link
                            href="/contact"
                            className="text-foreground hover:text-primary transition-colors"
                        >
                            Contact
                        </Link>
                    </nav>

                    {/* Right Side: Theme Toggle, Login, Signup */}
                    <div className="flex items-center space-x-4">
                        {/* Theme Toggle */}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleTheme}
                            aria-label="Toggle theme"
                        >
                            {isMounted ? (
                                resolvedTheme === 'dark' ? (
                                    <Sun className="h-5 w-5 text-foreground" />
                                ) : (
                                    <Moon className="h-5 w-5 text-foreground" />
                                )
                            ) : (
                                <Moon className="h-5 w-5 text-foreground" /> // Default icon
                            )}
                        </Button>

                        {/* Auth Buttons */}
                        <Button variant="outline" asChild>
                            <Link href="/signin">Login</Link>
                        </Button>
                        <Button asChild>
                            <Link href="/signup">Signup</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    );
}