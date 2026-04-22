import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { Label } from "./label";
import { cn } from "../lib/utils";

const fieldVariants = cva("space-y-2", {
  variants: {
    size: {
      sm: "space-y-1.5",
      md: "space-y-2",
      lg: "space-y-3"
    }
  },
  defaultVariants: {
    size: "md"
  }
});

export interface FieldProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof fieldVariants> {
  label?: React.ReactNode;
  description?: React.ReactNode;
  error?: React.ReactNode;
  htmlFor?: string;
  required?: boolean;
}

function Field({
  children,
  className,
  description,
  error,
  htmlFor,
  label,
  required = false,
  size,
  ...props
}: FieldProps) {
  return (
    <div className={cn(fieldVariants({ size }), className)} {...props}>
      {label ? (
        <Label htmlFor={htmlFor} required={required} size={size}>
          {label}
        </Label>
      ) : null}
      {description ? (
        <p className="text-sm text-muted-foreground">{description}</p>
      ) : null}
      {children}
      {error ? <p className="text-sm text-danger">{error}</p> : null}
    </div>
  );
}

function FieldDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm text-muted-foreground", className)} {...props} />;
}

function FieldError({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm text-danger", className)} {...props} />;
}

export { Field, FieldDescription, FieldError, fieldVariants };
