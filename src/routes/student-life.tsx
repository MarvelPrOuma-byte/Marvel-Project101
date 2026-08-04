import AnimatedLetters from "@/components/ui/AnimatedLetters";
import { createFileRoute } from "@tanstack/react-router";
import studentLife from "../assets/student-life.jpg";

const activities = [
  {
    title: "Athletics",
    description:
      "Competitive and recreational sports teams that build fitness, teamwork, and resilience.",
    items: ["Soccer", "Basketball", "Track & Field", "Swimming", "Volleyball"],
  },
  {
    title: "Arts & Performance",
    description:
      "Visual arts, theater, music, and dance programs that celebrate creativity and expression.",
    items: ["Choir", "Drama", "Studio Art", "Brass Band", "Dance Ensemble"],
  },
  {
    title: "Service & Leadership",
    description:
      "Opportunities to lead, serve, and make a difference in the school and wider community.",
    items: ["Student Government", "Community Service", "Peer Mentoring"],
  },
];

export const Route = createFileRoute("/student-life")({
  head: () => ({
    meta: [
      { title: "Student Life — King Solomon Comprehensive School" },
      {
        name: "description",
        content:
          "Explore athletics, arts, clubs, and leadership opportunities that make student life at King Solomon Comprehensive School vibrant.",
      },
      { property: "og:title", content: "Student Life — King Solomon Comprehensive School" },
      {
        property: "og:description",
        content:
          "Explore athletics, arts, clubs, and leadership opportunities that make student life at King Solomon Comprehensive School vibrant.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: StudentLifePage,
});

function StudentLifePage() {
  return (
    <div>
      <section className="bg-navy text-primary-foreground">
        <div className="container-wide section-padding py-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold">Student Life</p>
          <h1 className="mt-4 font-display text-4xl font-bold md:text-5xl">
            <AnimatedLetters text="Grow beyond the classroom" />
          </h1>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-wide section-padding">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="overflow-hidden rounded-xl">
              <img
                src={studentLife}
                alt="Students presenting projects and artwork at a school fair"
                loading="lazy"
                className="h-full w-full object-cover"
                width={1200}
                height={800}
              />
            </div>
            <div className="space-y-6">
              <h2 className="font-display text-3xl font-bold text-foreground">
                A community where every student belongs
              </h2>
              <p className="text-muted-foreground">
                Student life at King Solomon Comprehensive School is shaped by tradition,
                creativity, and friendship. Whether on the stage, the field, or in a club meeting,
                students discover new interests, develop leadership, and form lasting memories.
              </p>
              <p className="text-muted-foreground">
                Our Dormitory system, chapel programs, and all-school gatherings create a rhythm of
                belonging and celebration throughout the year.
              </p>
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="text-center">
                  <div className="font-display text-2xl font-bold text-navy">10+</div>
                  <div className="text-sm text-muted-foreground">Clubs</div>
                </div>
                <div className="text-center">
                  <div className="font-display text-2xl font-bold text-navy">4</div>
                  <div className="text-sm text-muted-foreground">Sports teams</div>
                </div>
                <div className="text-center">
                  <div className="font-display text-2xl font-bold text-navy">6</div>
                  <div className="text-sm text-muted-foreground">Arts programs</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream">
        <div className="container-wide section-padding">
          <div className="mb-12 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-gold">Activities</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-foreground">
              Something for everyone
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {activities.map((activity) => (
              <div
                key={activity.title}
                className="rounded-xl border border-border bg-card p-6 shadow-sm"
              >
                <h3 className="font-display text-xl font-semibold text-card-foreground">
                  {activity.title}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground">{activity.description}</p>
                <ul className="mt-4 space-y-2">
                  {activity.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
