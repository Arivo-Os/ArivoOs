import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/layout/PageHero";
import { BLOG_POSTS, MEDIUM_PROFILE_URL } from "@/lib/constants/blog";

export const metadata: Metadata = {
  title: "Blog — Financial Decision Intelligence Insights",
  description:
    "Articles on financial decision-making, AI in personal finance, and how to approach life's biggest money decisions with clarity.",
  alternates: { canonical: "https://arivoai.in/blog" },
};

export default function BlogPage() {
  return (
    <main className="bg-page">
      <PageHero
        label="From the blog"
        title="Ideas on smarter financial decisions."
        description="Thoughts on decision-making, money psychology, and building Arivo — from our founder."
      />

      <section aria-label="Blog posts" className="page-section">
        <div className="mx-auto max-w-container px-6 lg:px-8">
          <div className="mb-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {BLOG_POSTS.map((post) => (
              <a
                key={post.title}
                href={post.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col rounded-2xl bg-white p-7 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_48px_rgba(0,0,0,0.1)]"
              >
                <span className="mb-3 inline-block w-fit rounded-full bg-brand-green/10 px-3 py-1 text-[11px] font-semibold text-brand-green">
                  {post.tag}
                </span>
                <h2 className="mb-2 font-display text-lg font-bold leading-snug text-ink group-hover:text-brand-green">
                  {post.title}
                </h2>
                <p className="mb-5 flex-1 text-sm leading-relaxed text-ink-muted">{post.excerpt}</p>
                <span className="text-sm font-semibold text-brand-green">Read on Medium →</span>
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
