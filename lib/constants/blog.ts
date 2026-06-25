export const MEDIUM_PROFILE_URL = "https://medium.com/@akhileshgoswami_10630";

export interface BlogPost {
  tag: string;
  title: string;
  excerpt: string;
  href: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    tag: "Decision Intelligence",
    title: "Why financial decisions need more than spreadsheets",
    excerpt: "Most people don't need another dashboard. They need a clear answer before they act.",
    href: MEDIUM_PROFILE_URL,
  },
  {
    tag: "Building Arivo",
    title: "Designing AI for life's biggest money questions",
    excerpt: "From car loans to career moves — how we're thinking about decision intelligence.",
    href: MEDIUM_PROFILE_URL,
  },
  {
    tag: "Personal Finance",
    title: "The cost of guessing on major financial choices",
    excerpt: "Expensive mistakes often come from timing, not math. Here's what changes that.",
    href: MEDIUM_PROFILE_URL,
  },
];
