import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { getControlStateAttributes } from "../lib/component";
import { cn } from "../lib/utils";

const textareaVariants = cva(
  "flex min-h-[120px] w-full rounded-md border border-field-border bg-field px-3 py-2 text-sm text-field-foreground shadow-sm transition-colors outline-none placeholder:text-field-placeholder focus-visible:border-focus focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "",
        surface: "bg-surface text-surface-foreground border-border",
        ghost: "border-transparent bg-transparent shadow-none"
      },
      size: {
        sm: "min-h-[96px] text-sm",
        md: "min-h-[120px] text-sm",
        lg: "min-h-[144px] text-base"
      },
      invalid: {
        true: "border-danger focus-visible:border-danger focus-visible:ring-danger",
        false: ""
      },
      resize: {
        none: "resize-none",
        vertical: "resize-y",
        auto: "resize"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      invalid: false,
      resize: "vertical"
    }
  }
);

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size">,
    VariantProps<typeof textareaVariants> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { className, disabled, invalid = false, resize, size, variant, ...props },
    ref
  ) => {
    const stateAttributes = getControlStateAttributes(false, {
      disabled,
      loading: false,
      selected: false
    });

    return (
      <textarea
        ref={ref}
        className={cn(textareaVariants({ invalid, resize, size, variant }), className)}
        disabled={stateAttributes.disabled}
        aria-disabled={stateAttributes["aria-disabled"]}
        aria-invalid={invalid || undefined}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea, textareaVariants };
