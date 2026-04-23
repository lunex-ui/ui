import * as React from "react";
import { createPortal } from "react-dom";

export type OverlaySide = "top" | "right" | "bottom" | "left";

export interface OverlayContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRect: DOMRect | null;
  setTriggerRect: (rect: DOMRect | null) => void;
}

export interface ControllableOpenProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function useControllableOpen({
  defaultOpen = false,
  onOpenChange,
  open
}: ControllableOpenProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
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

  return [resolvedOpen, setOpen] as const;
}

export function OverlayPortal({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return createPortal(children, document.body);
}

export function getAnchoredPosition(
  rect: DOMRect,
  side: OverlaySide,
  gap: number
) {
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

export function useEscapeDismiss(open: boolean, onDismiss: () => void) {
  React.useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onDismiss();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onDismiss, open]);
}

export function useAnchorSync(
  open: boolean,
  anchorRef: React.RefObject<HTMLElement | null>,
  setTriggerRect: (rect: DOMRect | null) => void
) {
  const syncRect = React.useCallback(() => {
    setTriggerRect(anchorRef.current?.getBoundingClientRect() ?? null);
  }, [anchorRef, setTriggerRect]);

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

  return syncRect;
}

export function useOutsidePointerDown(
  open: boolean,
  contentRef: React.RefObject<HTMLElement | null>,
  onDismiss: () => void
) {
  React.useEffect(() => {
    if (!open) {
      return;
    }

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;

      if (contentRef.current?.contains(target)) {
        return;
      }

      onDismiss();
    };

    window.addEventListener("mousedown", handlePointerDown);

    return () => {
      window.removeEventListener("mousedown", handlePointerDown);
    };
  }, [contentRef, onDismiss, open]);
}
