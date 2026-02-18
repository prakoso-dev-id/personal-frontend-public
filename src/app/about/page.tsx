import type { Metadata } from "next";

import Section from "@/components/ui/Section";
import ErrorState from "@/components/ui/ErrorState";
import { getProfile, getSkills, ApiError } from "@/services/api";
import { formatDate } from "@/lib/utils";
import type { Skill } from "@/types";

export const metadata: Metadata = {
    title: "About",
    description: "Learn more about my background and skills.",
    openGraph: {
        title: "About | Portfolio",
        description: "Learn more about my background and skills.",
    },
};

function SkillBadge({ skill }: { skill: Skill }) {
    return (
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-3 py-1 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary">
            {skill.IconURL && (
                <img src={skill.IconURL} alt={skill.Name} className="h-4 w-4" />
            )}
            {skill.Name}
        </span>
    );
}

export default async function AboutPage() {
    let profile = null;
    let skills: Skill[] = [];
    let error = false;

    try {
        [profile, skills] = await Promise.all([
            getProfile(),
            getSkills(),
        ]);
    } catch (err) {
        if (err instanceof ApiError) {
            console.error(`API Error: ${err.status} - ${err.message}`);
        }
        error = true;
    }

    if (error || !profile) {
        return (
            <Section>
                <ErrorState
                    title="Couldn't load profile"
                    message="Please check your connection and try again."
                />
            </Section>
        );
    }

    // Group skills by category
    const skillsByCategory = skills.reduce<Record<string, Skill[]>>(
        (acc, skill) => {
            if (!acc[skill.Category]) {
                acc[skill.Category] = [];
            }
            acc[skill.Category].push(skill);
            return acc;
        },
        {}
    );

    return (
        <>
            {/* Profile Header */}
            <Section className="pt-20 md:pt-28">
                <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
                    <div className="h-40 w-40 shrink-0 overflow-hidden rounded-2xl border-2 border-border shadow-lg">
                        {profile.AvatarURL ? (
                            <img
                                src={profile.AvatarURL}
                                alt={profile.FullName}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center bg-muted text-4xl font-bold text-muted-foreground">
                                {profile.FullName.charAt(0)}
                            </div>
                        )}
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                            {profile.FullName}
                        </h1>
                        <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
                            {profile.Bio}
                        </p>
                        {profile.ResumeURL && (
                            <a
                                href={profile.ResumeURL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-4 inline-flex h-9 items-center rounded-full border border-border px-4 text-sm font-medium text-foreground transition-colors hover:bg-accent"
                            >
                                View Resume
                            </a>
                        )}
                    </div>
                </div>
            </Section>

            {/* Skills */}
            {Object.keys(skillsByCategory).length > 0 && (
                <Section>
                    <h2 className="mb-8 text-2xl font-bold tracking-tight">Skills</h2>
                    <div className="space-y-6">
                        {Object.entries(skillsByCategory).map(([category, catSkills]) => (
                            <div key={category}>
                                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                                    {category}
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {catSkills.map((skill) => (
                                        <SkillBadge key={skill.ID} skill={skill} />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </Section>
            )}

            {/* Experiences */}
            {profile.Experiences && profile.Experiences.length > 0 && (
                <Section>
                    <h2 className="mb-8 text-2xl font-bold tracking-tight">Experience</h2>
                    <div>
                        {profile.Experiences.map((exp) => (
                            <div
                                key={exp.ID}
                                className="relative pl-8 before:absolute before:left-0 before:top-2 before:h-2.5 before:w-2.5 before:rounded-full before:bg-foreground after:absolute after:left-[4.5px] after:top-5 after:h-full after:w-[1px] after:bg-border last:after:hidden"
                            >
                                <div className="pb-8">
                                    <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                                        <h3 className="font-semibold text-foreground">{exp.Title}</h3>
                                        <span className="text-xs font-medium text-muted-foreground">
                                            {formatDate(exp.StartDate)} — {exp.EndDate ? formatDate(exp.EndDate) : "Present"}
                                        </span>
                                    </div>
                                    <p className="mt-0.5 text-sm font-medium text-primary/80">
                                        {exp.Company} · {exp.Location}
                                    </p>
                                    <div
                                        className="prose prose-sm mt-2 max-w-none text-muted-foreground"
                                        dangerouslySetInnerHTML={{ __html: exp.Description }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </Section>
            )}
        </>
    );
}
