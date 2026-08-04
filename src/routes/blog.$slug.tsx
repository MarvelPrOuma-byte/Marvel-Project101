import { createFileRoute, Link } from "@tanstack/react-router";

import { getBlogPost } from "@/lib/blog-content";
import AnimatedLetters from "@/components/ui/AnimatedLetters";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const post = getBlogPost(params.slug);
    if (!post) {
      throw new Error("Post not found");
    }
    return { post };
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
            <span>{post.date}</span>
          </div>
        </div>
      </section>

      <section className="bg-cream">
        <div className="container-wide section-padding">
          <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-8 shadow-sm">
            <p className="text-lg leading-8 text-foreground">{post.excerpt}</p>
            <div className="mt-8 space-y-6 text-base leading-8 text-muted-foreground">
              {post.content.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <Link
              to="/blog"
              className="mt-8 inline-flex rounded-md bg-navy px-4 py-2 text-sm font-semibold text-primary-foreground"
            >
              ← Back to all posts
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
