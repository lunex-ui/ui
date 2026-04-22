import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/utils";

const checkboxVariants = cva(
  "peer inline-flex shrink-0 items-center justify-center rounded-[calc(var(--radius)-4px)] border border-field-border bg-field text-field-foreground shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-brand data-[state=checked]:bg-brand data-[state=checked]:text-brand-foreground data-[invalid=true]:border-danger data-[invalid=true]:data-[state=checked]:border-danger data-[invalid=true]:data-[state=checked]:bg-danger",
  {
    variants: {
      size: {
        sm: "h-4 w-4",
        md: "h-5 w-5",
        lg: "h-6 w-6"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
);

const checkboxIndicatorVariants = cva("pointer-events-none leading-none", {
  variants: {
    size: {
      sm: "text-[10px]",
      md: "text-xs",
      lg: "text-sm"
    }
  },
  defaultVariants: {
    size: "md"
  }
});

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type">,
    VariantProps<typeof checkboxVariants> {
  invalid?: boolean;
  indicator?: React.ReactNode;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      checked,
      className,
      defaultChecked,
      disabled,
      indicator,
      invalid = false,
      onChange,
      size,
      ...props
    },
    ref
  ) => {
    const isControlled = checked !== undefined;
    const [uncontrolledChecked, setUncontrolledChecked] = React.useState(
      Boolean(defaultChecked)
    );
    const isChecked = isControlled ? Boolean(checked) : uncontrolledChecked;

    return (
      <span className="relative inline-flex shrink-0 items-center justify-center">
        <input
          ref={ref}
          type="checkbox"
          className={cn(
            checkboxVariants({ size }),
            "appearance-none",
            className
          )}
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          aria-checked={isChecked}
          aria-invalid={invalid || undefined}
          data-invalid={invalid ? "true" : undefined}
          data-state={isChecked ? "checked" : "unchecked"}
          onChange={(event) => {
            if (!isControlled) {
              setUncontrolledChecked(event.target.checked);
            }

            onChange?.(event);
          }}
          {...props}
        />
        <span
          aria-hidden="true"
          className={cn(
            checkboxIndicatorVariants({ size }),
            "pointer-events-none absolute text-current opacity-0 transition-opacity peer-data-[state=checked]:opacity-100"
          )}
        >
          {indicator ?? (
            <svg
              viewBox="0 0 16 16"
              fill="none"
              className="h-[0.9em] w-[0.9em]"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3.5 8.5 6.5 11.5 12.5 5.5" />
            </svg>
          )}
        </span>
      </span>
    );
  }
);

Checkbox.displayName = "Checkbox";

export { Checkbox, checkboxVariants };
