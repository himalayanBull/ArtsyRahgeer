import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "sold" | "reserved" | "available";
}

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
        {
          default: "bg-muted text-muted-foreground",
          sold: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
          reserved:
            "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
          available:
            "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
        }[variant],
        className
      )}
      {...props}
    />
  );
}
