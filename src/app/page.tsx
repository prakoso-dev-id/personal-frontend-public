import Section from "@/components/ui/Section";
import ErrorState from "@/components/ui/ErrorState";
import { ProfileSkeleton } from "@/components/ui/Skeleton";
import Hero from "@/components/sections/Hero";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import { getProfile, getFeaturedProjects, ApiError } from "@/services/api";

export default async function HomePage() {
  let profile = null;
  let featuredProjects = null;
  let error = false;

  try {
    [profile, featuredProjects] = await Promise.all([
      getProfile(),
      getFeaturedProjects(),
    ]);
  } catch (err) {
    if (err instanceof ApiError) {
      console.error(`API Error: ${err.status} - ${err.message}`);
    }
    error = true;
  }

  return (
    <>
      {/* Hero Section */}
      <Section className="pt-20 md:pt-28">
        {error || !profile ? (
          error ? (
            <ErrorState
              title="Couldn't load profile"
              message="Please check your connection and try again."
            />
          ) : (
            <ProfileSkeleton />
          )
        ) : (
          <Hero profile={profile} />
        )}
      </Section>

      {/* Featured Projects */}
      <Section>
        {!error && featuredProjects ? (
          <FeaturedProjects projects={featuredProjects} />
        ) : null}
      </Section>

      {/* CTA Section */}
      <Section className="text-center">
        <div className="mx-auto max-w-md">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Let&apos;s work together
          </h2>
          <p className="mt-3 text-muted-foreground">
            Have an idea or project in mind? I&apos;d love to hear about it.
          </p>
          <a
            href="/contact"
            className="mt-6 inline-flex h-10 items-center rounded-full bg-foreground px-6 text-sm font-medium text-background transition-all hover:opacity-90"
          >
            Get in Touch
          </a>
        </div>
      </Section>
    </>
  );
}
