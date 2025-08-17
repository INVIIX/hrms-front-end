"use client";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod/v4";
import { useFieldArray, useForm } from "react-hook-form";
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
import { SquarePen, Trash } from "lucide-react";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import { useState } from "react";
// import { Card } from "@/components/ui/card";
// import { FaFileExcel } from "react-icons/fa6";
import DragAndDropUpload from "./drag-drop";

const formSchemaEducation = z.object({
  educations: z.array(
    z.object({
      universitas: z.string().min(1, "Nama universitas wajib diisi"),
      pendidikan_terakhir: z.string().min(1, "Pendidikan terakhir wajib diisi"),
      tahun_masuk: z.string().min(1, "Tahun masuk wajib diisi"),
      tahun_keluar: z.string().min(1, "Tahun keluar wajib diisi"),
    })
  ),
});

const formSchemaCertification = z.object({
  certifications: z.array(
    z.object({
      sertifikat: z.string().min(1, "Nama sertifikat wajib diisi"),
      pelatihan: z.string().min(1, "Nama pelatihan wajib diisi"),
      file: z.string().optional(),
      tanggal_mulai: z.string().min(1, "Tanggal mulai wajib diisi"),
      tanggal_selesai: z.string().min(1, "Tanggal selesai wajib diisi"),
    })
  ),
});

export function FormEducation({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const navigate = useNavigate();

  const [savedEducations, setSavedEducations] = useState<any[]>([]);
  const [editIndexEdu, setEditIndexEdu] = useState<number | null>(null);

  const [savedCertifications, setSavedCertifications] = useState<any[]>([]);
  const [editIndexCert, setEditIndexCert] = useState<number | null>(null);

  const form = useForm<
    z.infer<typeof formSchemaEducation> &
      z.infer<typeof formSchemaCertification>
  >({
    resolver: zodResolver(formSchemaEducation.merge(formSchemaCertification)),
    defaultValues: {
      educations: [],
      certifications: [],
    },
  });

  const {
    control,
    handleSubmit,
    setError,
    getValues,
    formState: { isSubmitting },
  } = form;

  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({
    control,
    name: "educations",
  });

  const {
    fields: certificationFields,
    append: appendCertification,
    remove: removeCertification,
  } = useFieldArray({
    control,
    name: "certifications",
  });

  async function onSubmit(values: z.infer<typeof formSchemaEducation>) {
    try {
      console.log("Submit values:", values);
      await apiClient.post("/auth/register", values);
      navigate("/login");
      toast.success("Registration success");
    } catch (err) {
      const error = err as AxiosError;
      errorValidation(error, setError);
    }
  }

  const handleSaveEducation = (index: number) => {
    const edu = getValues(`educations.${index}`);
    if (editIndexEdu !== null) {
      setSavedEducations((prev) =>
        prev.map((item, i) => (i === editIndexEdu ? edu : item))
      );
      setEditIndexEdu(null);
    } else {
      setSavedEducations((prev) => [...prev, edu]);
    }
    removeEducation(index);
  };

  const handleDeleteEducation = (index: number) => {
    setSavedEducations((prev) => prev.filter((_, i) => i !== index));
  };

  const handleEditEducation = (index: number) => {
    const edu = savedEducations[index];
    appendEducation(edu);
    setEditIndexEdu(index);
  };

  const handleSaveCertification = (index: number) => {
    const cert = getValues(`certifications.${index}`);
    if (editIndexCert !== null) {
      setSavedCertifications((prev) =>
        prev.map((item, i) => (i === editIndexCert ? cert : item))
      );
      setEditIndexCert(null);
    } else {
      setSavedCertifications((prev) => [...prev, cert]);
    }
    removeCertification(index);
  };

  const handleDeleteCertification = (index: number) => {
    setSavedCertifications((prev) => prev.filter((_, i) => i !== index));
  };

  const handleEditCertification = (index: number) => {
    const cert = savedCertifications[index];
    appendCertification(cert);
    setEditIndexCert(index);
  };

  return (
    <>
      <Form {...form}>
        <form
          id="educationForm"
          onSubmit={handleSubmit(onSubmit)}
          className={cn("w-full flex flex-col", className)}
          {...props}
        >
          <div className="space-y-5">
            <div className="font-semibold text-sm bg-gray-800 w-fit px-3 py-1 rounded-md text-white items-center">
              Educations
            </div>

            {savedEducations.length > 0 && (
              <div className="space-y-3">
                {savedEducations.map((edu, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-md bg-gray-50 text-sm flex justify-between items-center dark:text-gray-800"
                  >
                    <div>
                      <div className="font-semibold text-lg">
                        {edu.universitas}
                      </div>
                      <div>
                        {edu.pendidikan_terakhir}{" "}
                        <span className="text-gray-400 text-xs ms-5">
                          {new Date(edu.tahun_masuk).getFullYear()} -{" "}
                          {new Date(edu.tahun_keluar).getFullYear()}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => handleEditEducation(i)}
                        className="px-1 py-1 text-xs bg-gray-200 text-gray-600 hover:text-gray-200 rounded-md hover:bg-gray-600"
                      >
                        <SquarePen className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteEducation(i)}
                        className="px-1 py-1 text-xs bg-gray-200 text-gray-600 hover:text-gray-200 rounded-md hover:bg-gray-600"
                      >
                        <Trash className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {educationFields.map((field, index) => (
              <div key={field.id} className="space-y-5">
                <div className="font-semibold text-sm w-fit py-1 rounded-md items-center dark:text-gray-800">
                  Add New Educations
                </div>

                <div className="flex gap-3">
                  <FormField
                    control={control}
                    name={`educations.${index}.universitas`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Nama Universitas*</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="eg. Universitas Indonesia"
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
                    control={control}
                    name={`educations.${index}.pendidikan_terakhir`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Pendidikan Terakhir*</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="eg. S1 Informatika"
                            {...field}
                            readOnly={isSubmitting}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name={`educations.${index}.tahun_masuk`}
                    render={({ field }) => (
                      <FormItem className="flex-0.5">
                        <FormLabel>Tahun Masuk*</FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            placeholder=""
                            {...field}
                            readOnly={isSubmitting}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name={`educations.${index}.tahun_keluar`}
                    render={({ field }) => (
                      <FormItem className="flex-0.5">
                        <FormLabel>Tahun keluar*</FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            placeholder=""
                            {...field}
                            readOnly={isSubmitting}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex items-center justify-end gap-2">
                  <button
                    className="bg-gray-300 hover:bg-gray-500 text-sm px-4 py-2 w-32 rounded-md"
                    onClick={() => removeEducation(index)}
                  >
                    Cancle
                  </button>

                  <button
                    type="submit"
                    onClick={() => handleSaveEducation(index)}
                    className="bg-gray-800 hover:bg-gray-600 text-white text-sm px-4 py-2 w-32 rounded-md"
                  >
                    Save
                  </button>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={() =>
                appendEducation({
                  universitas: "",
                  pendidikan_terakhir: "",
                  tahun_masuk: "",
                  tahun_keluar: "",
                })
              }
              className="px-3 py-2 bg-gray-800 hover:bg-gray-600 text-white rounded-md text-sm w-full"
            >
              + Add Education
            </button>

            <div className="font-semibold text-sm bg-gray-800 w-fit px-3 py-1 rounded-md text-white items-center">
              Educations
            </div>

            {savedCertifications.length > 0 && (
              <div className="space-y-3">
                {savedCertifications.map((cert, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-md bg-gray-50 text-sm flex justify-between items-center dark:text-gray-800"
                  >
                    <div>
                      <div className="font-semibold text-lg">
                        {cert.sertifikat}
                      </div>
                      <div>
                        {cert.pelatihan}{" "}
                        <span className="text-gray-400 text-xs ms-5">
                          {new Date(cert.tanggal_mulai).getFullYear()} -{" "}
                          {new Date(cert.tanggal_selesai).getFullYear()}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => handleEditCertification(i)}
                        className="px-1 py-1 text-xs bg-gray-200 text-gray-600 hover:text-gray-200 rounded-md hover:bg-gray-600"
                      >
                        <SquarePen className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteCertification(i)}
                        className="px-1 py-1 text-xs bg-gray-200 text-gray-600 hover:text-gray-200 rounded-md hover:bg-gray-600"
                      >
                        <Trash className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {certificationFields.map((field, index) => (
              <div key={field.id} className="space-y-5">
                <div className="font-semibold text-sm w-fit py-1 rounded-md items-center dark:text-gray-800">
                  Add New Certification
                </div>

                <div className="flex gap-3">
                  <FormField
                    control={control}
                    name={`certifications.${index}.sertifikat`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Nama Sertifikasi*</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="eg. BNSP"
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
                  <div className="flex flex-col w-full">
                    <span className="text-sm mb-4 dark:text-gray-800">
                      Upload Sertifikat
                    </span>
                    <DragAndDropUpload
                      supportedFormats=".JPG, .PNG, .PDF, .DOCX"
                      onFileSelect={(file) => console.log("File:", file)}
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <FormField
                    control={control}
                    name={`certifications.${index}.pelatihan`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Nama Pelatihan*</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="eg. Desain Grafis"
                            {...field}
                            readOnly={isSubmitting}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name={`certifications.${index}.tanggal_mulai`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Tanggal Mulai*</FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            placeholder=""
                            {...field}
                            readOnly={isSubmitting}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name={`certifications.${index}.tanggal_selesai`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Tanggal Selesai*</FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            placeholder=""
                            {...field}
                            readOnly={isSubmitting}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex items-center justify-end gap-2">
                  <button
                    className="bg-gray-300 hover:bg-gray-500 text-sm px-4 py-2 w-32 rounded-md"
                    onClick={() => removeCertification(index)}
                  >
                    Cancle
                  </button>

                  <button
                    type="submit"
                    onClick={() => handleSaveCertification(index)}
                    className="bg-gray-800 hover:bg-gray-600 text-white text-sm px-4 py-2 w-32 rounded-md"
                  >
                    Save
                  </button>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={() =>
                appendCertification({
                  sertifikat: "",
                  pelatihan: "",
                  tanggal_mulai: "",
                  tanggal_selesai: "",
                })
              }
              className="px-3 py-2 bg-gray-800 hover:bg-gray-600 text-white rounded-md text-sm w-full"
            >
              + Add Certification
            </button>

            {/* {savedEducations.length > 0 && (
              <button
                type="submit"
                className="px-3 py-2 bg-green-600 text-white rounded-md text-sm w-full"
                disabled={isSubmitting}
              >
                Submit All
              </button>
            )} */}
          </div>
        </form>
      </Form>
    </>
  );
}
