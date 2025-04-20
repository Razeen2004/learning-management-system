"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import React from "react";
import { useTheme } from "next-themes";

const ThemeChanger = () => {
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

    return (<Button
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
    </Button>);
}

export default ThemeChanger;