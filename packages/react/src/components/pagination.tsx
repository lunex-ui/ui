import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/utils";

const paginationLinkVariants = cva(
  "inline-flex h-9 min-w-9 items-center justify-center rounded-md border border-transparent px-3 text-sm font-medium transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      active: {
        true: "border-border bg-background text-foreground shadow-sm",
        false: "text-muted-foreground"
      }
    },
    defaultVariants: {
      active: false
    }
  }
);

function Pagination({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      aria-label="Pagination"
      className={cn("flex justify-center", className)}
      {...props}
    />
  );
}

function PaginationList({
  className,
  ...props
}: React.HTMLAttributes<HTMLUListElement>) {
  return <ul className={cn("flex items-center gap-1", className)} {...props} />;
}

function PaginationItem({
  className,
  ...props
}: React.LiHTMLAttributes<HTMLLIElement>) {
  return <li className={cn("inline-flex", className)} {...props} />;
}

export interface PaginationLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof paginationLinkVariants> {}

function PaginationLink({
  active,
  className,
  ...props
}: PaginationLinkProps) {
  return (
    <a
      aria-current={active ? "page" : undefined}
      className={cn(paginationLinkVariants({ active }), className)}
      {...props}
    />
  );
}

function PaginationPrevious({
  children = "Previous",
  className,
  ...props
}: PaginationLinkProps) {
  return (
    <PaginationLink className={cn("gap-2", className)} {...props}>
      <span aria-hidden="true">{"<"}</span>
      {children}
    </PaginationLink>
  );
}

function PaginationNext({
  children = "Next",
  className,
  ...props
}: PaginationLinkProps) {
  return (
    <PaginationLink className={cn("gap-2", className)} {...props}>
      {children}
      <span aria-hidden="true">{">"}</span>
    </PaginationLink>
  );
}

function PaginationEllipsis({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      aria-hidden="true"
      className={cn("inline-flex h-9 min-w-9 items-center justify-center text-muted-foreground", className)}
      {...props}
    >
      ...
    </span>
  );
}

export {
  Pagination,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  paginationLinkVariants,
  PaginationList,
  PaginationNext,
  PaginationPrevious
};
