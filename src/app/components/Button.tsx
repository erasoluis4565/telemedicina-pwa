import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "../lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "default" | "large" | "xl";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "large", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-3 rounded-xl transition-all duration-200",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "focus:outline-none focus:ring-4 focus:ring-primary/30",
          {
            "bg-primary text-primary-foreground hover:opacity-90 active:scale-[0.98]":
              variant === "primary",
            "bg-secondary text-secondary-foreground hover:opacity-90 active:scale-[0.98]":
              variant === "secondary",
            "border-2 border-border bg-background hover:bg-muted active:scale-[0.98]":
              variant === "outline",
            "hover:bg-muted active:scale-[0.98]": variant === "ghost",
          },
          {
            "min-h-[56px] px-6 py-4": size === "default",
            "min-h-[64px] px-8 py-5": size === "large",
            "min-h-[72px] px-10 py-6": size === "xl",
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
