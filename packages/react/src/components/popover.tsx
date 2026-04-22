import * as React from "react";
import { createPortal } from "react-dom";

import { cn } from "../lib/utils";

type PopoverSide = "top" | "right" | "bottom" | "left";

interface PopoverContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRect: DOMRect | null;
  setTriggerRect: (rect: DOMRect | null) => void;
}

const PopoverContext = React.createContext<PopoverContextValue | null>(null);

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

  React.useEffect(() => {
    if (!resolvedOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [resolvedOpen, setOpen]);

  return (
    <PopoverContext.Provider
      value={{ open: resolvedOpen, setOpen, setTriggerRect, triggerRect }}
    >
      {children}
    </PopoverContext.Provider>
  );
}

function PopoverPortal({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return createPortal(children, document.body);
}

function PopoverTrigger({
  children
}: {
  children: React.ReactNode;
}) {
  const { open, setOpen, setTriggerRect } = usePopoverContext();
  const triggerRef = React.useRef<HTMLSpanElement>(null);

  const syncRect = React.useCallback(() => {
    setTriggerRect(triggerRef.current?.getBoundingClientRect() ?? null);
  }, [setTriggerRect]);

  React.useEffect(() => {
    if (!open) {
      return;
    }

    syncRect();

    const handleScrollOrResize = () => syncRect();

    window.addEventListener("resize", handleScrollOrResize);
    window.addEventListener("scroll", handleScrollOrResize, true);

    return () => {
      window.removeEventListener("resize", handleScrollOrResize);
      window.removeEventListener("scroll", handleScrollOrResize, true);
    };
  }, [open, syncRect]);

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

function getPopoverPosition(rect: DOMRect, side: PopoverSide) {
  const gap = 12;

  switch (side) {
    case "top":
      return {
        left: rect.left + rect.width / 2,
        top: rect.top - gap,
        transform: "translate(-50%, -100%)"
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
    case "bottom":
    default:
      return {
        left: rect.left + rect.width / 2,
        top: rect.bottom + gap,
        transform: "translateX(-50%)"
      };
  }
}

function PopoverContent({
  children,
  className,
  side = "bottom",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { side?: PopoverSide }) {
  const { open, setOpen, triggerRect } = usePopoverContext();
  const contentRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) {
      return;
    }

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;

      if (contentRef.current?.contains(target)) {
        return;
      }

      setOpen(false);
    };

    window.addEventListener("mousedown", handlePointerDown);

    return () => {
      window.removeEventListener("mousedown", handlePointerDown);
    };
  }, [open, setOpen]);

  if (!open || !triggerRect) {
    return null;
  }

  const position = getPopoverPosition(triggerRect, side);

  return (
    <PopoverPortal>
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
    </PopoverPortal>
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
