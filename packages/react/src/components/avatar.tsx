import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/utils";

const avatarVariants = cva(
  "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-brand-soft text-brand-soft-foreground",
  {
    variants: {
      size: {
        sm: "h-8 w-8 text-xs",
        md: "h-10 w-10 text-sm",
        lg: "h-12 w-12 text-base"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
);

export interface AvatarProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof avatarVariants> {}

function Avatar({ className, size, ...props }: AvatarProps) {
  return <span className={cn(avatarVariants({ size }), className)} {...props} />;
}

export interface AvatarImageProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {}

function AvatarImage({ className, alt = "", ...props }: AvatarImageProps) {
  return (
    <img
      alt={alt}
      className={cn("h-full w-full object-cover", className)}
      {...props}
    />
  );
}

export interface AvatarFallbackProps
  extends React.HTMLAttributes<HTMLSpanElement> {}

function AvatarFallback({ className, ...props }: AvatarFallbackProps) {
  return (
    <span
      className={cn(
        "inline-flex h-full w-full items-center justify-center font-medium uppercase",
        className
      )}
      {...props}
    />
  );
}

export { Avatar, AvatarFallback, AvatarImage, avatarVariants };
