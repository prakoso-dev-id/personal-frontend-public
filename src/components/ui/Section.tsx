import { cn } from "@/lib/utils";

interface SectionProps {
    children: React.ReactNode;
    className?: string;
    id?: string;
}

export default function Section({ children, className, id }: SectionProps) {
    return (
        <section
            id={id}
            className={cn("py-16 md:py-24", className)}
        >
            <div className="mx-auto max-w-5xl px-6">
                {children}
            </div>
        </section>
    );
}
