import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    // Set appropriate inputMode based on type for better mobile keyboards
    const getInputMode = () => {
      switch (type) {
        case "email":
          return "email";
        case "tel":
          return "tel";
        case "number":
          return "numeric";
        case "url":
          return "url";
        default:
          return undefined;
      }
    };

    return (
      <input
        type={type}
        inputMode={getInputMode()}
        className={cn(
          // Mobile-optimized: min-h-[48px] for touch targets, text-base (16px) to prevent iOS zoom
          "flex min-h-[48px] w-full rounded-md border border-input bg-transparent px-4 py-3 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
