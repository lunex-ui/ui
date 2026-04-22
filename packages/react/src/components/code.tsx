import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/utils";

const codeVariants = cva(
  "font-mono text-[0.875em] transition-colors",
  {
    variants: {
      variant: {
        inline:
          "inline-flex items-center rounded-md border border-border bg-muted px-1.5 py-0.5 text-foreground",
        block:
          "flex w-full rounded-lg border border-border bg-foreground px-4 py-3 text-sm text-background shadow-sm"
      },
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base"
      }
    },
    defaultVariants: {
      variant: "inline",
      size: "md"
    }
  }
);

export interface CodeProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof codeVariants> {
  as?: "code" | "pre";
}

function Code({
  as,
  className,
  size,
  variant,
  ...props
}: CodeProps) {
  const Component = as ?? (variant === "block" ? "pre" : "code");

  return (
    <Component
      className={cn(
        codeVariants({ size, variant }),
        variant === "block" ? "overflow-x-auto whitespace-pre-wrap" : "",
        className
      )}
      {...props}
    />
  );
}

export { Code, codeVariants };
