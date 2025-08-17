import { Input } from "@/components/ui/input";
import { forwardRef } from "react";
import { formatRupiah } from "../../../../lib/format";

type RupiahInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  onValueChange?: (value: string) => void;
  value?: string;
};

export const RupiahInput = forwardRef<HTMLInputElement, RupiahInputProps>(
  ({ onValueChange, value, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value.replace(/\D/g, "");
      onValueChange?.(raw);
    };

    return (
      <Input
        {...props}
        ref={ref}
        value={formatRupiah(value || "")}
        onChange={handleChange}
        inputMode="numeric"
      />
    );
  }
);

RupiahInput.displayName = "RupiahInput";
