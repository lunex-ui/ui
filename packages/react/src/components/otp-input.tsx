import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/utils";

const otpInputVariants = cva(
  "flex h-12 w-12 items-center justify-center rounded-md border border-field-border bg-field text-center text-base font-medium text-field-foreground shadow-sm transition-colors outline-none placeholder:text-field-placeholder focus-visible:border-focus focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "h-10 w-10 text-sm",
        md: "h-12 w-12 text-base",
        lg: "h-14 w-14 text-lg"
      },
      invalid: {
        true: "border-danger focus-visible:border-danger focus-visible:ring-danger",
        false: ""
      }
    },
    defaultVariants: {
      size: "md",
      invalid: false
    }
  }
);

export interface OtpInputProps
  extends Omit<
      React.InputHTMLAttributes<HTMLInputElement>,
      "size" | "value" | "defaultValue" | "onChange"
    >,
    VariantProps<typeof otpInputVariants> {
  length?: number;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  numeric?: boolean;
}

function sanitizeOtpValue(value: string, numeric: boolean) {
  const normalized = numeric
    ? value.replace(/[^0-9]/g, "")
    : value.replace(/[^a-zA-Z0-9]/g, "");

  return normalized.toUpperCase();
}

const OtpInput = React.forwardRef<HTMLInputElement, OtpInputProps>(
  (
    {
      className,
      defaultValue,
      disabled,
      id,
      invalid = false,
      length = 6,
      numeric = true,
      onComplete,
      onValueChange,
      size,
      value,
      ...props
    },
    ref
  ) => {
    const isControlled = value !== undefined;
    const [uncontrolledValue, setUncontrolledValue] = React.useState(() =>
      sanitizeOtpValue(defaultValue ?? "", numeric).slice(0, length)
    );
    const inputRefs = React.useRef<Array<HTMLInputElement | null>>([]);

    const resolvedValue = isControlled
      ? sanitizeOtpValue(value ?? "", numeric).slice(0, length)
      : uncontrolledValue;

    const characters = Array.from({ length }, (_, index) => resolvedValue[index] ?? "");

    const commitValue = React.useCallback(
      (nextValue: string) => {
        const sanitized = sanitizeOtpValue(nextValue, numeric).slice(0, length);

        if (!isControlled) {
          setUncontrolledValue(sanitized);
        }

        onValueChange?.(sanitized);

        if (sanitized.length === length) {
          onComplete?.(sanitized);
        }
      },
      [isControlled, length, numeric, onComplete, onValueChange]
    );

    React.useImperativeHandle(ref, () => inputRefs.current[0] as HTMLInputElement, []);

    return (
      <div className="flex flex-wrap gap-2">
        {characters.map((character, index) => (
          <input
            key={index}
            ref={(node) => {
              inputRefs.current[index] = node;
            }}
            id={index === 0 ? id : id ? `${id}-${index}` : undefined}
            inputMode={numeric ? "numeric" : "text"}
            autoComplete={index === 0 ? "one-time-code" : "off"}
            className={cn(otpInputVariants({ invalid, size }), className)}
            disabled={disabled}
            aria-invalid={invalid || undefined}
            maxLength={1}
            value={character}
            onChange={(event) => {
              const nextCharacter = sanitizeOtpValue(event.target.value, numeric).slice(
                0,
                1
              );
              const nextCharacters = [...characters];

              nextCharacters[index] = nextCharacter;
              commitValue(nextCharacters.join(""));

              if (nextCharacter && index < length - 1) {
                inputRefs.current[index + 1]?.focus();
                inputRefs.current[index + 1]?.select();
              }
            }}
            onKeyDown={(event) => {
              if (event.key === "Backspace" && !characters[index] && index > 0) {
                inputRefs.current[index - 1]?.focus();
                return;
              }

              if (event.key === "ArrowLeft" && index > 0) {
                event.preventDefault();
                inputRefs.current[index - 1]?.focus();
                return;
              }

              if (event.key === "ArrowRight" && index < length - 1) {
                event.preventDefault();
                inputRefs.current[index + 1]?.focus();
              }
            }}
            onFocus={(event) => {
              event.currentTarget.select();
            }}
            onPaste={(event) => {
              event.preventDefault();

              const pastedValue = sanitizeOtpValue(
                event.clipboardData.getData("text"),
                numeric
              ).slice(0, length - index);

              if (!pastedValue) {
                return;
              }

              const nextCharacters = [...characters];

              for (const [offset, pastedCharacter] of Array.from(pastedValue).entries()) {
                nextCharacters[index + offset] = pastedCharacter;
              }

              commitValue(nextCharacters.join(""));

              const nextIndex = Math.min(index + pastedValue.length, length - 1);
              inputRefs.current[nextIndex]?.focus();
              inputRefs.current[nextIndex]?.select();
            }}
            {...props}
          />
        ))}
      </div>
    );
  }
);

OtpInput.displayName = "OtpInput";

export { OtpInput, otpInputVariants };
