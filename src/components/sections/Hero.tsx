
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Profile } from "@/types";

interface HeroProps {
    profile: Profile;
}

export default function Hero({ profile }: HeroProps) {
    return (
        <div className="flex flex-col items-center gap-8 text-center md:flex-row md:text-left">
            {/* Avatar */}
            <div className="relative">
                <div className="h-32 w-32 overflow-hidden rounded-full border-2 border-border shadow-lg md:h-40 md:w-40">
                    {profile.AvatarURL ? (
                        <img
                            src={profile.AvatarURL}
                            alt={profile.FullName}
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center bg-muted text-3xl font-bold text-muted-foreground">
                            {profile.FullName.charAt(0)}
                        </div>
                    )}
                </div>
                <span className="absolute bottom-2 right-2 h-4 w-4 rounded-full border-2 border-background bg-emerald-500" />
            </div>

            {/* Info */}
            <div className="flex flex-col gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
                        {profile.FullName}
                    </h1>
                </div>

                <p className="max-w-lg text-base leading-relaxed text-muted-foreground">
                    {profile.Bio}
                </p>

                <div className="flex flex-wrap justify-center gap-3 md:justify-start">
                    <Link
                        href="/projects"
                        className="inline-flex h-10 items-center gap-2 rounded-full bg-foreground px-5 text-sm font-medium text-background transition-all hover:opacity-90"
                    >
                        View Projects
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                        href="/contact"
                        className="inline-flex h-10 items-center rounded-full border border-border px-5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
                    >
                        Get in Touch
                    </Link>
                    {profile.ResumeURL && (
                        <a
                            href={profile.ResumeURL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex h-10 items-center rounded-full border border-border px-5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
                        >
                            Resume
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}
