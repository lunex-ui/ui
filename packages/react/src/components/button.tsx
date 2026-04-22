import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import {
  controlSizeClasses,
  getButtonType,
  interactiveControlBaseClass,
  type AsChildProps
} from "../lib/component";
import { cn } from "../lib/utils";

const buttonVariants = cva(
  interactiveControlBaseClass,
  {
    variants: {
      variant: {
        default: "bg-brand text-brand-foreground hover:opacity-90",
        surface: "bg-surface text-surface-foreground hover:bg-surface/80",
        ghost: "hover:bg-muted hover:text-foreground",
        outline: "border border-border bg-background text-foreground hover:bg-muted"
      },
      size: controlSizeClasses
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants>,
    AsChildProps {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild = false, className, size, type, variant, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        type={getButtonType(asChild, type)}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
