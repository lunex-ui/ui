import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/utils";

interface RadioGroupContextValue {
  name?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  invalid?: boolean;
  size: NonNullable<RadioGroupProps["size"]>;
}

const RadioGroupContext = React.createContext<RadioGroupContextValue | null>(null);

const radioGroupVariants = cva("grid gap-3", {
  variants: {
    orientation: {
      vertical: "grid-cols-1",
      horizontal: "grid-cols-1 md:grid-cols-2"
    }
  },
  defaultVariants: {
    orientation: "vertical"
  }
});

const radioIndicatorVariants = cva(
  "peer inline-flex shrink-0 items-center justify-center rounded-full border border-field-border bg-field text-brand transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-brand data-[invalid=true]:border-danger",
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

function useRadioGroupContext() {
  const context = React.useContext(RadioGroupContext);

  if (!context) {
    throw new Error("RadioGroupItem must be used within <RadioGroup />.");
  }

  return context;
}

export interface RadioGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof radioGroupVariants> {
  name?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  invalid?: boolean;
  size?: "sm" | "md" | "lg";
}

function RadioGroup({
  children,
  className,
  defaultValue,
  disabled = false,
  invalid = false,
  name,
  onValueChange,
  orientation,
  size = "md",
  value,
  ...props
}: RadioGroupProps) {
  const isControlled = value !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue);
  const resolvedValue = isControlled ? value : uncontrolledValue;

  return (
    <RadioGroupContext.Provider
      value={{
        disabled,
        invalid,
        name,
        onValueChange: (nextValue) => {
          if (!isControlled) {
            setUncontrolledValue(nextValue);
          }

          onValueChange?.(nextValue);
        },
        size,
        value: resolvedValue
      }}
    >
      <div
        role="radiogroup"
        className={cn(radioGroupVariants({ orientation }), className)}
        aria-invalid={invalid || undefined}
        {...props}
      >
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
}

export interface RadioGroupItemProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type" | "onChange">,
    VariantProps<typeof radioIndicatorVariants> {
  value: string;
  label?: React.ReactNode;
  description?: React.ReactNode;
}

const RadioGroupItem = React.forwardRef<HTMLInputElement, RadioGroupItemProps>(
  (
    {
      className,
      description,
      disabled,
      id,
      label,
      size,
      value,
      ...props
    },
    ref
  ) => {
    const context = useRadioGroupContext();
    const itemId = id ?? `${context.name ?? "radio"}-${value}`;
    const checked = context.value === value;
    const resolvedDisabled = context.disabled || disabled;

    return (
      <label
        htmlFor={itemId}
        className={cn(
          "flex items-start gap-3 rounded-md border border-border p-4 transition-colors",
          checked ? "border-brand bg-brand-soft/40" : "bg-background",
          resolvedDisabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"
        )}
      >
        <span className="relative inline-flex shrink-0 items-center justify-center">
          <input
            ref={ref}
            id={itemId}
            type="radio"
            name={context.name}
            value={value}
            checked={checked}
            disabled={resolvedDisabled}
            aria-invalid={context.invalid || undefined}
            className={cn(radioIndicatorVariants({ size: size ?? context.size }), className, "appearance-none")}
            data-invalid={context.invalid ? "true" : undefined}
            data-state={checked ? "checked" : "unchecked"}
            onChange={() => {
              context.onValueChange?.(value);
            }}
            {...props}
          />
          <span
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute rounded-full bg-current opacity-0 transition-opacity peer-data-[state=checked]:opacity-100",
              context.size === "sm" || size === "sm"
                ? "h-2 w-2"
                : context.size === "lg" || size === "lg"
                  ? "h-3 w-3"
                  : "h-2.5 w-2.5"
            )}
          />
        </span>
        <span className="space-y-1">
          {label ? <span className="block text-sm font-medium text-foreground">{label}</span> : null}
          {description ? (
            <span className="block text-sm text-muted-foreground">{description}</span>
          ) : null}
        </span>
      </label>
    );
  }
);

RadioGroupItem.displayName = "RadioGroupItem";

export { RadioGroup, RadioGroupItem, radioGroupVariants, radioIndicatorVariants };
