import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact",
    description: "Get in touch — send me a message or find me on social media.",
    openGraph: {
        title: "Contact | Portfolio",
        description: "Get in touch — send me a message or find me on social media.",
    },
};

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
