import AnimatedLetters from "@/components/ui/AnimatedLetters";
import { createFileRoute, Link } from "@tanstack/react-router";
import academicsLibrary from "../assets/academics-library.jpg";

const programs = [
  {
    title: "Early Year Education",
    grades: "Kindergarten – PP2",
    description:
      "A joyful, nurturing foundation in literacy, numeracy, science, and the arts, with emphasis on curiosity and character.",
  },
  {
    title: "Primary Education",
    grades: "Grade 1 – Grade 6",
    description:
      "An inquiry-based program that builds critical thinking, independence, and responsibility during the formative early-teen years.",
  },
  {
    title: "Junior School",
    grades: "Grade 7 – Grade 9",
    description:
      "A senior school-preparatory curriculum with projects, AP, and independent-study opportunities across the Arts & Sports Science, STEM, and Social Science.",
  },
];

const departments = [
  "English & Literature",
  "Mathematics",
  "Integrated Science",
  "Social Studies",
  "Agriculture",
  "Kiswahili",
  "Arts & Sports",
  "Pre-Technical studies",
  "CRE",
];

export const Route = createFileRoute("/academics")({
  head: () => ({
    meta: [
      { title: "Academics — King Solomon Comprehensive School" },
      {
        name: "description",
        content:
          "Discover King Solomon Comprehensive School's  academic programs, departments, and commitment to student excellence.",
      },
      { property: "og:title", content: "Academics — King Solomon Comprehensive School" },
      {
        property: "og:description",
        content:
          "Discover King Solomon Comprehensive School's  academic programs, departments, and commitment to student excellence.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AcademicsPage,
});

function AcademicsPage() {
  return (
    <div>
      <section className="bg-navy text-primary-foreground">
        <div className="container-wide section-padding py-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold">Academics</p>
          <h1 className="mt-4 font-display text-4xl font-bold md:text-5xl pop">
            <AnimatedLetters text="Rigorous, joyful, and purposeful learning" />
          </h1>
          <p className="mt-4 max-w-2xl text-primary-foreground/80">
            King Solomon Comprehensive School implements teaching practices aligned with Kenya's
            Competency-Based Curriculum (CBC). Learn more on our{" "}
            <Link to="/curriculum" className="link-underline">
              Curriculum
            </Link>{" "}
            page.
          </p>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-wide section-padding">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6">
              <h2 className="font-display text-3xl font-bold text-foreground">
                A curriculum designed for depth and discovery
              </h2>
              <p className="text-muted-foreground">
                At King Solomon Comprehensive School, we believe that the best education challenges
                students to think deeply, ask questions, and connect ideas across disciplines. From
                the earliest grades through graduation, our students build the intellectual habits
                and skills they need for a lifetime of learning.
              </p>
              <p className="text-muted-foreground">
                Our teachers are passionate subject experts who know their students well. Small
                classes allow for personalized attention, rich discussion, and meaningful feedback.
              </p>
              <ul className="grid grid-cols-2 gap-3 pt-2">
                {departments.slice(0, 4).map((dept) => (
                  <li key={dept} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                    {dept}
                  </li>
                ))}
              </ul>
            </div>
            <div className="overflow-hidden rounded-xl">
              <img
                src={academicsLibrary}
                alt="Students reading and studying in the King Solomon Comprehensive School library"
                loading="lazy"
                className="h-full w-full object-cover"
                width={1200}
                height={800}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream">
        <div className="container-wide section-padding">
          <div className="mb-12 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-gold">Programs</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-foreground">
              Learning at every stage
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {programs.map((program) => (
              <div
                key={program.title}
                className="rounded-xl border border-border bg-card p-6 shadow-sm card-hover"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-gold">
                  {program.grades}
                </p>
                <h3 className="mt-2 font-display text-xl font-semibold text-card-foreground">
                  {program.title}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground">{program.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-wide section-padding">
          <div className="mb-12 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-gold">Departments</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-foreground">Areas of study</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {departments.map((dept) => (
              <div
                key={dept}
                className="flex items-center gap-3 rounded-lg border border-border bg-card p-4 shadow-sm card-hover"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy text-xs font-bold text-primary-foreground">
                  {dept.charAt(0)}
                </span>
                <span className="text-sm font-medium text-card-foreground">{dept}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
