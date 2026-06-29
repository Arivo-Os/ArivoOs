import { cn } from "@/lib/utils";

export function AppCard({
  className,
  children,
  interactive,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { interactive?: boolean }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-app-border bg-app-card p-6 shadow-app-sm",
        interactive && "app-card-interactive",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
