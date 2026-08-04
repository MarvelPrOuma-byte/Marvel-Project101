import AnimatedLetters from "@/components/ui/AnimatedLetters";
import { createFileRoute, Link } from "@tanstack/react-router";

import { InquiryForm } from "@/components/admissions/InquiryForm";

const steps = [
  {
    step: "01",
    title: "Inquire",
    description:
      "Complete our online inquiry form or call our admissions office to learn more about King Solomon Comprehensive School.",
  },
  {
    step: "02",
    title: "Visit",
    description:
      "Schedule a school visit  and attend an open house to see our classrooms and meet faculty.",
  },
  {
    step: "03",
    title: "Apply",
    description:
      "Submit the application form, transcripts, recommendations, and any required assessments.",
  },
  {
    step: "04",
    title: "Decide",
    description:
      "Receive your decision, connect with current families, and enroll for the coming year.",
  },
];

const deadlines = [
  { event: "Applications Open", date: "September 1, 2026" },
  { event: "Open House", date: "October 15, 2026" },
  { event: "Priority Application Deadline", date: "January 15, 2027" },
  { event: "Decision Notifications", date: "March 10, 2027" },
  { event: "Enrollment Deadline", date: "April 10, 2027" },
];

export const Route = createFileRoute("/admissions")({
  head: () => ({
    meta: [
      { title: "Admissions — King Solomon Comprehensive School" },
      {
        name: "description",
        content:
          "Learn how to apply to King Solomon Comprehensive School, schedule a visit, and join our  community.",
      },
      { property: "og:title", content: "Admissions — King Solomon Comprehensive School" },
      {
        property: "og:description",
        content:
          "Learn how to apply to King Solomon Comprehensive School, schedule a visit, and join our  community.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AdmissionsPage,
});

function AdmissionsPage() {
  return (
    <div>
      <section className="bg-navy text-primary-foreground">
        <div className="container-wide section-padding py-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold">Admissions</p>
          <h1 className="mt-4 font-display text-4xl font-bold md:text-5xl">
            <AnimatedLetters text="Begin your journey at King Solomon Comprehensive School" />
          </h1>
          <p className="mt-4 max-w-2xl text-primary-foreground/80">
            Submit an inquiry, download your confirmation, and track every stage of the process with
            your personal reference code. King Solomon Comprehensive School aligns admissions and
            placement with Kenya's Competency-Based Curriculum (CBC) expectations.
          </p>
          <Link
            to="/application-status"
            search={{ ref: "" }}
            className="mt-6 inline-flex rounded-md border border-primary-foreground/30 px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10"
          >
            Already inquired? Track your status
          </Link>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-wide section-padding">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl font-bold text-foreground">
              Welcome, future families
            </h2>
            <p className="mt-4 text-muted-foreground">
              Choosing a school is one of the most important decisions your family will make. Our
              admissions team is here to guide you every step of the way—from your first question to
              your first day on campus.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((item) => (
              <div
                key={item.step}
                className="relative rounded-xl border border-border bg-card p-6 shadow-sm"
              >
                <div className="font-display text-3xl font-bold text-gold">{item.step}</div>
                <h3 className="mt-4 font-display text-lg font-semibold text-card-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream">
        <div className="container-wide section-padding">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-gold">Key Dates</p>
              <h2 className="mt-3 font-display text-3xl font-bold text-foreground">
                2027-28 Admissions Timeline
              </h2>
              <div className="mt-8 space-y-4">
                {deadlines.map((deadline) => (
                  <div
                    key={deadline.event}
                    className="flex flex-col gap-1 border-b border-border pb-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <span className="font-medium text-card-foreground">{deadline.event}</span>
                    <span className="text-sm font-semibold text-navy sm:shrink-0">{deadline.date}</span>
                  </div>
                ))}
              </div>
            </div>
            <InquiryForm />
          </div>
        </div>
      </section>
    </div>
  );
}
