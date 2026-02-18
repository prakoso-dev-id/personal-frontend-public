import { cn } from "@/lib/utils";

interface SkeletonProps {
    className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
    return (
        <div
            className={cn(
                "animate-pulse rounded-md bg-muted",
                className
            )}
        />
    );
}

export function CardSkeleton() {
    return (
        <div className="flex flex-col overflow-hidden rounded-lg border border-border bg-card">
            <Skeleton className="aspect-video w-full rounded-none" />
            <div className="flex flex-col p-5">
                <Skeleton className="mb-2 h-3 w-20" />
                <Skeleton className="mb-2 h-5 w-3/4" />
                <Skeleton className="mb-1 h-4 w-full" />
                <Skeleton className="mb-4 h-4 w-2/3" />
                <div className="flex gap-1.5">
                    <Skeleton className="h-5 w-14 rounded-full" />
                    <Skeleton className="h-5 w-16 rounded-full" />
                    <Skeleton className="h-5 w-12 rounded-full" />
                </div>
            </div>
        </div>
    );
}

export function ProfileSkeleton() {
    return (
        <div className="flex flex-col items-center gap-6 text-center md:flex-row md:text-left">
            <Skeleton className="h-32 w-32 rounded-full" />
            <div className="flex flex-col gap-3">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-5 w-36" />
                <Skeleton className="h-4 w-72" />
                <Skeleton className="h-4 w-64" />
            </div>
        </div>
    );
}
