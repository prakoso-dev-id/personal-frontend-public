import { Inbox } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
    title?: string;
    message?: string;
    className?: string;
}

export default function EmptyState({
    title = "Nothing here yet",
    message = "Check back later for updates.",
    className,
}: EmptyStateProps) {
    return (
        <div
            className={cn(
                "flex flex-col items-center justify-center gap-4 py-16 text-center",
                className
            )}
        >
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
                <Inbox className="h-7 w-7 text-muted-foreground" />
            </div>
            <div>
                <h3 className="mb-1 text-lg font-semibold text-foreground">{title}</h3>
                <p className="text-sm text-muted-foreground">{message}</p>
            </div>
        </div>
    );
}
