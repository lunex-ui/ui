import type * as React from "react";

export interface AsChildProps {
  asChild?: boolean;
}

export const interactiveControlBaseClass =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

export const controlSizeClasses = {
  xs: "h-8 px-2.5 text-xs",
  sm: "h-9 px-3",
  md: "h-10 px-4 py-2",
  lg: "h-11 px-6",
  icon: "h-10 w-10"
} as const;

export type ControlSize = keyof typeof controlSizeClasses;

export interface ControlStateProps {
  disabled?: boolean;
  loading?: boolean;
  selected?: boolean;
}

export function getButtonType(
  asChild: boolean | undefined,
  type: React.ButtonHTMLAttributes<HTMLButtonElement>["type"]
) {
  if (asChild) {
    return type;
  }

  return type ?? "button";
}

export function getControlStateAttributes(
  asChild: boolean | undefined,
  { disabled, loading, selected }: ControlStateProps
) {
  const resolvedDisabled = disabled || loading;

  return {
    disabled: resolvedDisabled,
    "aria-disabled": resolvedDisabled || undefined,
    "aria-busy": loading || undefined,
    "aria-pressed": !asChild ? selected || undefined : undefined,
    "data-loading": loading ? "true" : undefined,
    "data-selected": selected ? "true" : undefined
  };
}

export function ControlSpinner() {
  return (
    <span
      aria-hidden="true"
      className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
    />
  );
}

export function ControlAdornment({
  children
}: {
  children?: React.ReactNode;
}) {
  if (!children) {
    return null;
  }

  return <span className="inline-flex shrink-0 items-center">{children}</span>;
}

export function ControlContent({
  children
}: {
  children?: React.ReactNode;
}) {
  if (!children) {
    return null;
  }

  return <span className="inline-flex items-center">{children}</span>;
}
