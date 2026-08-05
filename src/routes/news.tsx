import AnimatedLetters from "@/components/ui/AnimatedLetters";
import { newsStories } from "@/lib/news-content";
import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "News — King Solomon Comprehensive School" },
      {
        name: "description",
        content: "Read the latest news and announcements from King Solomon Comprehensive School.",
      },
      { property: "og:title", content: "News — King Solomon Comprehensive School" },
      {
        property: "og:description",
        content: "Read the latest news and announcements from King Solomon Comprehensive School.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: NewsPage,
});

function NewsPage() {
  return (
    <div>
      <section className="bg-navy text-primary-foreground">
        <div className="container-wide section-padding py-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold">News</p>
          <h1 className="mt-4 font-display text-4xl font-bold md:text-5xl">
            <AnimatedLetters text="Latest from KSCS" />
          </h1>
        </div>
      </section>

      <section className="bg-cream">
        <div className="container-wide section-padding">
          <div className="grid gap-8">
            {newsStories.map((item, index) => (
              <article
                key={item.title}
                className={`grid gap-6 rounded-xl border border-border bg-card p-6 shadow-sm md:grid-cols-12 ${
                  index === 0 ? "md:col-span-12" : ""
                }`}
              >
                <div className="md:col-span-4">
                  <Link to="/news/$slug" params={{ slug: item.slug }} className="block overflow-hidden rounded-lg">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-48 w-full object-cover transition-transform duration-300 hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                  </Link>
                </div>
                <div className="md:col-span-8">
                  <span className="inline-block rounded-full bg-navy px-3 py-1 text-xs font-semibold text-primary-foreground">
                    {item.category}
                  </span>
                  <p className="mt-2 text-sm text-muted-foreground">{item.date}</p>
                  <h2 className="mt-2 font-display text-xl font-semibold text-card-foreground md:text-2xl">
                    {item.title}
                  </h2>
                  <p className="mt-3 text-muted-foreground">{item.excerpt}</p>
                  <Link
                    to="/news/$slug"
                    params={{ slug: item.slug }}
                    className="mt-4 inline-flex text-sm font-semibold text-gold hover:underline"
                  >
                    Read full story
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}