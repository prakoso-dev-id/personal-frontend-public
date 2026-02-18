import type { Metadata } from "next";

import Link from "next/link";
import Section from "@/components/ui/Section";
import ErrorState from "@/components/ui/ErrorState";
import EmptyState from "@/components/ui/EmptyState";
import { cn } from "@/lib/utils";
import { getPosts, ApiError } from "@/services/api";

export const metadata: Metadata = {
    title: "Posts",
    description: "Thoughts, tutorials, and stories about software engineering and music.",
    openGraph: {
        title: "Posts | Portfolio",
        description: "Thoughts, tutorials, and stories about software engineering and music.",
    },
};

export default async function PostsPage() {
    let posts = null;
    let error = false;

    try {
        posts = await getPosts();
    } catch (err) {
        if (err instanceof ApiError) {
            console.error(`API Error: ${err.status} - ${err.message}`);
        }
        error = true;
    }

    return (
        <Section className="pt-20 md:pt-28">
            <div className="mb-10">
                <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                    Posts
                </h1>
                <p className="mt-2 text-muted-foreground">
                    Thoughts, tutorials, and stories.
                </p>
            </div>

            {error ? (
                <ErrorState
                    title="Couldn't load posts"
                    message="Please check your connection and try again."
                />
            ) : !posts || posts.length === 0 ? (
                <EmptyState
                    title="No posts yet"
                    message="Posts will appear here once they're published."
                />
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {posts.map((post) => (
                        <Link
                            key={post.ID}
                            href={`/posts/${post.Slug}`}
                            className={cn(
                                "group flex flex-col overflow-hidden rounded-lg border border-border",
                                "bg-card text-card-foreground",
                                "transition-all duration-300 ease-out",
                                "hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5",
                                "hover:-translate-y-0.5"
                            )}
                        >
                            {post.Images?.[0]?.FilePath && (
                                <div className="relative aspect-video w-full overflow-hidden bg-muted">
                                    <img
                                        src={post.Images[0].FilePath}
                                        alt={post.Title}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                            )}
                            <div className="flex flex-1 flex-col p-5">
                                {post.PublishedAt && (
                                    <span className="mb-2 text-xs font-medium text-muted-foreground">
                                        {new Date(post.PublishedAt).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </span>
                                )}
                                <h3 className="mb-2 text-lg font-semibold leading-snug tracking-tight transition-colors group-hover:text-primary">
                                    {post.Title}
                                </h3>
                                <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                                    {post.Summary}
                                </p>
                                {post.Tags && post.Tags.length > 0 && (
                                    <div className="flex flex-wrap gap-1.5">
                                        {post.Tags.slice(0, 4).map((tag) => (
                                            <span
                                                key={tag.ID}
                                                className="inline-flex rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground"
                                            >
                                                {tag.Name}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </Section>
    );
}
