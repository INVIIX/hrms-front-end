"use client";

import { cn } from "@/lib/utils";
import { FormOwn } from "../ui/form-own";

export default function FormOwnWidget({
  className,
  // ...props
}: React.ComponentProps<"div">) {
  return (
    <>
      <FormOwn className={cn("w-full", className)} />
    </>
  );
}
