"use client";

import { cn } from "@/lib/utils";
import { FormSalari } from "../ui/form-salari";

export default function FormSalariWidget({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <>
      <FormSalari className={cn("w-full", className)} />
    </>
  );
}
