import Link from "next/link";
import Section from "@/components/ui/Section";

export default function NotFound() {
    return (
        <Section className="flex min-h-[60vh] items-center justify-center">
            <div className="text-center">
                <p className="text-6xl font-bold text-foreground">404</p>
                <h1 className="mt-4 text-xl font-semibold text-foreground">
                    Page not found
                </h1>
                <p className="mt-2 text-muted-foreground">
                    The page you&apos;re looking for doesn&apos;t exist or has been moved.
                </p>
                <Link
                    href="/"
                    className="mt-6 inline-flex h-10 items-center rounded-full bg-foreground px-5 text-sm font-medium text-background transition-all hover:opacity-90"
                >
                    Go Home
                </Link>
            </div>
        </Section>
    );
}
