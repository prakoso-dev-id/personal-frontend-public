import type { Metadata } from "next";

import Link from "next/link";
import Section from "@/components/ui/Section";
import ErrorState from "@/components/ui/ErrorState";
import EmptyState from "@/components/ui/EmptyState";
import { cn } from "@/lib/utils";
import { getProjects, ApiError } from "@/services/api";

export const metadata: Metadata = {
    title: "Projects",
    description: "Explore my projects and work.",
    openGraph: {
        title: "Projects | Portfolio",
        description: "Explore my projects and work.",
    },
};

export default async function ProjectsPage() {
    let projects = null;
    let error = false;

    try {
        projects = await getProjects();
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
                    Projects
                </h1>
                <p className="mt-2 text-muted-foreground">
                    A collection of things I&apos;ve built and contributed to.
                </p>
            </div>

            {error ? (
                <ErrorState
                    title="Couldn't load projects"
                    message="Please check your connection and try again."
                />
            ) : !projects || projects.length === 0 ? (
                <EmptyState
                    title="No projects yet"
                    message="Projects will appear here once they're published."
                />
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project) => (
                        <Link
                            key={project.ID}
                            href={`/projects/${project.ID}`}
                            className={cn(
                                "group flex flex-col overflow-hidden rounded-lg border border-border",
                                "bg-card text-card-foreground",
                                "transition-all duration-300 ease-out",
                                "hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5",
                                "hover:-translate-y-0.5"
                            )}
                        >
                            {project.Images?.[0]?.FilePath && (
                                <div className="relative aspect-video w-full overflow-hidden bg-muted">
                                    <img
                                        src={project.Images[0].FilePath}
                                        alt={project.Title}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                            )}
                            <div className="flex flex-1 flex-col p-5">
                                <h3 className="mb-2 text-lg font-semibold leading-snug tracking-tight transition-colors group-hover:text-primary">
                                    {project.Title}
                                </h3>
                                <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                                    {project.Description}
                                </p>
                                {project.Skills && project.Skills.length > 0 && (
                                    <div className="flex flex-wrap gap-1.5">
                                        {project.Skills.slice(0, 4).map((skill) => (
                                            <span
                                                key={skill.ID}
                                                className="inline-flex rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground"
                                            >
                                                {skill.Name}
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
