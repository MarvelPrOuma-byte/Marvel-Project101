import AnimatedLetters from "@/components/ui/AnimatedLetters";
import { createFileRoute } from "@tanstack/react-router";
import aboutStudents from "../assets/about-students.jpg";

const values = [
  {
    title: "Wisdom",
    description:
      "We believe education is more than knowledge. It is the discernment to use knowledge well.",
    icon: "✦",
  },
  {
    title: "Integrity",
    description:
      "Character is built through honesty, responsibility, and respect for oneself and others.",
    icon: "☼",
  },
  {
    title: "Excellence",
    description:
      "We pursue high standards in academics, arts, athletics, and service to our community.",
    icon: "✧",
  },
  {
    title: "Community",
    description: "A diverse, supportive community helps every student belong, grow, and lead.",
    icon: "✿",
  },
];

const leadership = [
  {
    name: "Mr. Franc Oyugi",
    role: "Director",
    focus: "Strategic leadership, school culture, and academic vision",
    icon: "spark",
    initials: "FO",
    preview: "Student-centered vision and school culture",
  },
  {
    name: "Mr. Evans Oyugi",
    role: "Director",
    focus: "Curriculum innovation, teaching excellence, and student growth",
    icon: "book",
    initials: "EO",
    preview: "Learning design with measurable outcomes",
  },
  {
    name: "Mr.Ford Wycliffe",
    role: "Head Teacher",
    focus: "Character education, wellbeing, and student support",
    icon: "heart",
    initials: "FW",
    preview: "Care, guidance, and student wellbeing",
  },
  {
    name: "Mr. Elijah Ogomah",
    role: "Deputy HeadTeacher",
    focus: "Enrollment experience, family engagement, and community outreach",
    icon: "compass",
    initials: "EO",
    preview: "Warm family engagement and community connection",
  },
  {
    name: "Mr. Nicholas Omondi",
    role: "Deputy HeadTeacher",
    focus: "Clubs, arts, athletics, and enriching co-curricular experiences",
    icon: "star",
    initials: "NO",
    preview: "A vibrant school experience beyond the classroom",
  },
  {
    name: "Mr. Omoja Joseph",
    role: "Senior Teacher & Boarding Master",
    focus: "School planning, operations, and long-term sustainability",
    icon: "shield",
    initials: "OJ",
    preview: "Reliable systems that support growth",
  },
];

const studentLeaders = [
  {
    name: "Shaine Valentine",
    role: "Student Council President",
    focus: "Student voice, school events, and community engagement",
    icon: "spark",
    initials: "SV",
    preview: "Leading student voices with confidence",
  },
  {
    name: "Gift Mitchelle",
    role: "Deputy School President",
    focus: "Leadership, discipline, and student mentorship",
    icon: "shield",
    initials: "GM",
    preview: "Mentoring peers and modelling responsibility",
  },
  {
    name: "Rawlins Roche",
    role: "Club Captain",
    focus: "Cultural programs, exhibitions, and creative growth",
    icon: "star",
    initials: "RR",
    preview: "Creative expression and school pride",
  },
  {
    name: "Zipporah Akinyi",
    role: "Sports Captain",
    focus: "Athletic spirit, teamwork, and school pride",
    icon: "compass",
    initials: "ZA",
    preview: "Energy, discipline, and team spirit",
  },
];

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — King Solomon Comprehensive School" },
      {
        name: "description",
        content:
          "Learn about King Solomon Comprehensive School's mission, history, values, and the community that shapes our students.",
      },
      { property: "og:title", content: "About — King Solomon Comprehensive School" },
      {
        property: "og:description",
        content:
          "Learn about King Solomon Comprehensive School's mission, history, values, and the community that shapes our students.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

function LeaderIcon({ type }: { type: string }) {
  const common = "h-5 w-5";

  switch (type) {
    case "book":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className={common}
        >
          <path d="M5 5.5A2.5 2.5 0 0 1 7.5 3H19v15H7.5A2.5 2.5 0 0 0 5 20.5v-15Z" />
          <path d="M8.5 7h7" />
          <path d="M8.5 11h7" />
        </svg>
      );
    case "heart":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className={common}
        >
          <path d="M12 20s-6.5-4.2-8.1-8.2a4.7 4.7 0 0 1 8.1-3.3 4.7 4.7 0 0 1 8.1 3.3C18.5 15.8 12 20 12 20Z" />
        </svg>
      );
    case "compass":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className={common}
        >
          <circle cx="12" cy="12" r="8" />
          <path d="m13.5 10.5 3-3-3 3Zm-3 3 3 3-3-3Zm0 0 4.5-4.5" />
        </svg>
      );
    case "star":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className={common}
        >
          <path d="m12 3 2.4 5.2 5.6.7-4.2 3.8 1.2 5.5L12 15.6l-5 4.6 1.2-5.5L3.9 9l5.6-.7L12 3Z" />
        </svg>
      );
    case "shield":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className={common}
        >
          <path d="M12 3 5 6v5c0 4.4 2.8 8.1 7 10 4.2-1.9 7-5.6 7-10V6l-7-3Z" />
        </svg>
      );
    default:
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className={common}
        >
          <path d="M12 3 14.4 8.5 20 9.2l-4.2 3.8 1.2 5.5L12 15.6l-5 4.6 1.2-5.5L4 9.2l5.6-.7L12 3Z" />
        </svg>
      );
  }
}

function AboutPage() {
  return (
    <div>
      <section className="bg-navy text-primary-foreground">
        <div className="container-wide section-padding py-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold">About Us</p>
          <h1 className="mt-4 font-display text-4xl font-bold md:text-5xl pop">
            <AnimatedLetters text="A legacy of learning and character" />
          </h1>
          <p className="mt-4 max-w-2xl text-primary-foreground/80">
            King Solomon Comprehensive School follows the principles of Kenya's Competency-Based
            Education (CBE), focusing on skills, values and applied learning alongside strong
            academics.
          </p>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-wide section-padding">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="overflow-hidden rounded-xl">
              <img
                src={aboutStudents}
                alt="Students and teacher discussing around a classroom table"
                loading="lazy"
                className="h-full w-full object-cover"
                width={1200}
                height={800}
              />
            </div>
            <div className="space-y-6">
              <h2 className="font-display text-3xl font-bold text-foreground">
                Founded on purpose. Built for tomorrow.
              </h2>
              <p className="text-muted-foreground">
                King Solomon Comprehensive School was founded in 2007 by the late Dr. Solomon Oyugi
                with a simple belief: every child deserves an education that develops the mind,
                strengthens character, and nurtures a life of purpose. What began as a small
                community school has grown into a vibrant comprehensive serving families from across
                the region.
              </p>
              <p className="text-muted-foreground">
                Our alumni are known not only for their academic readiness but for their leadership,
                empathy, and commitment to serving others. They leave the school prepared to thrive
                in High school, career, and life.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div>
                  <div className="font-display text-2xl font-bold text-navy">19</div>
                  <div className="text-sm text-muted-foreground">Years of excellence</div>
                </div>
                <div>
                  <div className="font-display text-2xl font-bold text-navy">50+</div>
                  <div className="text-sm text-muted-foreground">Regions represented</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream">
        <div className="container-wide section-padding">
          <div className="mb-12 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-gold">Our Values</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-foreground">
              What we stand for
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div
                key={value.title}
                className="relative overflow-hidden rounded-xl border border-border bg-card p-6 shadow-sm card-hover"
              >
                <div className="absolute -right-3 -top-3 flex h-12 w-12 items-center justify-center rounded-full bg-gold/15 text-xl text-gold floating-item">
                  <span aria-hidden="true">{value.icon}</span>
                </div>
                <h3 className="font-display text-xl font-semibold text-card-foreground">
                  {value.title}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-wide section-padding">
          <div className="relative overflow-hidden rounded-[2rem] border border-gold/20 bg-navy p-8 text-primary-foreground shadow-[0_30px_80px_rgba(15,23,42,0.18)] md:p-12">
            <div className="absolute -left-6 top-6 h-20 w-20 rounded-full bg-gold/20 blur-2xl" />
            <div className="absolute bottom-4 right-6 h-24 w-24 rounded-full bg-crimson/20 blur-2xl" />
            <div className="relative space-y-10">
              <div className="grid gap-10 lg:grid-cols-[1.1fr_1.4fr] lg:items-start">
                <div className="max-w-xl">
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gold">
                    Leadership
                  </p>
                  <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
                    Meet our leadership
                  </h2>
                  <p className="mt-4 text-base text-primary-foreground/80">
                    Our administrative team brings decades of experience in education, child
                    development, and community building. They are united by a shared commitment to
                    student flourishing.
                  </p>
                  <div className="mt-6 inline-flex items-center rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-2 text-sm font-medium text-primary-foreground/90">
                    Guided by purpose • Committed to excellence
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {leadership.map((person, index) => (
                    <div
                      key={person.name}
                      className={`group relative overflow-hidden rounded-2xl border border-primary-foreground/10 bg-primary-foreground/10 p-5 transition-all duration-300 hover:-translate-y-2 hover:bg-primary-foreground/15 hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)] ${index % 2 === 1 ? "sm:translate-y-4" : ""}`}
                    >
                      <div className="absolute -right-3 -top-3 flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 bg-gold/20 text-gold floating-item">
                        <LeaderIcon type={person.icon} />
                      </div>
                      <div className="font-display text-lg font-semibold">{person.name}</div>
                      <div className="mt-1 text-sm font-medium text-gold">{person.role}</div>
                      <p className="mt-3 text-sm leading-6 text-primary-foreground/70">
                        {person.focus}
                      </p>
                      <div className="mt-4 rounded-xl border border-white/10 bg-gradient-to-br from-white/15 via-white/10 to-transparent p-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                        <div className="flex items-center gap-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-gold via-crimson to-gold text-sm font-semibold text-white">
                            {person.initials}
                          </div>
                          <div>
                            <p className="text-[10px] uppercase tracking-[0.3em] text-gold">
                              Profile preview
                            </p>
                            <p className="text-sm text-primary-foreground/80">{person.preview}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[1.5rem] border border-primary-foreground/10 bg-primary-foreground/10 p-6 md:p-8">
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gold">
                      Student Leaders
                    </p>
                    <h3 className="mt-2 font-display text-2xl font-semibold">
                      Young voices shaping campus life
                    </h3>
                  </div>
                  <p className="max-w-xl text-sm text-primary-foreground/70">
                    Our student leaders model responsibility, collaboration, and service while
                    helping the school community thrive each day.
                  </p>
                </div>
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {studentLeaders.map((person, index) => (
                    <div
                      key={person.name}
                      className={`group relative overflow-hidden rounded-2xl border border-primary-foreground/10 bg-background/10 p-5 transition-all duration-300 hover:-translate-y-2 hover:bg-background/15 ${index % 2 === 1 ? "md:translate-y-4" : ""}`}
                    >
                      <div className="absolute -right-3 -top-3 flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 bg-gold/20 text-gold floating-item">
                        <LeaderIcon type={person.icon} />
                      </div>
                      <div className="font-display text-lg font-semibold">{person.name}</div>
                      <div className="mt-1 text-sm font-medium text-gold">{person.role}</div>
                      <p className="mt-3 text-sm leading-6 text-primary-foreground/70">
                        {person.focus}
                      </p>
                      <div className="mt-4 rounded-xl border border-white/10 bg-gradient-to-br from-white/15 via-white/10 to-transparent p-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                        <div className="flex items-center gap-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-gold via-crimson to-gold text-sm font-semibold text-white">
                            {person.initials}
                          </div>
                          <div>
                            <p className="text-[10px] uppercase tracking-[0.3em] text-gold">
                              Profile preview
                            </p>
                            <p className="text-sm text-primary-foreground/80">{person.preview}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
