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
  nik: z
    .string()
    .regex(/^\d+$/, "NIK hanya boleh angka")
    .length(16, "NIK harus 16 digit"),
  ktp: z
    .string()
    .regex(/^\d+$/, "KTP hanya boleh angka")
    .length(16, "KTP harus 16 digit"),
  npwp: z
    .string()
    .regex(/^\d+$/, "NPWP hanya boleh angka")
    .length(16, "NPWP harus 16 digit"),
  nama_lengkap: z.string().min(1, "Nama lengkap wajib diisi"),
  gender: z.string().refine((val) => ["male", "female"].includes(val), {
    message: "Gender must be male or female",
  }),
  tempat_tanggal_lahir: z.string().min(1, "Tempat, tanggal lahir wajib diisi"),
  alamat_tinggal: z.string(),
  alamat_ktp: z.string(),
  status_pernikahan: z
    .string()
    .refine(
      (val) =>
        ["belum_kawin", "kawin", "cerai_hidup", "cerai_mati"].includes(val),
      {
        message: "Gender must be male or female",
      }
    ),
  agama: z
    .string()
    .refine(
      (val) =>
        [
          "islam",
          "kristen_protestan",
          "kristen_katolik",
          "hindu",
          "budha",
          "khonghucu",
          "lainnya",
        ].includes(val),
      {
        message: "Gender must be male or female",
      }
    ),
  kewarganegaraan: z.string().refine((val) => ["wni", "wna"].includes(val), {
    message: "Gender must be male or female",
  }),
  bpjs_kesehatan: z
    .string()
    .regex(/^\d+$/, "NO BPJS hanya boleh angka")
    .length(16, "NO BPJS harus 16 digit"),
  bpjs_ketenagakerjaan: z
    .string()
    .regex(/^\d+$/, "NO BPJS hanya boleh angka")
    .length(16, "NO BPJS harus 16 digit"),
});

export function FormOwn({ className, ...props }: React.ComponentProps<"form">) {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nik: "",
      ktp: "",
      npwp: "",
      nama_lengkap: "",
      gender: "male",
      tempat_tanggal_lahir: "",
      alamat_tinggal: "",
      alamat_ktp: "",
      status_pernikahan: "",
      agama: "",
      kewarganegaraan: "",
      bpjs_kesehatan: "",
      bpjs_ketenagakerjaan: "",
    },
  });

  const {
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log("values")
      // await apiClient.post("/auth/register", values);
      // navigate("/login");
      // toast.success("Registration success");
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
                name="nik"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>NIK*</FormLabel>
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
                name="ktp"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>No. KTP / Passport*</FormLabel>
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
                name="npwp"
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
            <div className="flex gap-3">
              <FormField
                control={form.control}
                name="nama_lengkap"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Nama Lengkap*</FormLabel>
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
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Jenis Kelamin</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={isSubmitting}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih jenis kelamin" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Laki-laki</SelectItem>
                          <SelectItem value="female">Perempuan</SelectItem>
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
                name="tempat_tanggal_lahir"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Tempat, Tanggal Lahir*</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="eg. Jakarta, 21 Juli 1950"
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
                name="alamat_tinggal"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Alamat Tempat Tinggal*</FormLabel>
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
                name="alamat_ktp"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Alamat KTP*</FormLabel>
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
            </div>
            <div className="flex gap-3">
              <FormField
                control={form.control}
                name="status_pernikahan"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Status Pernikahan*</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={isSubmitting}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih status pernikahan" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="belum_kawin">
                            Belum Kawin
                          </SelectItem>
                          <SelectItem value="kawin">Kawin</SelectItem>
                          <SelectItem value="cerai_hidup">
                            Cerai Hidup
                          </SelectItem>
                          <SelectItem value="cerai_mati">Cerai Mati</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="agama"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Agama*</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={isSubmitting}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih agama" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Islam">Islam</SelectItem>
                          <SelectItem value="kristen_protestan">
                            Kristen Protestan
                          </SelectItem>
                          <SelectItem value="kristen_katolik">
                            Kristen Katolik
                          </SelectItem>
                          <SelectItem value="hindu">Hindu</SelectItem>
                          <SelectItem value="budha">Budha</SelectItem>
                          <SelectItem value="khonghucu">Khonghucu</SelectItem>
                          <SelectItem value="lainnya">Lainnya</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="kewarganegaraan"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Kewarganegaraan*</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={isSubmitting}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih kewarganegaraan" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="wni">WNI</SelectItem>
                          <SelectItem value="wna">WNA</SelectItem>
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
                name="bpjs_kesehatan"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>No. BPJS Kesehatan*</FormLabel>
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
                name="bpjs_ketenagakerjaan"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>No. BPJS Ketenagakerjaan*</FormLabel>
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
