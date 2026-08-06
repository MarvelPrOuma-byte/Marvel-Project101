import React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import AnimatedStat from "@/components/ui/AnimatedStat";
import AnimatedLetters from "@/components/ui/AnimatedLetters";
import heroCampus from "../assets/hero-campus.jpg";

const facilitator = {
  name: "Mr. Ford Wycliffe",
  title: "Head Teacher",
  message:
    "Welcome to King Solomon Comprehensive School. Here, every student is seen, every curiosity is nurtured, and every family becomes part of our learning community.",
  focus:
    "Our work begins with strong relationships, thoughtful teaching, and a joyful culture where students discover their purpose.",
};

const interactiveCards = [
  {
    title: "Learning with Purpose",
    description:
      "Every child learns through real-world projects, reflection, and guided discovery.",
    action: "See our approach",
    to: "/academics",
  },
  {
    title: "Character & Community",
    description: "We support students to grow as citizens, collaborators, and changemakers.",
    action: "Learn more",
    to: "/about",
  },
  {
    title: "Family Partnership",
    description: "Families are active partners in learning, events, and school life.",
    action: "Connect with us",
    to: "/contacts",
  },
];

const stats = [
  { value: "900+", label: "Students" },
  { value: "95%", label: "Guaranteed Admission" },
  { value: "10+", label: "Clubs & Teams" },
  { value: "1:30", label: "Student-Teacher Ratio" },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "King Solomon Comprehensive School | Homa Bay, Kenya" },
      {
        name: "description",
        content:
          "King Solomon Comprehensive School in Homa Bay, Kenya — quality education from kindergarten through grade 9. Explore academics, student life, admissions, and the community that prepares students to lead with wisdom and purpose.",
      },
      {
        property: "og:title",
        content: "King Solomon Comprehensive School — Homa Bay, Kenya",
      },
      {
        property: "og:description",
        content:
          "King Solomon Comprehensive School in Homa Bay, Kenya — quality education from kindergarten through grade 9. Explore academics, student life, admissions, and the community that prepares students to lead with wisdom and purpose.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://kingsolomoncomprehensive.co.ke" },
      { property: "og:image", content: "https://kingsolomoncomprehensive.co.ke/favicon.png" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  React.useEffect(() => {
    document.body.classList.add("has-hero-image");
    return () => document.body.classList.remove("has-hero-image");
  }, []);
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy text-primary-foreground">
        <div className="absolute inset-0">
          <img
            src={heroCampus}
            alt="King Solomon Comprehensive School campus in golden afternoon light"
            className="h-full w-full object-cover opacity-40"
            width={1440}
            height={912}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-transparent" />
        </div>
        <div className="container-wide relative section-padding flex min-h-[60vh] flex-col justify-center py-24">
          <div className="max-w-2xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-gold">
              Est. 2007
            </p>
            <h1 className="font-display text-4xl font-bold text-balance md:text-6xl">
              King Solomon Comprehensive School
            </h1>
            <p className="mt-3 text-sm uppercase tracking-[0.3em] text-gold">Knowledge is Power</p>
            <p className="mt-6 text-lg text-primary-foreground/90 md:text-xl">
              King Solomon Comprehensive School prepares students from kindergarten through grade 9
              to lead with wisdom, integrity, and purpose.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/admissions"
                className="inline-flex items-center justify-center rounded-md bg-gold px-6 py-3 text-sm font-semibold text-navy-dark shadow-sm transition-colors hover:bg-gold-light"
              >
                Apply Now
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center rounded-md border border-primary-foreground/30 bg-transparent px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10"
              >
                Discover our school
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-border bg-background">
        <div className="container-wide grid grid-cols-2 gap-6 py-12 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-3xl font-bold text-navy md:text-4xl">
                <AnimatedStat value={stat.value} />
              </div>
              <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Facilitator Welcome */}
      <section className="bg-cream">
        <div className="container-wide section-padding">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-6">
              <p className="text-sm font-semibold uppercase tracking-widest text-gold">Welcome</p>
              <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
                A message from our Head Teacher
              </h2>
              <p className="text-lg text-muted-foreground/90">{facilitator.message}</p>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gold">
                    Our focus
                  </p>
                  <p className="mt-3 text-sm text-muted-foreground">{facilitator.focus}</p>
                </div>
                <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gold">
                    Meet Mr. Ford Wycliffe
                  </p>
                  <p className="mt-3 text-sm text-muted-foreground">
                    Mr. Ford Wycliffe leads our teaching team with warmth, high expectations, and a
                    belief that every child can thrive.
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-[2rem] border border-border bg-navy p-8 text-primary-foreground shadow-[0_30px_80px_rgba(15,23,42,0.18)]">
              <div className="flex flex-col items-start gap-6">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gold/20 text-3xl text-gold">
                  E
                </div>
                <div className="space-y-4">
                  <div className="rounded-3xl bg-background/90 p-5">
                    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gold">
                      Live class preview
                    </p>
                    <p className="mt-3 text-sm leading-6 text-primary-foreground/85">
                      Join a live demonstration of how our lessons blend inquiry, collaboration, and
                      real-world thinking.
                    </p>
                  </div>
                  <div className="rounded-3xl bg-background/90 p-5">
                    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gold">
                      Student spotlight
                    </p>
                    <p className="mt-3 text-sm leading-6 text-primary-foreground/85">
                      Hear from students who are leading clubs, projects, and service initiatives
                      across the school.
                    </p>
                  </div>
                </div>
                <Link
                  to="/contacts"
                  className="inline-flex items-center justify-center rounded-full bg-gold px-6 py-3 text-sm font-semibold text-navy-dark transition-colors hover:bg-gold-light"
                >
                  Meet our team
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Highlights */}
      <section className="bg-background">
        <div className="container-wide section-padding">
          <div className="mb-12 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-gold">Interactive</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-foreground md:text-4xl">
              Explore what makes our school come alive
            </h2>
            <p className="mt-4 text-muted-foreground">
              Take a closer look at our approach, the student experience, and how families connect
              with the school.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {interactiveCards.map((card) => (
              <Link
                key={card.title}
                to={card.to}
                className="group rounded-[2rem] border border-border bg-card p-6 shadow-sm transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg"
              >
                <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-gold">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground">{card.description}</p>
                <span className="mt-4 inline-flex items-center text-sm font-semibold text-gold">
                  {card.action}
                  <svg
                    className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy text-primary-foreground">
        <div className="container-wide section-padding text-center">
          <h2 className="font-display text-3xl font-bold md:text-4xl">
            Ready to visit our School?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-primary-foreground/80">
            Schedule a tour to experience our classrooms, meet our faculty, and see what makes King
            Solomon Comprehensive School special.
          </p>
          <Link
            to="/contacts"
            className="mt-8 inline-flex items-center justify-center rounded-md bg-gold px-6 py-3 text-sm font-semibold text-navy-dark transition-colors hover:bg-gold-light"
          >
            Schedule a Visit
          </Link>
        </div>
      </section>
    </div>
  );
}

function GridIcon({ name }: { name: string }): React.ReactNode {
  const icons: Record<string, React.ReactNode> = {
    door: (
      <svg className="h-12 w-12 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
        />
      </svg>
    ),
    news: (
      <svg className="h-12 w-12 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
        />
      </svg>
    ),
    club: (
      <svg className="h-12 w-12 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
  };
  return icons[name] || null;
}
