import * as React from "react";

import {
  getAnchoredPosition,
  OverlayPortal,
  type OverlayContextValue,
  type OverlaySide,
  useAnchorSync,
  useControllableOpen,
  useEscapeDismiss,
  useOutsidePointerDown
} from "../lib/overlay";
import { cn } from "../lib/utils";

const PopoverContext = React.createContext<OverlayContextValue | null>(null);

function usePopoverContext() {
  const context = React.useContext(PopoverContext);

  if (!context) {
    throw new Error("Popover components must be used within a Popover.");
  }

  return context;
}

export interface PopoverProps {
  children: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

function Popover({
  children,
  defaultOpen = false,
  onOpenChange,
  open
}: PopoverProps) {
  const [triggerRect, setTriggerRect] = React.useState<DOMRect | null>(null);
  const [resolvedOpen, setOpen] = useControllableOpen({
    defaultOpen,
    onOpenChange,
    open
  });

  useEscapeDismiss(resolvedOpen, () => setOpen(false));

  return (
    <PopoverContext.Provider
      value={{ open: resolvedOpen, setOpen, setTriggerRect, triggerRect }}
    >
      {children}
    </PopoverContext.Provider>
  );
}

function PopoverTrigger({
  children
}: {
  children: React.ReactNode;
}) {
  const { open, setOpen, setTriggerRect } = usePopoverContext();
  const triggerRef = React.useRef<HTMLSpanElement>(null);
  const syncRect = useAnchorSync(open, triggerRef, setTriggerRect);

  return (
    <span
      ref={triggerRef}
      className="inline-flex"
      onClick={() => {
        syncRect();
        setOpen(!open);
      }}
    >
      {children}
    </span>
  );
}

function PopoverContent({
  children,
  className,
  side = "bottom",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { side?: OverlaySide }) {
  const { open, setOpen, triggerRect } = usePopoverContext();
  const contentRef = React.useRef<HTMLDivElement>(null);
  useOutsidePointerDown(open, contentRef, () => setOpen(false));

  if (!open || !triggerRect) {
    return null;
  }

  const position = getAnchoredPosition(triggerRect, side, 12);

  return (
    <OverlayPortal>
      <div
        ref={contentRef}
        role="dialog"
        className={cn(
          "fixed z-50 w-full max-w-sm rounded-xl border border-border bg-background p-4 text-foreground shadow-lg",
          className
        )}
        style={position}
        {...props}
      >
        {children}
      </div>
    </OverlayPortal>
  );
}

function PopoverHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("space-y-1.5", className)} {...props} />;
}

function PopoverTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("text-sm font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  );
}

function PopoverDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm text-muted-foreground", className)} {...props} />;
}

export {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger
};
