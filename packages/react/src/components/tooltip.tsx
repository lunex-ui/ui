import * as React from "react";
import { createPortal } from "react-dom";

import { cn } from "../lib/utils";

type TooltipSide = "top" | "right" | "bottom" | "left";

interface TooltipContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRect: DOMRect | null;
  setTriggerRect: (rect: DOMRect | null) => void;
}

const TooltipContext = React.createContext<TooltipContextValue | null>(null);

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
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const [triggerRect, setTriggerRect] = React.useState<DOMRect | null>(null);
  const isControlled = open !== undefined;
  const resolvedOpen = isControlled ? open : uncontrolledOpen;

  const setOpen = React.useCallback(
    (nextOpen: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(nextOpen);
      }

      onOpenChange?.(nextOpen);
    },
    [isControlled, onOpenChange]
  );

  return (
    <TooltipContext.Provider
      value={{ open: resolvedOpen, setOpen, setTriggerRect, triggerRect }}
    >
      {children}
    </TooltipContext.Provider>
  );
}

function TooltipPortal({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return createPortal(children, document.body);
}

function TooltipTrigger({
  children
}: {
  children: React.ReactNode;
}) {
  const { setOpen, setTriggerRect } = useTooltipContext();
  const triggerRef = React.useRef<HTMLSpanElement>(null);

  const syncRect = React.useCallback(() => {
    setTriggerRect(triggerRef.current?.getBoundingClientRect() ?? null);
  }, [setTriggerRect]);

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

function getTooltipPosition(rect: DOMRect, side: TooltipSide) {
  const gap = 10;

  switch (side) {
    case "bottom":
      return {
        left: rect.left + rect.width / 2,
        top: rect.bottom + gap,
        transform: "translateX(-50%)"
      };
    case "left":
      return {
        left: rect.left - gap,
        top: rect.top + rect.height / 2,
        transform: "translate(-100%, -50%)"
      };
    case "right":
      return {
        left: rect.right + gap,
        top: rect.top + rect.height / 2,
        transform: "translateY(-50%)"
      };
    case "top":
    default:
      return {
        left: rect.left + rect.width / 2,
        top: rect.top - gap,
        transform: "translate(-50%, -100%)"
      };
  }
}

function TooltipContent({
  children,
  className,
  side = "top",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { side?: TooltipSide }) {
  const { open, triggerRect } = useTooltipContext();

  if (!open || !triggerRect) {
    return null;
  }

  const position = getTooltipPosition(triggerRect, side);

  return (
    <TooltipPortal>
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
    </TooltipPortal>
  );
}

export { Tooltip, TooltipContent, TooltipTrigger };
