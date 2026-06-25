import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { BLOG_POSTS, MEDIUM_PROFILE_URL } from "@/lib/constants/blog";

export const metadata: Metadata = {
  title: "Blog — Financial Decision Intelligence Insights",
  description:
    "Articles on financial decision-making, AI in personal finance, and how to approach life's biggest money decisions with clarity.",
  alternates: { canonical: "https://arivoai.in/blog" },
};

export default function BlogPage() {
  return (
    <main>
      <section aria-labelledby="blog-hero-heading" className="border-b border-black/8 bg-arivo-surface pt-32 pb-16">
        <div className="mx-auto max-w-container px-7">
          <span className="section-label">From the blog</span>
          <h1 id="blog-hero-heading" className="mb-4 font-display text-[clamp(2rem,5vw,3rem)] font-extrabold tracking-tight text-arivo-text">
            Ideas on smarter financial decisions.
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-arivo-muted">
            Thoughts on decision-making, money psychology, and building Arivo — from our founder.
          </p>
        </div>
      </section>

      <section aria-label="Blog posts" className="py-20 lg:py-24">
        <div className="mx-auto max-w-container px-7">
          <div className="mb-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {BLOG_POSTS.map((post) => (
              <a
                key={post.title}
                href={post.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col rounded-2xl border border-black/8 bg-white p-7 transition-all duration-300 hover:-translate-y-0.5 hover:border-arivo-primary/20 hover:shadow-[0_8px_32px_rgba(26,122,82,0.1)]"
              >
                <span className="mb-3 inline-block w-fit rounded-full border border-arivo-primary/12 bg-arivo-primary/6 px-3 py-1 text-[11px] font-semibold text-arivo-primary">
                  {post.tag}
                </span>
                <h2 className="mb-2 font-display text-lg font-bold leading-snug text-arivo-text group-hover:text-arivo-primary">
                  {post.title}
                </h2>
                <p className="mb-5 flex-1 text-sm leading-relaxed text-arivo-muted">
                  {post.excerpt}
                </p>
                <span className="text-sm font-semibold text-arivo-primary">
                  Read on Medium →
                </span>
              </a>
            ))}
          </div>

          <div className="text-center">
            <Button variant="ghost" asChild size="lg">
              <a href={MEDIUM_PROFILE_URL} target="_blank" rel="noopener noreferrer">
                View all posts on Medium
              </a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
