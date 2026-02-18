"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ui/ThemeProvider";
import { cn } from "@/lib/utils";

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className={cn(
                "relative inline-flex h-9 w-9 items-center justify-center",
                "rounded-full transition-colors duration-200",
                "hover:bg-accent text-foreground",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            )}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
            <Sun
                className={cn(
                    "h-[1.125rem] w-[1.125rem] transition-all duration-300",
                    theme === "dark" ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
                )}
            />
            <Moon
                className={cn(
                    "absolute h-[1.125rem] w-[1.125rem] transition-all duration-300",
                    theme === "dark" ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
                )}
            />
        </button>
    );
}
