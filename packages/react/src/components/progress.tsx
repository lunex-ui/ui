import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/utils";

const progressTrackVariants = cva("w-full overflow-hidden rounded-full bg-muted", {
  variants: {
    size: {
      sm: "h-2",
      md: "h-3",
      lg: "h-4"
    }
  },
  defaultVariants: {
    size: "md"
  }
});

const progressIndicatorVariants = cva("h-full rounded-full transition-[width] duration-300", {
  variants: {
    variant: {
      default: "bg-brand",
      success: "bg-success",
      warning: "bg-warning",
      danger: "bg-danger"
    }
  },
  defaultVariants: {
    variant: "default"
  }
});

export interface ProgressProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressTrackVariants>,
    VariantProps<typeof progressIndicatorVariants> {
  value?: number;
  max?: number;
  showValue?: boolean;
}

function Progress({
  className,
  max = 100,
  showValue = false,
  size,
  value = 0,
  variant,
  ...props
}: ProgressProps) {
  const percentage = Math.max(0, Math.min(100, (value / max) * 100));

  return (
    <div className="space-y-2" {...props}>
      <div
        role="progressbar"
        aria-valuemax={max}
        aria-valuemin={0}
        aria-valuenow={value}
        className={cn(progressTrackVariants({ size }), className)}
      >
        <div
          className={progressIndicatorVariants({ variant })}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showValue ? (
        <p className="text-sm text-muted-foreground">{Math.round(percentage)}%</p>
      ) : null}
    </div>
  );
}

export { Progress, progressIndicatorVariants, progressTrackVariants };
