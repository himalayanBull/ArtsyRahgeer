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
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
        {
          default: "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200",
          sold: "bg-red-500 text-white",
          reserved: "bg-amber-500 text-white",
          available: "bg-emerald-500 text-white",
        }[variant],
        className
      )}
      {...props}
    />
  );
}
