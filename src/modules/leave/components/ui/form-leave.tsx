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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-button";
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tooltip } from "@radix-ui/react-tooltip";
import { InfoIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  leave_type: z.string().min(1, "Jenis leave wajib diisi"),
  min_duration: z
    .string()
    .regex(/^\d+$/, "Min duration hanya boleh angka")
    .length(2, "Min duration harus 2 digit"),
  max_duration: z
    .string()
    .regex(/^\d+$/, "Max duration hanya boleh angka")
    .length(2, "Max duration harus 2 digit"),
  required_approval: z.string().optional(),
  supervisor_email: z.string().optional(),
  annual_leave: z.string().optional(),
  unit_type: z.string().optional(),
  min_notice: z.string().refine((val) => ["1", "7", "15", "30"].includes(val), {
    message: "Gender must be male or female",
  }),
  descriptions: z.string().optional(),
});

export function FormLeave({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      leave_type: "",
      min_duration: "",
      max_duration: "",
      required_approval: "",
      supervisor_email: "",
      annual_leave: "",
      unit_type: "",
      min_notice: "",
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
                name="leave_type"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Leave Type Name*</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="eg. Cuti Melahirkan"
                        {...field}
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
                name="min_duration"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Min. Duration (Days)*</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="eg. 1"
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
              <FormField
                control={form.control}
                name="max_duration"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Max. Duration (Days)*</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="eg. 20"
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
                <div className="flex flex-col gap-3">
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

                  {field.value === "true" && (
                    <FormField
                      control={form.control}
                      name="supervisor_email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Supervisor Email*</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="eg. supervisor@company.com"
                              {...field}
                              readOnly={isSubmitting}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="annual_leave"
              render={({ field }) => (
                <FormItem className="flex gap-3 justify-between items-center">
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold dark:text-gray-800">
                      Annual Leave?
                    </span>
                    <span className="text-sm text-gray-400">
                      Is the leave type annual leave?
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
                      <span className="w-14 h-8 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 transition"></span>
                      <span className="absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition peer-checked:translate-x-6"></span>
                    </label>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="unit_type"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <span className="text-sm font-semibold dark:text-gray-800">
                    Unit Type
                  </span>
                  <span className="text-sm text-gray-400">
                    Please select the unit type.
                  </span>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="flex gap-4 mt-2"
                    >
                      <FormItem className="flex items-center gap-2">
                        <RadioGroupItem value="days" />
                        <FormLabel className="text-sm">
                          Aktual (A)
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <InfoIcon className="w-4 h-4 text-gray-400 cursor-pointer" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>
                                  Hitungan cuti berdasarkan hari aktual kerja.
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center gap-2">
                        <RadioGroupItem value="hours" />
                        <FormLabel className="text-sm">
                          Kalender (K)
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <InfoIcon className="w-4 h-4 text-gray-400 cursor-pointer" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>
                                  Hitungan cuti berdasarkan kalender (hari
                                  total).
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-3">
              <FormField
                control={form.control}
                name="min_notice"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Minimal Notice (days)*</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={isSubmitting}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih minimal notice" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Days</SelectItem>
                          <SelectItem value="7">7 Days</SelectItem>
                          <SelectItem value="15">15 Days</SelectItem>
                          <SelectItem value="30">30 Days</SelectItem>
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
          </div>
        </form>
      </Form>
    </>
  );
}
