import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo/structured-data";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const jsonLdItems = items.map((item) => ({
    name: item.label,
    ...(item.href ? { href: item.href } : {}),
  }));

  return (
    <>
      <JsonLd id="jsonld-breadcrumb" data={breadcrumbJsonLd(jsonLdItems)} />
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-ink-muted">
          {items.map((item, i) => {
            const isLast = i === items.length - 1;
            return (
              <li key={item.label} className="flex items-center gap-1.5">
                {i > 0 && <span aria-hidden="true" className="text-ink/30">/</span>}
                {item.href && !isLast ? (
                  <Link href={item.href} className="transition-colors hover:text-brand-green">
                    {item.label}
                  </Link>
                ) : (
                  <span className={isLast ? "font-medium text-ink" : undefined} aria-current={isLast ? "page" : undefined}>
                    {item.label}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
