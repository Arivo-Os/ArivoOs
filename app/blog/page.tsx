import type { Metadata } from "next";
import Link from "next/link";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/layout/PageHero";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { BLOG_POSTS, MEDIUM_PROFILE_URL } from "@/lib/constants/blog";
import { blogIndexJsonLd } from "@/lib/seo/structured-data";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Arivo Blog — AI Personal Finance & Decision Intelligence",
  description:
    "Articles on AI personal finance, financial decision-making, and smarter money management for India. Insights from the Arivo team.",
  path: "/blog",
  keywords: ["Arivo blog", "AI finance blog", "personal finance India", "financial decision making"],
});

export default function BlogPage() {
  return (
    <main className="bg-page">
      <JsonLd id="jsonld-blog" data={blogIndexJsonLd()} />

      <PageHero
        label="From the blog"
        title="Ideas on smarter financial decisions."
        description="Thoughts on decision-making, money psychology, and building Arivo — from our founder."
      />

      <section aria-label="Blog posts" className="page-section">
        <div className="mx-auto max-w-container px-6 lg:px-8">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Blog" }]} />

          <div className="mb-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {BLOG_POSTS.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}/`}
                className="group flex flex-col rounded-2xl bg-white p-7 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_48px_rgba(0,0,0,0.1)]"
              >
                <span className="mb-3 inline-block w-fit rounded-full bg-brand-green/10 px-3 py-1 text-[11px] font-semibold text-brand-green">
                  {post.tag}
                </span>
                <h2 className="mb-2 font-display text-lg font-bold leading-snug text-ink group-hover:text-brand-green">
                  {post.title}
                </h2>
                <p className="mb-4 flex-1 text-sm leading-relaxed text-ink-muted">{post.excerpt}</p>
                <span className="inline-flex items-center gap-1 text-xs text-ink-muted">
                  <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                  {post.readingMinutes} min read
                </span>
              </Link>
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
