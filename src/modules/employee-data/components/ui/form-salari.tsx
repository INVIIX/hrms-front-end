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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RupiahInput } from "../widgets/rupiah-input";

const formSchema = z.object({
  gaji_pokok: z.string().regex(/^\d+$/, "Gaji hanya boleh angka").length(15),
  nama_bank: z
    .string()
    .refine(
      (val) => ["BCA", "BNI", "BRI", "BSI", "Mandiri", "Seabank"].includes(val),
      {
        message: "Bank harap diisi",
      }
    ),
  nomor_rekening: z
    .string()
    .regex(/^\d+$/, "Nomor rekening hanya boleh angka")
    .length(16),
  tunjangan_tetap: z
    .string()
    .regex(/^\d+$/, "Tunjangan tetap hanya boleh angka")
    .length(15),
  tunjangan_tidak_tetap: z
    .string()
    .regex(/^\d+$/, "Tunjangan tidak tetap hanya boleh angka")
    .length(15),
  bpjs: z.string().regex(/^\d+$/, "BPJS hanya boleh angka").length(15),
  pajak: z.string().regex(/^\d+$/, "Pajak hanya boleh angka").length(15),
  koperasi: z.string().regex(/^\d+$/, "Koperasi hanya boleh angka").length(15),
  lainnya: z.string().regex(/^\d+$/, "Lainnya hanya boleh angka").length(15),
  status_ptkp: z
    .string()
    .refine((val) => ["TK/0", "K/0", "K/1", "K/2"].includes(val), {
      message: "Status PTPK",
    }),
  no_npwp: z.string().regex(/^\d+$/, "No NPWP hanya boleh angka").length(16),
});

export function FormSalari({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gaji_pokok: "",
      nama_bank: "BCA",
      nomor_rekening: "",
      tunjangan_tetap: "",
      tunjangan_tidak_tetap: "",
      bpjs: "",
      pajak: "",
      koperasi: "",
      lainnya: "",
      status_ptkp: "TK/0",
      no_npwp: "",
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
          onSubmit={handleSubmit(onSubmit)}
          className={cn("w-full flex flex-col", className)}
          {...props}
        >
          <div className="space-y-5">
            <div className="flex gap-3">
              <FormField
                control={form.control}
                name="gaji_pokok"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Gaji Pokok*</FormLabel>
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
              <FormField
                control={form.control}
                name="nama_bank"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Nama Bank*</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={isSubmitting}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih bank" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bca">BCA</SelectItem>
                          <SelectItem value="bni">BNI</SelectItem>
                          <SelectItem value="bri">BRI</SelectItem>
                          <SelectItem value="bsi">BSI</SelectItem>
                          <SelectItem value="mandiri">Mandiri</SelectItem>
                          <SelectItem value="seabank">Seabank</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nomor_rekening"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Nomor Rekening*</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="eg. 0000000000000000"
                        {...field}
                        inputMode="numeric"
                        maxLength={16}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, "");
                          field.onChange(value);
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
                name="tunjangan_tetap"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Tunjangan Tetap*</FormLabel>
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
              <FormField
                control={form.control}
                name="tunjangan_tidak_tetap"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Tunjangan Tidak Tetap*</FormLabel>
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
            <div className="font-semibold text-sm bg-gray-800 w-fit px-3 py-1 rounded-md text-white items-center">
              Potongan
            </div>
            <div className="flex gap-3">
              <FormField
                control={form.control}
                name="bpjs"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>BPJS*</FormLabel>
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
              <FormField
                control={form.control}
                name="pajak"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Pajak*</FormLabel>
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
                name="koperasi"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Koperasi*</FormLabel>
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
              <FormField
                control={form.control}
                name="lainnya"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Lainnya*</FormLabel>
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
            <div className="font-semibold text-sm bg-gray-800 w-fit px-3 py-1 rounded-md text-white items-center">
              Pajak
            </div>
            <div className="flex gap-3">
              <FormField
                control={form.control}
                name="status_ptkp"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Status PTKP*</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={isSubmitting}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="TK/0">TK/0</SelectItem>
                          <SelectItem value="K/0">K/0</SelectItem>
                          <SelectItem value="K/1">K/1</SelectItem>
                          <SelectItem value="K/2">K/2</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="no_npwp"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>No. NPWP*</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="eg. 0000000000000000"
                        {...field}
                        inputMode="numeric"
                        maxLength={16}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, "");
                          field.onChange(value);
                        }}
                        readOnly={isSubmitting}
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
