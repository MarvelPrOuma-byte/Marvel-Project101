import AnimatedLetters from "@/components/ui/AnimatedLetters";
import { Link, createFileRoute } from "@tanstack/react-router";

const testimonials = [
  {
    quote:
      "The school has a beautiful balance of academic rigor and warm character development. Our daughter feels seen, challenged, and inspired every day.",
    name: "Celine Kagumba",
    role: "Parent of Grade 3 student",
  },
  {
    quote:
      "From Science to leadership opportunities, my son has grown in confidence and purpose. The community feels both ambitious and caring.",
    name: "Dorothy Ndege",
    role: "Parent of Grade 9 student",
  },
  {
    quote:
      "I love how the teachers encouraged curiosity while also helping my son become responsible, kind young leader.",
    name: "William Ouma",
    role: "Parent of Alumnus",
  },
  {
    quote: "KSCS is a family that has enabled me to thrive and to grow as a responsible citizen.",
    name: "Marvel Ouma",
    role: "Alumnus",
  },
];

const highlights = [
  "Warm and attentive teaching staff",
  "Strong academic and co-curricular balance",
  "A thriving community of families and learners",
];

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: "Testimonials — King Solomon Comprehensive School" },
      {
        name: "description",
        content:
          "Hear from families who have experienced the King Solomon Comprehensive School community firsthand.",
      },
      { property: "og:title", content: "Testimonials — King Solomon Comprehensive School" },
      {
        property: "og:description",
        content:
          "Hear from families who have experienced the King Solomon Comprehensive School community firsthand.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TestimonialsPage,
});

function TestimonialsPage() {
  return (
    <div>
      <section className="bg-navy text-primary-foreground">
        <div className="container-wide section-padding py-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold">Testimonials</p>
          <h1 className="mt-4 font-display text-4xl font-bold md:text-5xl">
            <AnimatedLetters text="Families share what makes our school special" />
          </h1>
          <p className="mt-4 max-w-2xl text-primary-foreground/80">
            Voices from our community reflect the care, excellence, and spirit that shape life at
            King Solomon Comprehensive School.
          </p>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-wide section-padding">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <div className="rounded-[2rem] border border-border bg-card p-8 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gold">
                Why parents choose us
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold text-foreground">
                A school that feels both ambitious and deeply personal
              </h2>
              <p className="mt-4 text-muted-foreground">
                Families often tell us they value the balance between excellence and belonging. Our
                community is known for strong values, thoughtful teaching, and opportunities for
                students to lead with confidence.
              </p>
              <div className="mt-6 space-y-3">
                {highlights.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-xl border border-border/70 bg-background/70 px-4 py-3 text-sm text-foreground"
                  >
                    <span className="h-2.5 w-2.5 rounded-full bg-gold" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-6">
              {testimonials.map((testimonial, index) => (
                <article
                  key={testimonial.name}
                  className={`rounded-[1.5rem] border border-border bg-cream p-6 shadow-sm transition-transform duration-300 hover:-translate-y-1 ${index % 2 === 1 ? "lg:translate-y-4" : ""}`}
                >
                  <div className="text-4xl text-gold">“</div>
                  <p className="mt-2 text-base leading-7 text-foreground">{testimonial.quote}</p>
                  <div className="mt-6">
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream">
        <div className="container-wide section-padding">
          <div className="rounded-[2rem] border border-gold/20 bg-navy p-8 text-primary-foreground shadow-[0_24px_70px_rgba(15,23,42,0.16)] md:p-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-xl">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gold">
                  Visit and experience it for yourself
                </p>
                <h2 className="mt-2 font-display text-3xl font-bold">
                  See why families keep choosing our school
                </h2>
              </div>
              <Link
                to="/admissions"
                className="inline-flex items-center justify-center rounded-full bg-gold px-5 py-3 text-sm font-semibold text-navy transition-transform duration-200 hover:-translate-y-0.5"
              >
                Schedule a visit
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
