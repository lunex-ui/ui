import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import {
  ControlAdornment,
  controlSizeClasses,
  getControlStateAttributes
} from "../lib/component";
import { cn } from "../lib/utils";

const selectWrapperVariants = cva(
  "flex w-full items-center gap-2 rounded-md border border-field-border bg-field text-field-foreground shadow-sm transition-colors focus-within:border-focus focus-within:ring-2 focus-within:ring-focus focus-within:ring-offset-2 data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-50",
  {
    variants: {
      variant: {
        default: "",
        surface: "bg-surface text-surface-foreground border-border",
        ghost: "border-transparent bg-transparent shadow-none"
      },
      size: {
        sm: cn(controlSizeClasses.sm, "px-3"),
        md: cn(controlSizeClasses.md, "px-3"),
        lg: cn(controlSizeClasses.lg, "px-4")
      },
      invalid: {
        true: "border-danger focus-within:border-danger focus-within:ring-danger",
        false: ""
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      invalid: false
    }
  }
);

const selectElementVariants = cva(
  "w-full appearance-none border-0 bg-transparent text-sm outline-none disabled:cursor-not-allowed",
  {
    variants: {
      size: {
        sm: "text-sm",
        md: "text-sm",
        lg: "text-base"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
);

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size">,
    VariantProps<typeof selectWrapperVariants> {
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  placeholder?: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      children,
      className,
      disabled,
      endContent,
      invalid = false,
      placeholder,
      size,
      startContent,
      variant,
      ...props
    },
    ref
  ) => {
    const stateAttributes = getControlStateAttributes(false, {
      disabled,
      loading: false,
      selected: false
    });

    return (
      <div
        className={cn(selectWrapperVariants({ invalid, size, variant }), className)}
        data-disabled={disabled ? "true" : undefined}
      >
        <ControlAdornment>{startContent}</ControlAdornment>
        <select
          ref={ref}
          className={selectElementVariants({ size })}
          disabled={stateAttributes.disabled}
          aria-disabled={stateAttributes["aria-disabled"]}
          aria-invalid={invalid || undefined}
          defaultValue={props.defaultValue ?? (placeholder ? "" : undefined)}
          {...props}
        >
          {placeholder ? (
            <option value="" disabled>
              {placeholder}
            </option>
          ) : null}
          {children}
        </select>
        <ControlAdornment>{endContent ?? <span aria-hidden="true">v</span>}</ControlAdornment>
      </div>
    );
  }
);

Select.displayName = "Select";

export { Select, selectElementVariants, selectWrapperVariants };
