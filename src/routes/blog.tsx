import AnimatedLetters from "@/components/ui/AnimatedLetters";
import { blogPosts } from "@/lib/blog-content";
import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — King Solomon Comprehensive School" },
      {
        name: "description",
        content:
          "Perspectives on education, student life, and the King Solomon Comprehensive School community.",
      },
      { property: "og:title", content: "Blog — King Solomon Comprehensive School" },
      {
        property: "og:description",
        content:
          "Perspectives on education, student life, and the King Solomon Comprehensive School community.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BlogPage,
});

function BlogPage() {
  return (
    <div>
      <section className="bg-navy text-primary-foreground">
        <div className="container-wide section-padding py-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold">Blog</p>
          <h1 className="mt-4 font-display text-4xl font-bold md:text-5xl">
            <AnimatedLetters text="Perspectives from our school community" />
          </h1>
        </div>
      </section>

      <section className="bg-cream">
        <div className="container-wide section-padding">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <article
                key={post.slug}
                className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex aspect-[3/2] items-center justify-center bg-navy">
                  <span className="font-display text-4xl font-bold text-gold/80">School</span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gold">
                    {post.category}
                  </span>
                  <h2 className="mt-2 font-display text-lg font-semibold text-card-foreground group-hover:text-navy">
                    {post.title}
                  </h2>
                  <p className="mt-3 flex-1 text-sm text-muted-foreground">{post.excerpt}</p>
                  <div className="mt-4 border-t border-border pt-4">
                    <p className="text-xs font-medium text-muted-foreground">{post.author}</p>
                    <time
                      dateTime={new Date(post.date).toISOString()}
                      className="text-xs text-muted-foreground"
                    >
                      {post.date}
                    </time>
                    <Link
                      to="/blog/$slug"
                      params={{ slug: post.slug }}
                      className="mt-4 inline-flex text-sm font-semibold text-navy hover:text-crimson"
                    >
                      Read more →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
