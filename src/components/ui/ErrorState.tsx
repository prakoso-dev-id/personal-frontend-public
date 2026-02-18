import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ErrorStateProps {
    title?: string;
    message?: string;
    className?: string;
}

export default function ErrorState({
    title = "Something went wrong",
    message = "We couldn't load the data. Please try again later.",
    className,
}: ErrorStateProps) {
    return (
        <div
            className={cn(
                "flex flex-col items-center justify-center gap-4 py-16 text-center",
                className
            )}
            role="alert"
        >
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10">
                <AlertCircle className="h-7 w-7 text-destructive" />
            </div>
            <div>
                <h3 className="mb-1 text-lg font-semibold text-foreground">{title}</h3>
                <p className="text-sm text-muted-foreground">{message}</p>
            </div>
        </div>
    );
}
