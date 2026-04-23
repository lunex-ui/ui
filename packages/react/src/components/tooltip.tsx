import * as React from "react";

import {
  getAnchoredPosition,
  OverlayPortal,
  type OverlayContextValue,
  type OverlaySide,
  useAnchorSync,
  useControllableOpen
} from "../lib/overlay";
import { cn } from "../lib/utils";

const TooltipContext = React.createContext<OverlayContextValue | null>(null);

function useTooltipContext() {
  const context = React.useContext(TooltipContext);

  if (!context) {
    throw new Error("Tooltip components must be used within a Tooltip.");
  }

  return context;
}

export interface TooltipProps {
  children: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

function Tooltip({
  children,
  defaultOpen = false,
  onOpenChange,
  open
}: TooltipProps) {
  const [triggerRect, setTriggerRect] = React.useState<DOMRect | null>(null);
  const [resolvedOpen, setOpen] = useControllableOpen({
    defaultOpen,
    onOpenChange,
    open
  });

  return (
    <TooltipContext.Provider
      value={{ open: resolvedOpen, setOpen, setTriggerRect, triggerRect }}
    >
      {children}
    </TooltipContext.Provider>
  );
}

function TooltipTrigger({
  children
}: {
  children: React.ReactNode;
}) {
  const { setOpen, setTriggerRect } = useTooltipContext();
  const triggerRef = React.useRef<HTMLSpanElement>(null);
  const syncRect = useAnchorSync(false, triggerRef, setTriggerRect);

  return (
    <span
      ref={triggerRef}
      className="inline-flex"
      onMouseEnter={() => {
        syncRect();
        setOpen(true);
      }}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => {
        syncRect();
        setOpen(true);
      }}
      onBlur={() => setOpen(false)}
    >
      {children}
    </span>
  );
}

function TooltipContent({
  children,
  className,
  side = "top",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { side?: OverlaySide }) {
  const { open, triggerRect } = useTooltipContext();

  if (!open || !triggerRect) {
    return null;
  }

  const position = getAnchoredPosition(triggerRect, side, 10);

  return (
    <OverlayPortal>
      <div
        role="tooltip"
        className={cn(
          "fixed z-50 rounded-md bg-foreground px-3 py-2 text-xs text-background shadow-lg",
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

export { Tooltip, TooltipContent, TooltipTrigger };
