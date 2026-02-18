import type { Metadata } from "next";

import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar } from "lucide-react";
import Section from "@/components/ui/Section";
import ErrorState from "@/components/ui/ErrorState";
import { getPostBySlug, ApiError } from "@/services/api";
import InteractiveImage from "@/components/ui/InteractiveImage";
import Lightbox from "@/components/ui/Lightbox";

interface PostDetailPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({
    params,
}: PostDetailPageProps): Promise<Metadata> {
    try {
        const { slug } = await params;
        const post = await getPostBySlug(slug);
        return {
            title: post.Title,
            description: post.Summary,
            openGraph: {
                title: `${post.Title} | Portfolio`,
                description: post.Summary,
                type: "article",
                publishedTime: post.PublishedAt,
                images: post.Images?.[0]?.FilePath
                    ? [{ url: post.Images[0].FilePath }]
                    : [],
            },
            twitter: {
                card: "summary_large_image",
                title: post.Title,
                description: post.Summary,
            },
        };
    } catch {
        return {
            title: "Post Not Found",
        };
    }
}

export default async function PostDetailPage({
    params,
}: PostDetailPageProps) {
    let post = null;

    try {
        const { slug } = await params;
        post = await getPostBySlug(slug);
    } catch (err) {
        if (err instanceof ApiError && err.status === 404) {
            notFound();
        }
        return (
            <Section>
                <ErrorState
                    title="Couldn't load post"
                    message="Please try again later."
                />
            </Section>
        );
    }

    if (!post) {
        notFound();
    }

    const uniqueImages = post.Images?.filter(
        (img, index, self) =>
            index ===
            self.findIndex(
                (t) => t.FilePath === img.FilePath && t.FileName === img.FileName
            )
    ) || [];

    const lightboxImages = uniqueImages.map((img) => ({
        src: img.FilePath,
        alt: img.FileName,
    }));

    return (
        <Section className="pt-20 md:pt-28">
            <Lightbox />
            {/* Back link */}
            <Link
                href="/posts"
                className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
                <ArrowLeft className="h-4 w-4" />
                Back to posts
            </Link>

            {/* Article */}
            <article>
                <header className="mb-10">
                    {/* Tags */}
                    {post.Tags && post.Tags.length > 0 && (
                        <div className="mb-4 flex flex-wrap gap-2">
                            {post.Tags.map((tag) => (
                                <span
                                    key={tag.ID}
                                    className="inline-flex rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
                                >
                                    {tag.Name}
                                </span>
                            ))}
                        </div>
                    )}

                    <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
                        {post.Title}
                    </h1>

                    <p className="mt-4 text-lg text-muted-foreground">
                        {post.Summary}
                    </p>

                    {/* Meta */}
                    {post.PublishedAt && (
                        <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="inline-flex items-center gap-1.5">
                                <Calendar className="h-3.5 w-3.5" />
                                {new Date(post.PublishedAt).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </span>
                        </div>
                    )}
                </header>

                {/* Cover Image */}
                {uniqueImages[0] && (
                    <div className="relative mb-10 aspect-video w-full overflow-hidden rounded-lg border border-border">
                        <InteractiveImage
                            src={uniqueImages[0].FilePath}
                            alt={post.Title}
                            className="h-full w-full"
                            index={0}
                            allImages={lightboxImages}
                        />
                    </div>
                )}

                {/* Content */}
                {post.ContentMarkdown && (
                    <div className="prose mx-auto max-w-3xl text-foreground">
                        <div dangerouslySetInnerHTML={{ __html: post.ContentMarkdown }} />
                    </div>
                )}

                {/* Gallery */}
                {uniqueImages.length > 1 && (
                    <div className="mt-10">
                        <h2 className="mb-4 text-xl font-semibold">Gallery</h2>
                        <div className="grid gap-4 sm:grid-cols-2">
                            {uniqueImages.slice(1).map((img, index) => (
                                <div
                                    key={img.ID}
                                    className="relative aspect-video overflow-hidden rounded-lg border border-border"
                                >
                                    <InteractiveImage
                                        src={img.FilePath}
                                        alt={img.FileName}
                                        className="h-full w-full"
                                        index={index + 1}
                                        allImages={lightboxImages}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </article>
        </Section>
    );
}
