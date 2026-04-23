import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/utils";

const sliderRootVariants = cva("group space-y-2", {
  variants: {
    invalid: {
      true: "",
      false: ""
    }
  },
  defaultVariants: {
    invalid: false
  }
});

const sliderTrackVariants = cva(
  "relative w-full overflow-hidden rounded-full bg-muted transition-colors group-data-[disabled=true]:opacity-50",
  {
    variants: {
      size: {
        sm: "h-2",
        md: "h-2.5",
        lg: "h-3"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
);

const sliderRangeVariants = cva("absolute inset-y-0 left-0 rounded-full", {
  variants: {
    invalid: {
      true: "bg-danger",
      false: "bg-brand"
    }
  },
  defaultVariants: {
    invalid: false
  }
});

const sliderThumbVariants = cva(
  "pointer-events-none absolute top-1/2 rounded-full border border-border bg-background shadow-md transition-[left,transform] group-focus-within:ring-2 group-focus-within:ring-focus group-focus-within:ring-offset-2 group-data-[disabled=true]:opacity-50",
  {
    variants: {
      size: {
        sm: "h-4 w-4",
        md: "h-5 w-5",
        lg: "h-6 w-6"
      },
      invalid: {
        true: "border-danger",
        false: ""
      }
    },
    defaultVariants: {
      size: "md",
      invalid: false
    }
  }
);

export interface SliderProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type">,
    VariantProps<typeof sliderTrackVariants>,
    VariantProps<typeof sliderRootVariants> {
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
    const numericMin = Number(min);
    const numericMax = Number(max);
    const percent =
      numericMax === numericMin
        ? 0
        : ((resolvedValue - numericMin) / (numericMax - numericMin)) * 100;
    const boundedPercent = Math.max(0, Math.min(100, percent));

    return (
      <div
        className={cn(sliderRootVariants({ invalid }), className)}
        data-disabled={disabled ? "true" : undefined}
      >
        <div className="flex items-center gap-4">
          <div className="relative flex w-full items-center py-2">
            <div className={sliderTrackVariants({ size })}>
              <div
                className={sliderRangeVariants({ invalid })}
                style={{ width: `${boundedPercent}%` }}
              />
            </div>
            <span
              aria-hidden="true"
              className={cn(
                sliderThumbVariants({ invalid, size }),
                "-translate-x-1/2 -translate-y-1/2"
              )}
              style={{ left: `${boundedPercent}%` }}
            />
            <input
              ref={ref}
              type="range"
              min={min}
              max={max}
              step={step}
              value={resolvedValue}
              disabled={disabled}
              aria-invalid={invalid || undefined}
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
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
          </div>
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

export {
  Slider,
  sliderRangeVariants,
  sliderRootVariants,
  sliderThumbVariants,
  sliderTrackVariants
};
