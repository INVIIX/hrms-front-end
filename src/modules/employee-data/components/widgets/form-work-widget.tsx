"use client";

import { cn } from "@/lib/utils";
import { FormWork } from "../ui/form-work";

export default function FormWorkWidget({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <>
      <FormWork className={cn("w-full", className)} />
    </>
  );
}
