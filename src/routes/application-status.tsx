import AnimatedLetters from "@/components/ui/AnimatedLetters";
import { createFileRoute } from "@tanstack/react-router";

import { StatusTracker } from "@/components/admissions/StatusTracker";

export const Route = createFileRoute("/application-status")({
  validateSearch: (search: Record<string, unknown>) => ({
    ref: typeof search["ref"] === "string" ? search["ref"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Application Status — King Solomon Comprehensive School" },
      {
        name: "description",
        content:
          "Track your King Solomon Comprehensive School admissions inquiry with your reference code and download a PDF summary.",
      },
      { property: "og:title", content: "Application Status — King Solomon Comprehensive School" },
      {
        property: "og:description",
        content:
          "Track your King Solomon Comprehensive School admissions inquiry with your reference code and download a PDF summary.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ApplicationStatusPage,
});

function ApplicationStatusPage() {
  const { ref } = Route.useSearch();

  return (
    <div>
      <section className="bg-navy text-primary-foreground">
        <div className="container-wide section-padding py-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold">Applicants</p>
          <h1 className="mt-4 font-display text-4xl font-bold md:text-5xl">
            <AnimatedLetters text="Track your application" />
          </h1>
          <p className="mt-4 max-w-2xl text-primary-foreground/80">
            Check where your inquiry stands in our admissions process and download an official PDF
            summary at any time.
          </p>
        </div>
      </section>

      <section className="bg-cream">
        <div className="container-wide section-padding">
          <StatusTracker initialReference={ref ?? ""} />
        </div>
      </section>
    </div>
  );
}
