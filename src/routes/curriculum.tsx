import React from "react";
import AnimatedLetters from "@/components/ui/AnimatedLetters";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/curriculum")({
  head: () => ({ meta: [{ title: "Curriculum — King Solomon Comprehensive School" }] }),
  component: CurriculumPage,
});

function CurriculumPage() {
  return (
    <div>
      <section className="bg-navy text-primary-foreground">
        <div className="container-wide section-padding py-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold">Curriculum</p>
          <h1 className="mt-4 font-display text-4xl font-bold md:text-5xl">
            <AnimatedLetters text="Competency-Based Learning (Kenya CBC-aligned)" />
          </h1>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-wide section-padding">
          <div className="max-w-3xl">
            <h2 className="font-display text-3xl font-bold pop">Our approach</h2>
            <p className="mt-4 text-muted-foreground">
              King Solomon Comprehensive School aligns its teaching and assessment with Kenya's
              Competency-Based Curriculum (CBC). We focus on developing core competencies —
              knowledge, skills, attitudes and values — that prepare learners for life, work and
              continued learning.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              <li>
                <strong>Learner-centered:</strong> instruction adapts to students' needs and
                emphasizes active demonstration of learning.
              </li>
              <li>
                <strong>Competency focus:</strong> students show mastery through practical tasks,
                projects, and portfolios instead of only exams.
              </li>
              <li>
                <strong>Integrated skills:</strong> literacy, numeracy, critical thinking,
                creativity, digital literacy and socio-emotional skills are embedded across
                subjects.
              </li>
              <li>
                <strong>Formative assessment:</strong> ongoing feedback, performance-based tasks,
                and learning portfolios guide progress.
              </li>
            </ul>

            <div className="mt-8 rounded-lg border border-border bg-card p-6 shadow-sm card-hover">
              <p className="text-sm">
                For a detailed syllabus and official resources, visit the Kenya Institute of
                Curriculum Development and the Kenya National Examinations Council.
              </p>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  className="link-underline"
                  href="https://kicd.ac.ke/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Kenya Institute of Curriculum Development
                </a>
                <a
                  className="link-underline"
                  href="https://www.knec-portal.ac.ke/"
                  target="_blank"
                  rel="noreferrer"
                >
                  KNEC
                </a>
                <Link to="/admissions" className="link-underline">
                  Admissions & entry requirements
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CurriculumPage;
