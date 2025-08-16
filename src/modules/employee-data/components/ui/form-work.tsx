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

const formSchema = z.object({
  nip: z
    .string()
    .regex(/^\d+$/, "NIP hanya boleh angka")
    .length(16, "NIP harus 16 digit"),
  hire_date: z.string().min(1, "Tanggal penerimaan wajib diisi"),
  jenis_karyawan: z
    .string()
    .refine((val) => ["tetap", "pkwt", "magang"].includes(val), {
      message: "Jenis karyawan harap diisi",
    }),
  status_kepegawaian: z
    .string()
    .refine((val) => ["aktif", "cuti", "resign", "terminated"].includes(val), {
      message: "Status kepegawaian",
    }),
  department: z.string().refine((val) => ["A", "B"].includes(val), {
    message: "Department",
  }),
  start_date: z.string().min(1, "Tanggal awal harus diisi"),
  end_date: z.string().min(1, "Tanggal akhir harus diisi"),
  location: z.string().min(1, "Lokasi kerja harus diisi"),
  first_line_manager: z.string().min(1, "Atasan langsung harus diisi"),
  no_sk_kontrak: z
    .string()
    .regex(/^\d+$/, "NO SK hanya boleh angka")
    .length(16, "NO SK harus 16 digit"),
  no_sk_jabatan: z
    .string()
    .regex(/^\d+$/, "NO SK hanya boleh angka")
    .length(16, "NO SK harus 16 digit"),
});

export function FormWork({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nip: "",
      hire_date: "",
      jenis_karyawan: "tetap",
      status_kepegawaian: "aktif",
      department: "A",
      start_date: "",
      end_date: "",
      location: "",
      first_line_manager: "",
      no_sk_kontrak: "",
      no_sk_jabatan: "",
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
                name="nip"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>NIP*</FormLabel>
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
              <FormField
                control={form.control}
                name="hire_date"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Hire Date*</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        placeholder="text"
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
                name="jenis_karyawan"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Jenis Karyawan*</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={isSubmitting}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih jenis karyawan" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tetap">Tetap</SelectItem>
                          <SelectItem value="pkwt">PKWT</SelectItem>
                          <SelectItem value="magang">Magang</SelectItem>
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
                name="status_kepegawaian"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Status Kepegawaian</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={isSubmitting}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih status kepegawaian" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="aktif">Aktif</SelectItem>
                          <SelectItem value="cuti">Cuti</SelectItem>
                          <SelectItem value="resign">Resign</SelectItem>
                          <SelectItem value="terminated">Terminated</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Department*</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={isSubmitting}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="A">A Level</SelectItem>
                          <SelectItem value="B">B Level</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex-1"></div>
            </div>
            <div className="flex gap-3">
              <FormField
                control={form.control}
                name="start_date"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Start Date*</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        placeholder="text"
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
                name="end_date"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>End Date*</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        placeholder="text"
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
                name="location"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Lokasi Kerja*</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="eg. Jl. Musho..."
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
                name="first_line_manager"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>First Line Manager*</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="eg. Jhon Doe"
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
                name="no_sk_kontrak"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>No. SK Kontrak*</FormLabel>
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
              <FormField
                control={form.control}
                name="no_sk_jabatan"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>No. SK Jabatan / Gaji*</FormLabel>
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
