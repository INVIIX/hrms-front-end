"use client";

import { cn } from "@/lib/utils";
import { FormSubgroup } from "../ui/form-subgroup";

export default function FormSubgroupWidget({
  className,
  // ...props
}: React.ComponentProps<"div">) {
  return (
    <>
      <FormSubgroup className={cn("w-full", className)} />
    </>
  );
}
