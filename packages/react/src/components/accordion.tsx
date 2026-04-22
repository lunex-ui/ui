import * as React from "react";

import { cn } from "../lib/utils";

interface AccordionContextValue {
  collapsible: boolean;
  currentValue?: string;
  onItemToggle: (value: string) => void;
}

interface AccordionItemContextValue {
  open: boolean;
  value: string;
}

const AccordionContext = React.createContext<AccordionContextValue | null>(null);
const AccordionItemContext = React.createContext<AccordionItemContextValue | null>(null);

function useAccordionContext() {
  const context = React.useContext(AccordionContext);

  if (!context) {
    throw new Error("Accordion components must be used within an Accordion.");
  }

  return context;
}

function useAccordionItemContext() {
  const context = React.useContext(AccordionItemContext);

  if (!context) {
    throw new Error("Accordion item components must be used within AccordionItem.");
  }

  return context;
}

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string | undefined) => void;
  collapsible?: boolean;
}

function Accordion({
  children,
  className,
  collapsible = true,
  defaultValue,
  onValueChange,
  value,
  ...props
}: AccordionProps) {
  const isControlled = value !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue);
  const currentValue = isControlled ? value : uncontrolledValue;

  const onItemToggle = React.useCallback(
    (nextValue: string) => {
      const resolvedValue =
        collapsible && currentValue === nextValue ? undefined : nextValue;

      if (!isControlled) {
        setUncontrolledValue(resolvedValue);
      }

      onValueChange?.(resolvedValue);
    },
    [collapsible, currentValue, isControlled, onValueChange]
  );

  return (
    <AccordionContext.Provider value={{ collapsible, currentValue, onItemToggle }}>
      <div className={cn("w-full rounded-lg border border-border", className)} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

function AccordionItem({
  children,
  className,
  value,
  ...props
}: AccordionItemProps) {
  const { currentValue } = useAccordionContext();
  const open = currentValue === value;

  return (
    <AccordionItemContext.Provider value={{ open, value }}>
      <div
        className={cn("border-b border-border last:border-b-0", className)}
        data-state={open ? "open" : "closed"}
        {...props}
      >
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
}

function AccordionTrigger({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { onItemToggle } = useAccordionContext();
  const { open, value } = useAccordionItemContext();

  return (
    <button
      type="button"
      className={cn(
        "flex w-full items-center justify-between gap-4 px-4 py-4 text-left text-sm font-medium text-foreground transition-colors hover:bg-muted/40",
        className
      )}
      onClick={(event) => {
        props.onClick?.(event);
        if (!event.defaultPrevented) {
          onItemToggle(value);
        }
      }}
      aria-expanded={open}
      {...props}
    >
      <span>{children}</span>
      <span
        aria-hidden="true"
        className={cn("text-muted-foreground transition-transform", open ? "rotate-180" : "")}
      >
        v
      </span>
    </button>
  );
}

function AccordionContent({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { open } = useAccordionItemContext();

  if (!open) {
    return null;
  }

  return (
    <div className={cn("px-4 pb-4 text-sm text-muted-foreground", className)} {...props}>
      {children}
    </div>
  );
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
