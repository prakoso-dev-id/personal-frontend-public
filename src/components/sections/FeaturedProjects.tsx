import Link from "next/link";

import { ArrowRight } from "lucide-react";
import EmptyState from "@/components/ui/EmptyState";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

interface FeaturedProjectsProps {
    projects: Project[];
}

export default function FeaturedProjects({ projects }: FeaturedProjectsProps) {
    if (projects.length === 0) {
        return (
            <EmptyState
                title="No featured projects"
                message="Featured projects will appear here soon."
            />
        );
    }

    return (
        <div>
            <div className="mb-8 flex items-end justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                        Featured Projects
                    </h2>
                    <p className="mt-2 text-muted-foreground">
                        Some of my recent work
                    </p>
                </div>
                <Link
                    href="/projects"
                    className="hidden items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:flex"
                >
                    View all
                    <ArrowRight className="h-4 w-4" />
                </Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {projects.slice(0, 3).map((project) => (
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

            <div className="mt-6 text-center sm:hidden">
                <Link
                    href="/projects"
                    className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                    View all projects
                    <ArrowRight className="h-4 w-4" />
                </Link>
            </div>
        </div>
    );
}
