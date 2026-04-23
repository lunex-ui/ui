import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/utils";

const avatarGroupVariants = cva("flex items-center", {
  variants: {
    spacing: {
      tight: "-space-x-3",
      normal: "-space-x-2",
      loose: "space-x-1"
    }
  },
  defaultVariants: {
    spacing: "normal"
  }
});

export interface AvatarGroupProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarGroupVariants> {}

function AvatarGroup({ className, spacing, ...props }: AvatarGroupProps) {
  return (
    <div
      className={cn(
        avatarGroupVariants({ spacing }),
        "[&>*]:ring-2 [&>*]:ring-background",
        className
      )}
      {...props}
    />
  );
}

function AvatarGroupCount({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex h-10 min-w-10 items-center justify-center rounded-full bg-muted px-2 text-sm font-medium text-muted-foreground ring-2 ring-background",
        className
      )}
      {...props}
    />
  );
}

export { AvatarGroup, AvatarGroupCount, avatarGroupVariants };
