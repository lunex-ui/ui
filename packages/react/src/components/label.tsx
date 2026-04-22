import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/utils";

const labelVariants = cva(
  "inline-flex items-center gap-1 text-sm font-medium leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
  {
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base"
      },
      required: {
        true: "",
        false: ""
      }
    },
    defaultVariants: {
      size: "md",
      required: false
    }
  }
);

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof labelVariants> {}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ children, className, required, size, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(labelVariants({ required, size }), className)}
        {...props}
      >
        <span>{children}</span>
        {required ? (
          <span aria-hidden="true" className="text-danger">
            *
          </span>
        ) : null}
      </label>
    );
  }
);

Label.displayName = "Label";

export { Label, labelVariants };
