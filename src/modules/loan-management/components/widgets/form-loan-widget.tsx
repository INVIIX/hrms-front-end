"use client";

import { cn } from "@/lib/utils";
import { FormLoan } from "../ui/form-loan";

export default function FormLoanWidget({
  className,
  // ...props
}: React.ComponentProps<"div">) {
  return (
    <>
      <FormLoan className={cn("w-full", className)} />
    </>
  );
}
