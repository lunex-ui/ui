import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/utils";

const switchTrackVariants = cva(
  "peer inline-flex shrink-0 items-center rounded-full border border-transparent bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-brand data-[invalid=true]:bg-danger/80",
  {
    variants: {
      size: {
        sm: "h-5 w-9 p-0.5",
        md: "h-6 w-11 p-0.5",
        lg: "h-7 w-12 p-0.5"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
);

const switchThumbVariants = cva(
  "pointer-events-none inline-flex rounded-full bg-background shadow-sm transition-transform",
  {
    variants: {
      size: {
        sm: "h-4 w-4 peer-data-[state=checked]:translate-x-4",
        md: "h-5 w-5 peer-data-[state=checked]:translate-x-5",
        lg: "h-6 w-6 peer-data-[state=checked]:translate-x-5"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
);

export interface SwitchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type">,
    VariantProps<typeof switchTrackVariants> {
  invalid?: boolean;
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      checked,
      className,
      defaultChecked,
      disabled,
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
      <span className="relative inline-flex shrink-0 items-center">
        <input
          ref={ref}
          type="checkbox"
          role="switch"
          className={cn(switchTrackVariants({ size }), "appearance-none", className)}
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
            switchThumbVariants({ size }),
            "absolute left-0.5 top-1/2 -translate-y-1/2"
          )}
        />
      </span>
    );
  }
);

Switch.displayName = "Switch";

export { Switch, switchThumbVariants, switchTrackVariants };
