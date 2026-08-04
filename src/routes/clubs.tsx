import AnimatedLetters from "@/components/ui/AnimatedLetters";
import { createFileRoute } from "@tanstack/react-router";

function ClubIcon({ name, size = 20 }: { name: string; size?: number }) {
  const common = { width: size, height: size, className: "inline-block" };
  switch (name) {
    case "Debate Club":
      return (
        <svg {...common} viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path
            d="M5 6h10a2 2 0 012 2v5a2 2 0 01-2 2H9l-4 3V8a2 2 0 012-2z"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "Robotics Team":
      return (
        <svg {...common} viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <rect x="4" y="7" width="16" height="10" rx="2" strokeWidth="1.5" />
          <path d="M8 7V5h8v2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="8" cy="12" r="1.5" />
          <circle cx="16" cy="12" r="1.5" />
        </svg>
      );
    case "Model United Nations":
      return (
        <svg {...common} viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="8" strokeWidth="1.5" />
          <path d="M12 4a8 8 0 018 8" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M4 12a8 8 0 018 8" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "Art Collective":
      return (
        <svg {...common} viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path
            d="M5 19c2-6 4-9 7-9 2 0 4 2 7 8"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M8 10l3-5 4 4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "Jazz Ensemble":
      return (
        <svg {...common} viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path
            d="M8 18V5l10-2v13"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="5" cy="18" r="3" strokeWidth="1.5" />
          <circle cx="15" cy="16" r="3" strokeWidth="1.5" />
        </svg>
      );
    case "Community Service Corps":
      return (
        <svg {...common} viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path
            d="M8 11c0-2 2-3 4-3s4 1 4 3c0 2-2 3-4 3s-4 1-4 3"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M5 19h14" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "Environmental Club":
      return (
        <svg {...common} viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path
            d="M12 3c3 3 4 5 4 8a4 4 0 01-8 0c0-3 1-5 4-8z"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M12 13c2 0 4 1 4 3" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "Creative Writing Society":
      return (
        <svg {...common} viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path
            d="M6 18l8-8 2 2-8 8H6z"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M13 7l4-4 2 2-4 4"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "Science and Innovation Club":
      return (
        <svg {...common} viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M12 3v18" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M7 7l5 5 5-5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M7 17l5-5 5 5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default:
      return (
        <svg {...common} viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
        </svg>
      );
  }
}

const clubs = [
  {
    name: "Debate Club",
    category: "Academic",
    description:
      "Develop public speaking, research, and critical thinking skills through competitive debate.",
    meeting: "Tuesdays, 3:30 PM",
  },
  {
    name: "ICT Club",
    category: "computer",
    description: "Design, build, and program software for regional and state-level competitions.",
    meeting: "Mondays & Wednesdays, 3:45 PM",
    iconClass: "bg-gold/15 text-gold",
  },
  {
    name: "Science and Innovation Club",
    category: "STEM",
    description:
      "Explore experiments, engineering challenges, and creative problem-solving through hands-on innovation.",
    meeting: "Fridays, 3:30 PM",
    iconClass: "bg-crimson/10 text-crimson",
  },
  {
    name: "Model United Nations",
    category: "Leadership",
    description:
      "Explore global issues, diplomacy, and public policy through simulated UN conferences.",
    meeting: "Thursdays, 4:00 PM",
    iconClass: "bg-navy/10 text-navy",
  },
  {
    name: "Art Collective",
    category: "Arts",
    description:
      "A studio space for painters, illustrators, and mixed-media artists to create and exhibit work.",
    meeting: "Wednesdays, 3:30 PM",
    iconClass: "bg-crimson/10 text-crimson",
  },
  {
    name: "Brass Ensemble",
    category: "Music",
    description:
      "Rehearse and perform anthems, parades, and contemporary pieces at school and community events.",
    meeting: "Tuesdays & Fridays, 4:00 PM",
    iconClass: "bg-gold/20 text-navy",
  },
  {
    name: "Community Service Corps",
    category: "Service",
    description: "Partner with local organizations to serve neighbors and address community needs.",
    meeting: "Saturdays, 9:00 AM",
    iconClass: "bg-cream text-navy",
  },
  {
    name: "Environmental Club",
    category: "Service",
    description:
      "Lead sustainability initiatives, campus gardens, and conservation awareness campaigns.",
    meeting: "Mondays, 3:30 PM",
    iconClass: "bg-gold/15 text-navy",
  },
  {
    name: "Creative Writing Society",
    category: "Arts",
    description:
      "Workshop poetry, fiction, and nonfiction with peers and publish in the school literary magazine.",
    meeting: "Thursdays, 3:45 PM",
    iconClass: "bg-navy/10 text-navy",
  },
];

const categories = [...new Set(clubs.map((c) => c.category))];

export const Route = createFileRoute("/clubs")({
  head: () => ({
    meta: [
      { title: "Clubs — King Solomon Comprehensive School" },
      {
        name: "description",
        content:
          "Discover clubs, organizations, and extracurricular activities at King Solomon Comprehensive School.",
      },
      { property: "og:title", content: "Clubs — King Solomon Comprehensive School" },
      {
        property: "og:description",
        content:
          "Discover clubs, organizations, and extracurricular activities at King Solomon Comprehensive School.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ClubsPage,
});

function ClubsPage() {
  return (
    <div>
      <section className="bg-navy text-primary-foreground">
        <div className="container-wide section-padding py-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold">Clubs</p>
          <h1 className="mt-4 font-display text-4xl font-bold md:text-5xl">
            <AnimatedLetters text="Find your passion" />
          </h1>
        </div>
      </section>

      <section className="bg-cream">
        <div className="container-wide section-padding">
          <div className="mb-12 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-gold">
              Get Involved
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-foreground">
              Clubs & organizations
            </h2>
            <p className="mt-4 text-muted-foreground">
              From robotics to jazz, debate to environmental service, our clubs offer students space
              to explore interests, build skills, and form friendships.
            </p>
            <div className="mb-8 flex flex-wrap gap-2">
              <span className="rounded-full bg-navy px-4 py-1.5 text-xs font-semibold text-primary-foreground">
                All
              </span>
              {categories.map((category) => (
                <span
                  key={category}
                  className="rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold text-card-foreground"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {clubs.map((club) => (
              <div
                key={club.name}
                className="rounded-xl border border-border bg-card p-6 shadow-sm card-hover pop"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full p-2 ${club.iconClass ?? "bg-navy text-primary-foreground"}`}
                    >
                      <ClubIcon name={club.name} size={18} />
                    </div>
                    <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
                      {club.category}
                    </span>
                  </div>
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold text-card-foreground">
                  {club.name}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground">{club.description}</p>
                <div className="mt-4 flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <svg
                    className="h-4 w-4 text-gold"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {club.meeting}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
