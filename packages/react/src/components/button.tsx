import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import {
  ControlAdornment,
  ControlContent,
  ControlSpinner,
  controlSizeClasses,
  getControlStateAttributes,
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
        default:
          "bg-brand text-brand-foreground hover:opacity-90 active:opacity-95 data-[selected=true]:opacity-95",
        secondary:
          "bg-brand-soft text-brand-soft-foreground hover:opacity-90 active:opacity-95 data-[selected=true]:opacity-95",
        destructive:
          "bg-danger text-danger-foreground hover:opacity-90 active:opacity-95 data-[selected=true]:opacity-95",
        surface:
          "bg-surface text-surface-foreground hover:bg-surface/80 active:bg-surface/70 data-[selected=true]:bg-surface/70",
        ghost:
          "hover:bg-muted hover:text-foreground active:bg-muted data-[selected=true]:bg-muted data-[selected=true]:text-foreground",
        outline:
          "border border-border bg-background text-foreground hover:bg-muted active:bg-muted data-[selected=true]:bg-muted",
        link:
          "h-auto px-0 py-0 text-brand underline-offset-4 hover:underline data-[selected=true]:underline"
      },
      size: controlSizeClasses
    },
    compoundVariants: [
      {
        size: "icon",
        variant: "link",
        className: "h-auto w-auto"
      },
      {
        variant: ["default", "secondary", "destructive", "surface", "outline"],
        className: "data-[loading=true]:cursor-wait"
      }
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
    AsChildProps {
  loading?: boolean;
  loadingText?: string;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  selected?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      asChild = false,
      children,
      className,
      disabled,
      endContent,
      loading = false,
      loadingText,
      selected = false,
      size,
      startContent,
      type,
      variant,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    const content = loading && loadingText ? loadingText : children;
    const stateAttributes = getControlStateAttributes(asChild, {
      disabled,
      loading,
      selected
    });

    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        type={getButtonType(asChild, type)}
        {...stateAttributes}
        {...props}
      >
        {loading ? <ControlSpinner /> : null}
        {!loading ? <ControlAdornment>{startContent}</ControlAdornment> : null}
        <ControlContent>{content}</ControlContent>
        {!loading ? <ControlAdornment>{endContent}</ControlAdornment> : null}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
