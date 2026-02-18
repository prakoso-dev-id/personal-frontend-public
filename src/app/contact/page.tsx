"use client";

import { useState } from "react";
import type { Metadata } from "next";
import { Send, Github, Linkedin, Twitter, Mail, Music } from "lucide-react";
import Section from "@/components/ui/Section";
import { cn } from "@/lib/utils";
import type { ContactFormData } from "@/types";

const SOCIAL_LINKS = [
    {
        label: "GitHub",
        href: "https://github.com",
        icon: Github,
        description: "Check out my code",
    },
    {
        label: "LinkedIn",
        href: "https://linkedin.com",
        icon: Linkedin,
        description: "Let's connect",
    },
    {
        label: "Twitter",
        href: "https://twitter.com",
        icon: Twitter,
        description: "Follow me",
    },
    {
        label: "Email",
        href: "mailto:hello@example.com",
        icon: Mail,
        description: "Send me an email",
    },
    {
        label: "Music",
        href: "https://spotify.com",
        icon: Music,
        description: "Listen to my music",
    },
] as const;

export default function ContactPage() {
    const [formData, setFormData] = useState<ContactFormData>({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("sending");

        try {
            const { submitContactForm } = await import("@/services/api");
            await submitContactForm(formData);
            setStatus("sent");
            setFormData({ name: "", email: "", subject: "", message: "" });
        } catch {
            setStatus("error");
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <>
            <Section className="pt-20 md:pt-28">
                <div className="mb-10">
                    <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                        Get in Touch
                    </h1>
                    <p className="mt-2 text-muted-foreground">
                        Have a question or want to work together? Drop me a message.
                    </p>
                </div>

                <div className="grid gap-12 md:grid-cols-2">
                    {/* Contact Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-foreground">
                                Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className={cn(
                                    "h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground",
                                    "placeholder:text-muted-foreground",
                                    "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background",
                                    "transition-colors"
                                )}
                                placeholder="Your name"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className={cn(
                                    "h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground",
                                    "placeholder:text-muted-foreground",
                                    "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background",
                                    "transition-colors"
                                )}
                                placeholder="you@example.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="subject" className="mb-1.5 block text-sm font-medium text-foreground">
                                Subject
                            </label>
                            <input
                                id="subject"
                                name="subject"
                                type="text"
                                required
                                value={formData.subject}
                                onChange={handleChange}
                                className={cn(
                                    "h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground",
                                    "placeholder:text-muted-foreground",
                                    "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background",
                                    "transition-colors"
                                )}
                                placeholder="What's this about?"
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-foreground">
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                required
                                rows={5}
                                value={formData.message}
                                onChange={handleChange}
                                className={cn(
                                    "w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground",
                                    "placeholder:text-muted-foreground",
                                    "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background",
                                    "transition-colors resize-none"
                                )}
                                placeholder="Tell me about your project or idea..."
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={status === "sending"}
                            className={cn(
                                "inline-flex h-10 w-full items-center justify-center gap-2 rounded-md",
                                "bg-foreground px-4 text-sm font-medium text-background",
                                "transition-all hover:opacity-90",
                                "disabled:cursor-not-allowed disabled:opacity-50"
                            )}
                        >
                            {status === "sending" ? (
                                "Sending..."
                            ) : (
                                <>
                                    <Send className="h-4 w-4" />
                                    Send Message
                                </>
                            )}
                        </button>

                        {status === "sent" && (
                            <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                                Message sent successfully! I&apos;ll get back to you soon.
                            </p>
                        )}

                        {status === "error" && (
                            <p className="text-sm font-medium text-destructive">
                                Failed to send message. Please try again or email me directly.
                            </p>
                        )}
                    </form>

                    {/* Social Links */}
                    <div>
                        <h2 className="mb-6 text-lg font-semibold">Or find me on</h2>
                        <div className="space-y-3">
                            {SOCIAL_LINKS.map(({ label, href, icon: Icon, description }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-4 rounded-lg border border-border p-4 transition-all hover:border-primary/20 hover:bg-accent/50 hover:shadow-sm"
                                >
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                                        <Icon className="h-5 w-5 text-secondary-foreground" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-foreground">{label}</p>
                                        <p className="text-xs text-muted-foreground">{description}</p>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </Section>
        </>
    );
}
