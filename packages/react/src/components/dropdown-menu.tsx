import * as React from "react";
import { createPortal } from "react-dom";

import { cn } from "../lib/utils";

type DropdownMenuSide = "top" | "right" | "bottom" | "left";

interface DropdownMenuContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRect: DOMRect | null;
  setTriggerRect: (rect: DOMRect | null) => void;
}

const DropdownMenuContext = React.createContext<DropdownMenuContextValue | null>(null);

function useDropdownMenuContext() {
  const context = React.useContext(DropdownMenuContext);

  if (!context) {
    throw new Error("DropdownMenu components must be used within a DropdownMenu.");
  }

  return context;
}

export interface DropdownMenuProps {
  children: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

function DropdownMenu({
  children,
  defaultOpen = false,
  onOpenChange,
  open
}: DropdownMenuProps) {
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
    <DropdownMenuContext.Provider
      value={{ open: resolvedOpen, setOpen, setTriggerRect, triggerRect }}
    >
      {children}
    </DropdownMenuContext.Provider>
  );
}

function DropdownMenuPortal({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return createPortal(children, document.body);
}

function DropdownMenuTrigger({
  children
}: {
  children: React.ReactNode;
}) {
  const { open, setOpen, setTriggerRect } = useDropdownMenuContext();
  const triggerRef = React.useRef<HTMLSpanElement>(null);

  const syncRect = React.useCallback(() => {
    setTriggerRect(triggerRef.current?.getBoundingClientRect() ?? null);
  }, [setTriggerRect]);

  React.useEffect(() => {
    if (!open) {
      return;
    }

    syncRect();

    const handleLayout = () => syncRect();

    window.addEventListener("resize", handleLayout);
    window.addEventListener("scroll", handleLayout, true);

    return () => {
      window.removeEventListener("resize", handleLayout);
      window.removeEventListener("scroll", handleLayout, true);
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

function getDropdownMenuPosition(rect: DOMRect, side: DropdownMenuSide) {
  const gap = 8;

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

function DropdownMenuContent({
  children,
  className,
  side = "bottom",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { side?: DropdownMenuSide }) {
  const { open, setOpen, triggerRect } = useDropdownMenuContext();
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

  const position = getDropdownMenuPosition(triggerRect, side);

  return (
    <DropdownMenuPortal>
      <div
        ref={contentRef}
        role="menu"
        className={cn(
          "fixed z-50 min-w-48 rounded-xl border border-border bg-background p-1.5 text-foreground shadow-lg",
          className
        )}
        style={position}
        {...props}
      >
        {children}
      </div>
    </DropdownMenuPortal>
  );
}

function DropdownMenuLabel({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("px-2 py-1.5 text-xs font-medium text-muted-foreground", className)} {...props} />
  );
}

function DropdownMenuItem({
  className,
  inset = false,
  onClick,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { inset?: boolean }) {
  const { setOpen } = useDropdownMenuContext();

  return (
    <button
      type="button"
      role="menuitem"
      className={cn(
        "flex w-full items-center rounded-md px-2 py-2 text-sm transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus",
        inset ? "pl-8" : "",
        className
      )}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
          setOpen(false);
        }
      }}
      {...props}
    />
  );
}

function DropdownMenuSeparator({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("my-1 h-px w-full bg-border", className)} {...props} />;
}

export {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
};
