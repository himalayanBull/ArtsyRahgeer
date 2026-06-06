"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "link";
  size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-50",
          {
            default:
              "bg-accent text-accent-foreground hover:opacity-90 active:scale-[0.98]",
            outline:
              "border border-border bg-transparent hover:bg-accent hover:text-accent-foreground",
            ghost: "hover:bg-muted",
            link: "underline-offset-4 hover:underline p-0",
          }[variant],
          {
            sm: "h-9 px-4 text-sm rounded-md",
            md: "h-11 px-6 text-sm rounded-md",
            lg: "h-14 px-8 text-base rounded-lg",
          }[size],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
