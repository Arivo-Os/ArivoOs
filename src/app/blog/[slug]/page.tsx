import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, ArrowLeft, ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/button";
import {
  getBlogPost,
  getAdjacentPosts,
  BLOG_POSTS,
  AUTHOR_NAME,
  MEDIUM_PROFILE_URL,
} from "@/lib/constants/blog";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { articleJsonLd } from "@/lib/seo/structured-data";

interface BlogPostPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: BlogPostPageProps): Metadata {
  const post = getBlogPost(params.slug);
  if (!post) return {};

  return buildPageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    keywords: [post.tag, "Arivo blog", "personal finance India", "AI finance"],
    ogType: "article",
    publishedTime: post.datePublished,
  });
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getBlogPost(params.slug);
  if (!post) notFound();

  const { prev, next } = getAdjacentPosts(params.slug);

  return (
    <main className="bg-page">
      <JsonLd id={`jsonld-article-${post.slug}`} data={articleJsonLd(post)} />

      <article className="border-b border-ink/5 bg-page pt-32 pb-12">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Blog", href: "/blog" },
              { label: post.title },
            ]}
          />

          <span className="mb-4 inline-block rounded-full bg-accent-primary/10 px-3 py-1 text-xs font-semibold text-accent-primary">
            {post.tag}
          </span>

          <h1 className="mb-4 font-display text-[clamp(2rem,5vw,2.75rem)] font-bold leading-tight tracking-tight text-ink">
            {post.title}
          </h1>

          <div className="mb-8 flex flex-wrap items-center gap-4 text-sm text-ink-muted">
            <span>By {AUTHOR_NAME}</span>
            <time dateTime={post.datePublished}>
              {new Date(post.datePublished).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              {post.readingMinutes} min read
            </span>
          </div>

          <nav aria-label="Table of contents" className="mb-10 rounded-2xl border border-ink/10 bg-page p-6">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-accent-primary">
              In this article
            </p>
            <ol className="space-y-2 text-sm">
              {post.sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="text-ink-muted transition-colors hover:text-accent-primary">
                    {s.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </article>

      <div className="page-section">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <div className="prose-seo space-y-12">
            {post.sections.map((section) => (
              <section key={section.id} id={section.id}>
                <h2 className="mb-4 font-display text-2xl font-bold text-ink">{section.heading}</h2>
                {section.paragraphs.map((p) => (
                  <p key={p.slice(0, 30)} className="mb-4 text-base leading-relaxed text-ink-muted">
                    {p}
                  </p>
                ))}
              </section>
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-accent-primary/20 bg-accent-primary/5 p-6">
            <p className="mb-4 text-sm text-ink-muted">
              Read the full article on Medium or explore more on the{" "}
              <Link href="/blog/" className="font-medium text-accent-primary hover:underline">Arivo blog</Link>.
            </p>
            <Button asChild>
              <a href={post.href} target="_blank" rel="noopener noreferrer">
                Continue on Medium
              </a>
            </Button>
          </div>

          <nav aria-label="Article navigation" className="mt-12 grid gap-4 sm:grid-cols-2">
            {prev ? (
              <Link
                href={`/blog/${prev.slug}/`}
                className="group flex items-start gap-3 rounded-2xl bg-page p-5 shadow-card transition-all hover:-translate-y-0.5"
              >
                <ArrowLeft className="mt-0.5 h-4 w-4 shrink-0 text-accent-primary" aria-hidden="true" />
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-ink-muted">Previous</span>
                  <p className="text-sm font-semibold text-ink group-hover:text-accent-primary">{prev.title}</p>
                </div>
              </Link>
            ) : (
              <div />
            )}
            {next ? (
              <Link
                href={`/blog/${next.slug}/`}
                className="group flex items-start justify-end gap-3 rounded-2xl bg-page p-5 text-right shadow-card transition-all hover:-translate-y-0.5 sm:col-start-2"
              >
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-ink-muted">Next</span>
                  <p className="text-sm font-semibold text-ink group-hover:text-accent-primary">{next.title}</p>
                </div>
                <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-accent-primary" aria-hidden="true" />
              </Link>
            ) : null}
          </nav>

          <section aria-labelledby="related-heading" className="mt-16">
            <h2 id="related-heading" className="mb-6 font-display text-xl font-bold text-ink">
              Related articles
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {BLOG_POSTS.filter((p) => p.slug !== post.slug)
                .slice(0, 2)
                .map((related) => (
                  <Link
                    key={related.slug}
                    href={`/blog/${related.slug}/`}
                    className="rounded-2xl bg-page p-5 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_48px_rgba(0,0,0,0.1)]"
                  >
                    <span className="mb-2 block text-xs font-semibold text-accent-primary">{related.tag}</span>
                    <p className="font-semibold text-ink">{related.title}</p>
                  </Link>
                ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
