"use client";

import { cn } from "@/lib/utils";
import { FormEducation } from "../ui/form-education";

export default function FormEducationWidget({
  className,
  // ...props
}: React.ComponentProps<"div">) {
  return (
    <>
      <FormEducation className={cn("w-full", className)} />
    </>
  );
}
