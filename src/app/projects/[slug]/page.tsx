import type { Metadata } from "next";

import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import Section from "@/components/ui/Section";
import ErrorState from "@/components/ui/ErrorState";
import { getProjectById, ApiError } from "@/services/api";
import { formatDate } from "@/lib/utils";
import InteractiveImage from "@/components/ui/InteractiveImage";
import Lightbox from "@/components/ui/Lightbox";

interface ProjectDetailPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({
    params,
}: ProjectDetailPageProps): Promise<Metadata> {
    try {
        const { slug: id } = await params;
        const project = await getProjectById(id);
        return {
            title: project.Title,
            description: project.Description,
            openGraph: {
                title: `${project.Title} | Portfolio`,
                description: project.Description,
                images: project.Images?.[0]?.FilePath
                    ? [{ url: project.Images[0].FilePath }]
                    : [],
            },
        };
    } catch {
        return {
            title: "Project Not Found",
        };
    }
}

export default async function ProjectDetailPage({
    params,
}: ProjectDetailPageProps) {
    let project = null;

    try {
        const { slug: id } = await params;
        project = await getProjectById(id);
    } catch (err) {
        if (err instanceof ApiError && err.status === 404) {
            notFound();
        }
        return (
            <Section>
                <ErrorState
                    title="Couldn't load project"
                    message="Please try again later."
                />
            </Section>
        );
    }

    if (!project) {
        notFound();
    }

    const uniqueImages = project.Images?.filter(
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

    const coverImageIndex = 0;

    return (
        <Section className="pt-20 md:pt-28">
            <Lightbox />
            {/* Back link */}
            <Link
                href="/projects"
                className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
                <ArrowLeft className="h-4 w-4" />
                Back to projects
            </Link>

            {/* Cover Image */}
            {uniqueImages[0] && (
                <div className="relative mb-8 aspect-video w-full overflow-hidden rounded-lg border border-border">
                    <InteractiveImage
                        src={uniqueImages[0].FilePath}
                        alt={project.Title}
                        className="h-full w-full"
                        index={0}
                        allImages={lightboxImages}
                    />
                </div>
            )}

            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                    {project.Title}
                </h1>
                <p className="mt-3 text-lg text-muted-foreground">
                    {project.Description}
                </p>

                {/* Date range */}
                {project.StartDate && (
                    <p className="mt-2 text-sm text-muted-foreground">
                        {formatDate(project.StartDate)} — {project.EndDate ? formatDate(project.EndDate) : "Present"}
                    </p>
                )}

                {/* Links */}
                <div className="mt-4 flex flex-wrap gap-3">
                    {project.DemoURL && (
                        <a
                            href={project.DemoURL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex h-9 items-center gap-1.5 rounded-full bg-foreground px-4 text-sm font-medium text-background transition-all hover:opacity-90"
                        >
                            <ExternalLink className="h-3.5 w-3.5" />
                            Live Demo
                        </a>
                    )}
                    {project.RepoURL && (
                        <a
                            href={project.RepoURL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex h-9 items-center gap-1.5 rounded-full border border-border px-4 text-sm font-medium text-foreground transition-colors hover:bg-accent"
                        >
                            <Github className="h-3.5 w-3.5" />
                            Source Code
                        </a>
                    )}
                </div>

                {/* Skills */}
                {project.Skills && project.Skills.length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-2">
                        {project.Skills.map((skill) => (
                            <span
                                key={skill.ID}
                                className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
                            >
                                {skill.IconURL && (
                                    <img src={skill.IconURL} alt={skill.Name} className="h-3.5 w-3.5" />
                                )}
                                {skill.Name}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            {/* Content Markdown */}
            {project.ContentMarkdown && (
                <div className="prose max-w-none text-foreground">
                    <div
                        dangerouslySetInnerHTML={{ __html: project.ContentMarkdown }}
                    />
                </div>
            )}

            {/* Image Gallery */}
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
        </Section>
    );
}
