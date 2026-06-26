import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "../lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block mb-3 text-foreground"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "w-full min-h-[56px] px-5 py-4 rounded-xl",
            "border-2 border-input bg-input-background text-foreground",
            "focus:outline-none focus:ring-4 focus:ring-primary/30 focus:border-primary",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "placeholder:text-muted-foreground",
            error && "border-destructive focus:border-destructive focus:ring-destructive/30",
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-2 text-destructive">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
