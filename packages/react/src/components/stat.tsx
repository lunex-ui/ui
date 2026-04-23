import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/utils";

const statVariants = cva(
  "rounded-xl border border-border bg-background p-5 text-foreground shadow-sm",
  {
    variants: {
      variant: {
        default: "",
        surface: "bg-surface text-surface-foreground",
        brand: "border-brand/30 bg-brand-soft text-brand-soft-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

export interface StatProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statVariants> {}

function Stat({ className, variant, ...props }: StatProps) {
  return <div className={cn(statVariants({ variant }), className)} {...props} />;
}

function StatLabel({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm text-muted-foreground", className)} {...props} />;
}

function StatValue({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("mt-2 text-3xl font-semibold tracking-tight", className)}
      {...props}
    />
  );
}

function StatDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("mt-2 text-sm text-muted-foreground", className)} {...props} />;
}

function StatTrend({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn("inline-flex items-center rounded-full bg-success/15 px-2 py-0.5 text-xs font-medium text-success", className)}
      {...props}
    />
  );
}

export { Stat, StatDescription, StatLabel, StatTrend, StatValue, statVariants };
