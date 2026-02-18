"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import ThemeToggle from "@/components/ui/ThemeToggle";

const NAV_ITEMS = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Posts", href: "/posts" },
    { label: "Contact", href: "/contact" },
] as const;

export default function Header() {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-lg">
            <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
                {/* Logo */}
                <Link
                    href="/"
                    className="text-lg font-bold tracking-tight text-foreground transition-colors hover:text-primary"
                >
                    Portfolio
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
                    {NAV_ITEMS.map(({ label, href }) => {
                        const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
                        return (
                            <Link
                                key={href}
                                href={href}
                                className={cn(
                                    "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                                    isActive
                                        ? "text-foreground bg-accent"
                                        : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                                )}
                            >
                                {label}
                            </Link>
                        );
                    })}
                    <div className="ml-2 border-l border-border pl-2">
                        <ThemeToggle />
                    </div>
                </nav>

                {/* Mobile Controls */}
                <div className="flex items-center gap-2 md:hidden">
                    <ThemeToggle />
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-accent"
                        aria-label="Toggle menu"
                        aria-expanded={mobileOpen}
                    >
                        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            {mobileOpen && (
                <nav
                    className="border-t border-border bg-background px-6 py-4 md:hidden"
                    aria-label="Mobile navigation"
                >
                    <div className="flex flex-col gap-1">
                        {NAV_ITEMS.map(({ label, href }) => {
                            const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
                            return (
                                <Link
                                    key={href}
                                    href={href}
                                    onClick={() => setMobileOpen(false)}
                                    className={cn(
                                        "rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                                        isActive
                                            ? "text-foreground bg-accent"
                                            : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                                    )}
                                >
                                    {label}
                                </Link>
                            );
                        })}
                    </div>
                </nav>
            )}
        </header>
    );
}
