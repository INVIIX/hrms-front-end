"use client";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod/v4";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { errorValidation } from "@/lib/error-validation";
import apiClient from "@/lib/apiClient";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const formSchema = z.object({
  periode: z.string().refine((val) => ["2025", "2026"].includes(val), {
    message: "Periode must be male or female",
  }),
  kpi_score: z
    .string()
    .regex(/^\d+$/, "KPI hanya boleh angka")
    .length(2, "PKI harus 2 digit"),
  notes: z.string().optional(),
});

export function FormKPI({ className, ...props }: React.ComponentProps<"form">) {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      periode: "",
      kpi_score: "",
      notes: "",
    },
  });

  const {
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await apiClient.post("/auth/register", values);
      navigate("/login");
      toast.success("Registration success");
    } catch (err) {
      const error = err as AxiosError;
      errorValidation(error, setError);
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          id="ownForm"
          onSubmit={handleSubmit(onSubmit)}
          className={cn("w-full flex flex-col", className)}
          {...props}
        >
          <div className="space-y-5">
            <div className="flex gap-3">
              <FormField
                control={form.control}
                name="periode"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Evaluation Periode*</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={isSubmitting}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih periode" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2025">Januari 2025</SelectItem>
                          <SelectItem value="2026">Januari 2026</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-3">
              <FormField
                control={form.control}
                name="kpi_score"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>KPI Score (0-100)*</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="eg. 6"
                        {...field}
                        min={1}
                        max={99}
                        inputMode="numeric"
                        onInput={(e: React.FormEvent<HTMLInputElement>) => {
                          const target = e.currentTarget;
                          target.value = target.value.replace(/\D/g, "");
                          if (target.value.length > 2) {
                            target.value = target.value.slice(0, 2);
                          }
                          field.onChange(target.value);
                        }}
                        readOnly={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-3">
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Manager’s Evaluation Notes*</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="eg. Notes"
                        {...field}
                        readOnly={isSubmitting}
                        rows={5}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="Name" {...field} readOnly={isSubmitting} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="Email" {...field} readOnly={isSubmitting} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <InputPassword placeholder="Password" {...field} readOnly={isSubmitting} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password_confirmation"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <InputPassword placeholder="Confirm Password" {...field} readOnly={isSubmitting} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        /> */}
          </div>
        </form>
      </Form>
    </>
  );
}
