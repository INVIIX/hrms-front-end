"use client";

import { cn } from "@/lib/utils";
import { FormLeave } from "../ui/form-leave";

export default function FormLeaveWidget({
  className,
  // ...props
}: React.ComponentProps<"div">) {
  return (
    <>
      <FormLeave className={cn("w-full", className)} />
    </>
  );
}
