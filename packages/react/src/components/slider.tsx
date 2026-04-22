import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/utils";

const sliderVariants = cva("w-full accent-brand disabled:cursor-not-allowed disabled:opacity-50", {
  variants: {
    size: {
      sm: "h-4",
      md: "h-5",
      lg: "h-6"
    },
    invalid: {
      true: "accent-danger",
      false: ""
    }
  },
  defaultVariants: {
    size: "md",
    invalid: false
  }
});

export interface SliderProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type">,
    VariantProps<typeof sliderVariants> {
  showValue?: boolean;
  onValueChange?: (value: number) => void;
}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  (
    {
      className,
      defaultValue,
      disabled,
      invalid = false,
      max = 100,
      min = 0,
      onChange,
      onValueChange,
      showValue = false,
      size,
      step = 1,
      value,
      ...props
    },
    ref
  ) => {
    const isControlled = value !== undefined;
    const initialValue = Array.isArray(defaultValue)
      ? Number(defaultValue[0] ?? min)
      : Number(defaultValue ?? min);
    const [uncontrolledValue, setUncontrolledValue] = React.useState(initialValue);
    const resolvedValue = Number(isControlled ? value : uncontrolledValue);

    return (
      <div className="space-y-2">
        <div className="flex items-center gap-4">
          <input
            ref={ref}
            type="range"
            min={min}
            max={max}
            step={step}
            value={resolvedValue}
            disabled={disabled}
            aria-invalid={invalid || undefined}
            className={cn(sliderVariants({ invalid, size }), className)}
            onChange={(event) => {
              const nextValue = Number(event.target.value);

              if (!isControlled) {
                setUncontrolledValue(nextValue);
              }

              onValueChange?.(nextValue);
              onChange?.(event);
            }}
            {...props}
          />
          {showValue ? (
            <span className="min-w-12 text-right text-sm font-medium text-foreground">
              {resolvedValue}
            </span>
          ) : null}
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{min}</span>
          <span>{max}</span>
        </div>
      </div>
    );
  }
);

Slider.displayName = "Slider";

export { Slider, sliderVariants };
