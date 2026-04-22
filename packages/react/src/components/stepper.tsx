import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/utils";

type StepStatus = "upcoming" | "current" | "complete";

interface StepperContextValue {
  currentStep: number;
}

const StepperContext = React.createContext<StepperContextValue | null>(null);

const stepperVariants = cva("flex gap-4", {
  variants: {
    orientation: {
      horizontal: "flex-col md:flex-row md:items-start",
      vertical: "flex-col"
    }
  },
  defaultVariants: {
    orientation: "vertical"
  }
});

const stepperItemVariants = cva("relative flex min-w-0 gap-3", {
  variants: {
    orientation: {
      horizontal: "flex-1 flex-col",
      vertical: "flex-col"
    }
  },
  defaultVariants: {
    orientation: "vertical"
  }
});

const stepperIndicatorVariants = cva(
  "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-sm font-semibold transition-colors",
  {
    variants: {
      status: {
        upcoming: "border-border bg-background text-muted-foreground",
        current: "border-brand bg-brand text-brand-foreground shadow-sm",
        complete: "border-brand bg-brand-soft text-brand-soft-foreground"
      }
    },
    defaultVariants: {
      status: "upcoming"
    }
  }
);

function useStepperContext() {
  const context = React.useContext(StepperContext);

  if (!context) {
    throw new Error("Stepper components must be used within <Stepper />.");
  }

  return context;
}

export interface StepperProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stepperVariants> {
  currentStep?: number;
}

function Stepper({
  children,
  className,
  currentStep = 1,
  orientation,
  ...props
}: StepperProps) {
  return (
    <StepperContext.Provider value={{ currentStep }}>
      <div
        className={cn(stepperVariants({ orientation }), className)}
        {...props}
      >
        {children}
      </div>
    </StepperContext.Provider>
  );
}

export interface StepperItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stepperItemVariants> {
  step: number;
}

function StepperItem({
  children,
  className,
  orientation,
  step,
  ...props
}: StepperItemProps) {
  const { currentStep } = useStepperContext();
  const status: StepStatus =
    step < currentStep ? "complete" : step === currentStep ? "current" : "upcoming";

  return (
    <div
      className={cn(stepperItemVariants({ orientation }), className)}
      data-status={status}
      {...props}
    >
      {children}
    </div>
  );
}

function StepperIndicator({
  children,
  className,
  step
}: React.HTMLAttributes<HTMLDivElement> & { step: number }) {
  const { currentStep } = useStepperContext();
  const status: StepStatus =
    step < currentStep ? "complete" : step === currentStep ? "current" : "upcoming";

  return (
    <div className={cn(stepperIndicatorVariants({ status }), className)}>
      {children ?? (status === "complete" ? "OK" : step)}
    </div>
  );
}

function StepperContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("space-y-1", className)} {...props} />;
}

function StepperTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("text-sm font-semibold text-foreground", className)}
      {...props}
    />
  );
}

function StepperDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm text-muted-foreground", className)} {...props} />;
}

function StepperSeparator({
  className,
  orientation = "vertical",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { orientation?: "horizontal" | "vertical" }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "bg-border",
        orientation === "horizontal" ? "hidden h-px flex-1 md:block" : "ml-4 h-8 w-px",
        className
      )}
      {...props}
    />
  );
}

export {
  Stepper,
  StepperContent,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  stepperIndicatorVariants,
  stepperItemVariants,
  stepperVariants
};
