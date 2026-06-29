import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-app-bg px-4 text-center">
      <p className="text-6xl font-extrabold text-app-accent">404</p>
      <h1 className="mt-4 font-display text-2xl font-bold text-app-text">Page not found</h1>
      <p className="mt-2 max-w-md text-app-muted">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
      <div className="mt-8 flex gap-3">
        <Link href="/" className="rounded-full bg-app-accent px-6 py-3 text-sm font-semibold text-app-bg">
          Go Home
        </Link>
        <Link href="/login" className="rounded-full border border-app-border px-6 py-3 text-sm font-semibold text-app-text">
          Sign In
        </Link>
      </div>
    </div>
  );
}
