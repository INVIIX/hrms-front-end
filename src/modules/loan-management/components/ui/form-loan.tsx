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
import { RupiahInput } from "../widgets/rupiah-input";
import { Textarea } from "@/components/ui/textarea";
import { DecimalInput } from "../widgets/decimal-input";

const formSchema = z.object({
  loan_type: z.string().min(1, "Jenis loan wajib diisi"),
  max_amount: z
    .string()
    .regex(/^\d+$/, "Amount hanya boleh angka")
    .length(15, "Amount harus 16 digit"),
  interest_rate: z.string().min(1, "Interest rate wajib diisi"),
  max_tenure: z
    .string()
    .regex(/^\d+$/, "Max tenure hanya boleh angka")
    .length(15, "Max tenure harus 16 digit"),
  required_approval: z.string().optional(),
  descriptions: z.string().optional(),
});

export function FormLoan({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      loan_type: "",
      max_amount: "",
      interest_rate: "",
      max_tenure: "",
      required_approval: "",
      descriptions: "",
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
                name="loan_type"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Loan Type Name*</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="eg. Education Loan"
                        {...field}
                        readOnly={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="max_amount"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Max. Ammount*</FormLabel>
                    <FormControl>
                      <RupiahInput
                        {...field}
                        onValueChange={(val) => field.onChange(val)}
                        placeholder="Rp. 0.000.000"
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
                name="interest_rate"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Interest Rate (%)*</FormLabel>
                    <FormControl>
                      <DecimalInput
                        placeholder="eg. 8,5"
                        {...field}
                        readOnly={isSubmitting}
                        onValueChange={(val) => field.onChange(val)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="max_tenure"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Max. Tenure (Months)*</FormLabel>
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
            <FormField
              control={form.control}
              name="required_approval"
              render={({ field }) => (
                <FormItem className="flex gap-3 justify-between items-center">
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold dark:text-gray-800">
                      Require Approval
                    </span>
                    <span className="text-sm text-gray-400">
                      Manager approval required for this loan type
                    </span>
                  </div>
                  <FormControl>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={field.value === "true"}
                        onChange={(e) =>
                          field.onChange(e.target.checked ? "true" : "false")
                        }
                        className="sr-only peer"
                      />
                      <div className="w-14 h-8 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 transition"></div>
                      <div className="absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition peer-checked:translate-x-6"></div>
                    </label>
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex gap-3">
              <FormField
                control={form.control}
                name="descriptions"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="eg. Description"
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
