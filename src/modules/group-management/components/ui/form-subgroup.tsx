"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  name: z.string().min(2, "Nama subgroup minimal 2 karakter"),
  description: z.string().optional(),
});

type FormSubgroupProps = {
  onSuccess?: () => void;
  className?: string;
} & React.ComponentProps<"form">;

export function FormSubgroup({
  onSuccess,
  className,
  ...props
}: FormSubgroupProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("📌 Subgroup baru:", values);

    form.reset();
    if (onSuccess) onSuccess();
  }

  return (
    <Form {...form}>
      <form
        id="subgroupForm"
        onSubmit={form.handleSubmit(onSubmit)}
        className={`space-y-5 p-2 ${className || ""}`}
        {...props}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Subgroup</FormLabel>
              <FormControl>
                <Input placeholder="eg. Company" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subgroup Name</FormLabel>
              <FormControl>
                <Input placeholder="eg. IT Department" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
