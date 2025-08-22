"use client";

import { Button } from "@/components/ui/button";
import { FieldTypeEmployee, FormModal } from "../ui/employee-form";
import { TableUi } from "../ui/employee-data-table";
import {
  TBreadcrumbs,
  useBreadcrumbs,
} from "@/components/context/breadcrumb-context";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { errorValidation } from "@/lib/error-validation";
import apiClient from "@/lib/apiClient";
import { useLastPath } from "@/lib/utils";
import enumClass, { EnumItem } from "@/lib/enumClass";
import TitleHeader from "@/components/commons/title-header";
import { MdOutlineDataUsage } from "react-icons/md";
const breadcrumbs: TBreadcrumbs = [
  { label: "Dashboard", href: "/" },
  { label: "Employee" },
];

type TGroup = {
  id?: number;
  name: string;
};

export default function IndexPage() {
  const { setBreadcrumbs } = useBreadcrumbs();
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<TGroup | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const lastPath = useLastPath();
  const [options, setOptions] = useState<OptionsType>({
    employee_type: [],
    gender: [],
    employee_status: [],
    marital_status: [],
    citizenship: [],
  });

  type OptionsType = {
    employee_type: EnumItem[];
    gender: EnumItem[];
    employee_status: EnumItem[];
    marital_status: EnumItem[];
    citizenship: EnumItem[];
    // tambahin kalau ada enum lain
  };

  useEffect(() => {
    fetchDataOption();
  }, []);

  const fetchDataOption = async () => {
    try {
      const response = await apiClient.get("enums");
      setOptions(response.data.data);
    } catch (err) {
      const error = err as AxiosError;
      toast.error(error.message);

      // errorValidation(error, setError);
    }
  };

  const fields: FieldTypeEmployee[] = [
    // --- level atas ---
    { name: "name", label: "Username", required: true },
    { name: "profile.name", label: "Nama Lengkap", required: true },
    { name: "email", label: "Email", required: true },
    { name: "phone", label: "No. Telepon", required: true },
    { name: "nip", label: "NIP", required: false },
    { name: "avatar", label: "Avatar URL", required: false },
    {
      name: "type",
      label: "Jenis Karyawan",
      type: "select",
      required: true,
      options: options.employee_type,
    },
    {
      name: "status",
      label: "Status Kepegawaian",
      type: "select",
      required: true,
      options: options.employee_status,
    },
    { name: "bank_name", label: "Bank Name", required: false },
    { name: "bank_account", label: "Bank Account", required: false },

    // --- profile (nested) ---
    { name: "profile.nik", label: "NIK", required: true },
    { name: "profile.npwp", label: "NPWP", required: false },
    {
      name: "profile.bpjs_kesehatan",
      label: "BPJS Kesehatan",
      required: false,
    },
    {
      name: "profile.bpjs_ketenagakerjaan",
      label: "BPJS Ketenagakerjaan",
      required: false,
    },
    { name: "profile.place_of_birth", label: "Place of Birth", required: true },
    {
      name: "profile.date_of_birth",
      label: "Date of Birth",
      type: "date",
      required: true,
    },
    {
      name: "hire_date",
      label: "Hire Date",
      type: "date",
      required: true,
    },
    {
      name: "profile.gender",
      label: "Gender",
      type: "select",
      required: true,
      options: options.gender,
    },
    {
      name: "profile.marital_status",
      label: "Marital Status",
      type: "select",
      required: true,
      options: options.marital_status,
    },
    {
      name: "profile.citizenship",
      label: "Citizenship",
      type: "select",
      required: true,
      options: options.citizenship,
    },
    { name: "password", label: "Password", type: "password", required: false },
    {
      name: "password_confirmation",
      label: "Ulangi Password",
      type: "password",
      required: false,
    },
    { name: "profile.legal_address", label: "Legal Address", type: "textarea" },
    {
      name: "profile.residential_address",
      label: "Residential Address",
      type: "textarea",
    },
  ];

  const handleSubmit = async (data: any, setError: any) => {
    const isEdit = !!editData;
    const method = isEdit ? "PUT" : "POST";
    const endpoint = isEdit ? `${lastPath}/${editData?.id}` : lastPath;

    try {
      await apiClient({
        method,
        url: endpoint,
        data,
      });

      toast.success(`${isEdit ? "Edit" : "Create"} success`);
      setOpen(false);
      setEditData(null);
      setRefreshKey((prev) => prev + 1);
    } catch (err) {
      const error = err as AxiosError;
      errorValidation(error, setError);
    }
  };

  const handleEdit = (data: TGroup) => {
    setEditData(data);
    setOpen(true);
  };

  useEffect(() => {
    setBreadcrumbs(breadcrumbs);
  }, []);

  return (
    <div className="w-full h-full flex flex-1 flex-col gap-4">
      <div className="flex justify-between">
        <div>
          <TitleHeader
            icon={<MdOutlineDataUsage className="w-4 h-4 text-blue-700" />}
            title="Employee Data"
            desc="Lorem ipsum dolor sit amet consectetur adipiscing elit."
          />
        </div>
        <div className="flex items-center">
          <Button
            onClick={() => {
              setEditData(null); // Reset ke create mode
              setOpen(true);
            }}
          >
            Create
          </Button>
        </div>
      </div>

      <TableUi
        refreshKey={refreshKey}
        onEdit={handleEdit}
        endPoint={lastPath}
      />

      <FormModal
        isOpen={open}
        onClose={() => {
          setOpen(false);
          setEditData(null);
        }}
        title={editData ? "Edit" : "Form Create"}
        fields={fields}
        defaultValues={editData ?? {}}
        onSubmit={handleSubmit}
        submitLabel={editData ? "Update" : "Save"}
        cancelLabel="Cancel"
      />
    </div>
  );
}
