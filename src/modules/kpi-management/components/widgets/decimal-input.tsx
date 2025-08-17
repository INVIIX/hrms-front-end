import { Input } from "@/components/ui/input";
import { forwardRef, useState, useEffect } from "react";

type DecimalInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  onValueChange?: (value: number | null) => void;
  value?: string;
};

export const DecimalInput = forwardRef<HTMLInputElement, DecimalInputProps>(
  ({ onValueChange, value: propValue, ...props }, ref) => {
    const [displayValue, setDisplayValue] = useState<string>(propValue || "");
    const [, setRawValue] = useState<number | null>(null);

    useEffect(() => {
      if (propValue !== undefined && propValue !== null) {
        const strVal = String(propValue);
        setDisplayValue(strVal);
        setRawValue(parseFloat(strVal.replace(",", ".")));
      }
    }, [propValue]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let val = e.target.value.replace(/\D/g, "");
      if (val.length === 1) {
        val = "" + val;
      } else {
        const intPart = val.slice(0, val.length - 1);
        const decPart = val.slice(-1);
        val = intPart + "," + decPart;
      }

      setDisplayValue(val);
      const numeric = parseFloat(val.replace(",", "."));
      setRawValue(numeric);
      onValueChange?.(numeric);
    };

    return (
      <Input
        {...props}
        ref={ref}
        value={displayValue}
        onChange={handleChange}
        inputMode="decimal"
      />
    );
  }
);

DecimalInput.displayName = "DecimalInput";
