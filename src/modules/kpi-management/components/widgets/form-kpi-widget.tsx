"use client";

import { cn } from "@/lib/utils";
import { FormKPI } from "../ui/form-kpi";

export default function FormKPIWidget({
  className,
  // ...props
}: React.ComponentProps<"div">) {
  return (
    <>
      <FormKPI className={cn("w-full", className)} />
    </>
  );
}
