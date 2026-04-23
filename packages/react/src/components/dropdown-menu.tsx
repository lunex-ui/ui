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

const DropdownMenuContext = React.createContext<OverlayContextValue | null>(null);

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
  const [triggerRect, setTriggerRect] = React.useState<DOMRect | null>(null);
  const [resolvedOpen, setOpen] = useControllableOpen({
    defaultOpen,
    onOpenChange,
    open
  });

  useEscapeDismiss(resolvedOpen, () => setOpen(false));

  return (
    <DropdownMenuContext.Provider
      value={{ open: resolvedOpen, setOpen, setTriggerRect, triggerRect }}
    >
      {children}
    </DropdownMenuContext.Provider>
  );
}

function DropdownMenuTrigger({
  children
}: {
  children: React.ReactNode;
}) {
  const { open, setOpen, setTriggerRect } = useDropdownMenuContext();
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

function DropdownMenuContent({
  children,
  className,
  side = "bottom",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { side?: OverlaySide }) {
  const { open, setOpen, triggerRect } = useDropdownMenuContext();
  const contentRef = React.useRef<HTMLDivElement>(null);
  useOutsidePointerDown(open, contentRef, () => setOpen(false));

  if (!open || !triggerRect) {
    return null;
  }

  const position = getAnchoredPosition(triggerRect, side, 8);

  return (
    <OverlayPortal>
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
    </OverlayPortal>
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

function DropdownMenuHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("px-2 py-2", className)} {...props} />;
}

function DropdownMenuTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("text-sm font-semibold leading-none text-foreground", className)}
      {...props}
    />
  );
}

function DropdownMenuDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("mt-1 text-xs text-muted-foreground", className)} {...props} />;
}

function DropdownMenuGroup({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("py-1", className)} {...props} />;
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

function DropdownMenuLink({
  className,
  inset = false,
  onClick,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { inset?: boolean }) {
  const { setOpen } = useDropdownMenuContext();

  return (
    <a
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

function DropdownMenuShortcut({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn("ml-auto pl-4 text-xs tracking-widest text-muted-foreground", className)}
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

function DropdownMenuFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("px-2 py-2", className)} {...props} />;
}

export {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuDescription,
  DropdownMenuFooter,
  DropdownMenuGroup,
  DropdownMenuHeader,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuLink,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTitle,
  DropdownMenuTrigger
};
