import { createFileRoute, Link } from "@tanstack/react-router";

import AnimatedLetters from "@/components/ui/AnimatedLetters";
import { blogPosts, getBlogPost } from "@/lib/blog-content";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const post = getBlogPost(params.slug);
    if (!post) {
      throw new Error("Post not found");
    }
    return { post };
  },
  head: ({ loaderData }) => {
    const post = loaderData?.post;
    if (!post) return {};

    const canonicalUrl = `https://kingsolomoncomprehensive.co.ke/blog/${post.slug}`;
    const datePublished = new Date(post.date).toISOString();

    return {
      meta: [
        { title: `${post.title} — King Solomon Comprehensive School` },
        { name: "description", content: post.excerpt },
        { name: "author", content: post.author },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.excerpt },
        { property: "og:type", content: "article" },
        { property: "og:url", content: canonicalUrl },
        { property: "og:site_name", content: "King Solomon Comprehensive School" },
        { property: "article:published_time", content: datePublished },
        { property: "article:author", content: post.author },
        { property: "article:section", content: post.category },
        { name: "twitter:card", content: "summary" },
        { name: "twitter:title", content: post.title },
        { name: "twitter:description", content: post.excerpt },
      ],
      links: [{ rel: "canonical", href: canonicalUrl }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt,
            author: { "@type": "Person", name: post.author },
            datePublished,
            articleSection: post.category,
            mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
            publisher: {
              "@type": "Organization",
              name: "King Solomon Comprehensive School",
              url: "https://kingsolomoncomprehensive.co.ke",
            },
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="container-wide section-padding py-20">
      <p className="text-sm font-semibold uppercase tracking-widest text-gold">Blog</p>
      <h1 className="mt-4 font-display text-4xl font-bold">Article not found</h1>
      <p className="mt-3 max-w-xl text-muted-foreground">
        The blog post you are looking for does not exist or has moved.
      </p>
      <Link
        to="/blog"
        className="mt-6 inline-flex rounded-md bg-navy px-4 py-2 text-sm font-semibold text-primary-foreground"
      >
        Back to blog
      </Link>
    </div>
  ),
  component: BlogPostPage,
});

function BlogPostPage() {
  const { post } = Route.useLoaderData();
  const currentIndex = blogPosts.findIndex((item) => item.slug === post.slug);
  const previousPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost =
    currentIndex >= 0 && currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

  return (
    <div>
      <section className="bg-navy text-primary-foreground">
        <div className="container-wide section-padding py-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold">
            {post.category}
          </p>
          <h1 className="mt-4 max-w-4xl font-display text-4xl font-bold md:text-5xl">
            <AnimatedLetters text={post.title} />
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-primary-foreground/75">
            <span>{post.author}</span>
            <span>•</span>
            <time dateTime={new Date(post.date).toISOString()}>{post.date}</time>
          </div>
        </div>
      </section>

      <section className="bg-cream">
        <div className="container-wide section-padding">
          <div className="mx-auto max-w-4xl rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8 lg:p-10">
            <p className="text-xl leading-9 text-foreground md:text-2xl md:leading-10">
              {post.excerpt}
            </p>
            <div className="mt-8 space-y-7 text-lg leading-9 text-muted-foreground md:text-xl md:leading-10">
              {post.content.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <Link
                to="/blog"
                className="inline-flex rounded-md bg-navy px-4 py-2 text-sm font-semibold text-primary-foreground"
              >
                ← Back to all posts
              </Link>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {previousPost ? (
                <Link
                  to="/blog/$slug"
                  params={{ slug: previousPost.slug }}
                  className="group rounded-2xl border border-border bg-background p-5 text-left transition-colors hover:border-gold/60 hover:bg-gold/5"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                    Previous article
                  </p>
                  <h3 className="mt-3 font-display text-xl font-semibold text-foreground group-hover:text-navy">
                    {previousPost.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">{previousPost.excerpt}</p>
                  <span className="mt-4 inline-flex text-sm font-semibold text-navy">
                    ← Read previous
                  </span>
                </Link>
              ) : (
                <div className="rounded-2xl border border-dashed border-border bg-background/50 p-5 text-left text-sm text-muted-foreground">
                  You’re at the beginning of the series.
                </div>
              )}

              {nextPost ? (
                <Link
                  to="/blog/$slug"
                  params={{ slug: nextPost.slug }}
                  className="group rounded-2xl border border-border bg-background p-5 text-left transition-colors hover:border-gold/60 hover:bg-gold/5"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                    Next article
                  </p>
                  <h3 className="mt-3 font-display text-xl font-semibold text-foreground group-hover:text-navy">
                    {nextPost.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">{nextPost.excerpt}</p>
                  <span className="mt-4 inline-flex text-sm font-semibold text-navy">
                    Read next →
                  </span>
                </Link>
              ) : (
                <div className="rounded-2xl border border-dashed border-border bg-background/50 p-5 text-left text-sm text-muted-foreground">
                  You’ve reached the latest article.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
