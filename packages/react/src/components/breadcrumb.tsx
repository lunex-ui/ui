import * as React from "react";

import { cn } from "../lib/utils";

function Breadcrumb({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("flex text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

function BreadcrumbList({
  className,
  ...props
}: React.OlHTMLAttributes<HTMLOListElement>) {
  return (
    <ol
      className={cn("flex flex-wrap items-center gap-1.5", className)}
      {...props}
    />
  );
}

function BreadcrumbItem({
  className,
  ...props
}: React.LiHTMLAttributes<HTMLLIElement>) {
  return (
    <li className={cn("inline-flex items-center gap-1.5", className)} {...props} />
  );
}

function BreadcrumbLink({
  className,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      className={cn("transition-colors hover:text-foreground", className)}
      {...props}
    />
  );
}

function BreadcrumbPage({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      aria-current="page"
      className={cn("font-medium text-foreground", className)}
      {...props}
    />
  );
}

function BreadcrumbSeparator({
  children = "/",
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span aria-hidden="true" className={cn("text-muted-foreground/70", className)} {...props}>
      {children}
    </span>
  );
}

export {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
};
