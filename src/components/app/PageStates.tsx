import { AlertCircle, Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { AppButton } from "@/components/app/AppButton";

export function PageLoading() {
  return (
    <div className="animate-fade-in space-y-6" aria-live="polite" aria-busy="true">
      <div className="flex items-center gap-3 text-sm text-app-muted">
        <Loader2 className="h-4 w-4 animate-spin text-app-accent" />
        Loading...
      </div>
      <Skeleton className="h-36 w-full rounded-2xl" />
      <div className="grid gap-6 lg:grid-cols-2">
        <Skeleton className="h-56 w-full rounded-2xl" />
        <Skeleton className="h-56 w-full rounded-2xl" />
      </div>
    </div>
  );
}

export function PageError({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div
      className="flex flex-col items-center rounded-2xl border border-app-danger/20 bg-app-danger/5 px-6 py-10 text-center"
      role="alert"
    >
      <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-app-danger/10 text-app-danger">
        <AlertCircle className="h-6 w-6" />
      </span>
      <p className="max-w-md text-sm leading-relaxed text-app-danger">{message}</p>
      {onRetry && (
        <AppButton variant="secondary" size="sm" className="mt-4" onClick={onRetry}>
          Try again
        </AppButton>
      )}
    </div>
  );
}
