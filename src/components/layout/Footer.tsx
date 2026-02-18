import Link from "next/link";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";

const FOOTER_LINKS = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Posts", href: "/posts" },
    { label: "Contact", href: "/contact" },
] as const;

const SOCIAL_LINKS = [
    { label: "GitHub", href: "https://github.com", icon: Github },
    { label: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
    { label: "Twitter", href: "https://twitter.com", icon: Twitter },
    { label: "Email", href: "mailto:hello@example.com", icon: Mail },
] as const;

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-border bg-background">
            <div className="mx-auto max-w-5xl px-6 py-12">
                <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
                    {/* Navigation */}
                    <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2" aria-label="Footer navigation">
                        {FOOTER_LINKS.map(({ label, href }) => (
                            <Link
                                key={href}
                                href={href}
                                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                            >
                                {label}
                            </Link>
                        ))}
                    </nav>

                    {/* Social Links */}
                    <div className="flex items-center gap-3">
                        {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                            <a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                                aria-label={label}
                            >
                                <Icon className="h-4 w-4" />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-8 border-t border-border pt-6 text-center">
                    <p className="text-xs text-muted-foreground">
                        © {currentYear} Portfolio. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
