
import Link from "next/link";
import { cn } from "@/lib/utils";

interface CardProps {
    title: string;
    description: string;
    href: string;
    image?: string;
    tags?: string[];
    meta?: string;
    className?: string;
}

export default function Card({
    title,
    description,
    href,
    image,
    tags,
    meta,
    className,
}: CardProps) {
    return (
        <Link
            href={href}
            className={cn(
                "group flex flex-col overflow-hidden rounded-lg border border-border",
                "bg-card text-card-foreground",
                "transition-all duration-300 ease-out",
                "hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5",
                "hover:-translate-y-0.5",
                className
            )}
        >
            {image && (
                <div className="relative aspect-video w-full overflow-hidden bg-muted">
                    <img
                        src={image}
                        alt={title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                </div>
            )}
            <div className="flex flex-1 flex-col p-5">
                {meta && (
                    <span className="mb-2 text-xs font-medium text-muted-foreground">
                        {meta}
                    </span>
                )}
                <h3 className="mb-2 text-lg font-semibold leading-snug tracking-tight transition-colors group-hover:text-primary">
                    {title}
                </h3>
                <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                    {description}
                </p>
                {tags && tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                        {tags.slice(0, 4).map((tag) => (
                            <span
                                key={tag}
                                className="inline-flex rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </Link>
    );
}
