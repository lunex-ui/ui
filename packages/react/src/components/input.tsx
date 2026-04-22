import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import {
  ControlAdornment,
  controlSizeClasses,
  getControlStateAttributes
} from "../lib/component";
import { cn } from "../lib/utils";

const inputWrapperVariants = cva(
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

const inputElementVariants = cva(
  "w-full border-0 bg-transparent text-sm outline-none placeholder:text-field-placeholder disabled:cursor-not-allowed",
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

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputWrapperVariants> {
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      disabled,
      endContent,
      invalid = false,
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
        className={cn(inputWrapperVariants({ invalid, size, variant }), className)}
        data-disabled={disabled ? "true" : undefined}
      >
        <ControlAdornment>{startContent}</ControlAdornment>
        <input
          ref={ref}
          className={inputElementVariants({ size })}
          disabled={stateAttributes.disabled}
          aria-disabled={stateAttributes["aria-disabled"]}
          aria-invalid={invalid || undefined}
          {...props}
        />
        <ControlAdornment>{endContent}</ControlAdornment>
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input, inputElementVariants, inputWrapperVariants };
