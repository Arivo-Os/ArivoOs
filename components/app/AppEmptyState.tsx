import { cn } from "@/lib/utils";

interface AppEmptyStateProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function AppEmptyState({ title, description, action, className }: AppEmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center rounded-2xl border border-dashed border-app-border bg-app-surface/50 px-6 py-10 text-center",
        className
      )}
    >
      <p className="font-medium text-app-text">{title}</p>
      {description && <p className="mt-2 max-w-sm text-sm text-app-muted">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
