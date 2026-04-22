import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/utils";

const emptyStateVariants = cva(
  "flex w-full flex-col items-center justify-center rounded-xl border border-dashed border-border bg-background p-8 text-center",
  {
    variants: {
      variant: {
        default: "",
        surface: "bg-surface text-surface-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

export interface EmptyStateProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof emptyStateVariants> {}

function EmptyState({ className, variant, ...props }: EmptyStateProps) {
  return <div className={cn(emptyStateVariants({ variant }), className)} {...props} />;
}

function EmptyStateIcon({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-soft text-brand-soft-foreground",
        className
      )}
      {...props}
    />
  );
}

function EmptyStateTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn("text-lg font-semibold text-foreground", className)} {...props} />
  );
}

function EmptyStateDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("mt-2 max-w-md text-sm text-muted-foreground", className)} {...props} />
  );
}

function EmptyStateActions({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mt-5 flex flex-wrap justify-center gap-3", className)} {...props} />;
}

export {
  EmptyState,
  EmptyStateActions,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateTitle,
  emptyStateVariants
};
