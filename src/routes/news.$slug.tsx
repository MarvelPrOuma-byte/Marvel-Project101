import { createFileRoute, Link } from "@tanstack/react-router";

import AnimatedLetters from "@/components/ui/AnimatedLetters";
import { getNewsStory } from "@/lib/news-content";

export const Route = createFileRoute("/news/$slug")({
  loader: async ({ params }) => {
    const story = getNewsStory(params.slug);
    if (!story) {
      throw new Error("Story not found");
    }
    return { story };
  },
  notFoundComponent: () => (
    <div className="container-wide section-padding py-20">
      <p className="text-sm font-semibold uppercase tracking-widest text-gold">News</p>
      <h1 className="mt-4 font-display text-4xl font-bold">Story not found</h1>
      <p className="mt-3 max-w-xl text-muted-foreground">
        The news story you are looking for is not available right now.
      </p>
      <Link
        to="/news"
        className="mt-6 inline-flex rounded-md bg-navy px-4 py-2 text-sm font-semibold text-primary-foreground"
      >
        Back to news
      </Link>
    </div>
  ),
  component: NewsStoryPage,
});

function NewsStoryPage() {
  const { story } = Route.useLoaderData();

  return (
    <div>
      <section className="bg-navy text-primary-foreground">
        <div className="container-wide section-padding py-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold">
            {story.category}
          </p>
          <h1 className="mt-4 max-w-4xl font-display text-4xl font-bold md:text-5xl">
            <AnimatedLetters text={story.title} />
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-primary-foreground/75">
            <span>{story.date}</span>
          </div>
        </div>
      </section>

      <section className="bg-cream">
        <div className="container-wide section-padding">
          <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-8 shadow-sm">
            <p className="text-lg leading-8 text-foreground">{story.excerpt}</p>
            <div className="mt-8 space-y-6 text-base leading-8 text-muted-foreground">
              {story.content.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <Link
              to="/news"
              className="mt-8 inline-flex rounded-md bg-navy px-4 py-2 text-sm font-semibold text-primary-foreground"
            >
              ← Back to all news
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
