import { cn } from "@/lib/utils/cn";

export function Badge({
  children,
  variant = "default",
  className,
}: {
  children: React.ReactNode;
  variant?: "default" | "premium" | "free";
  className?: string;
}) {
  const variantClasses = {
    default: "bg-zinc-800 text-zinc-200",
    premium:
      "bg-brand-500/10 text-brand-400 border border-brand-500/30",
    free: "bg-zinc-900 text-zinc-400 border border-zinc-800",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
