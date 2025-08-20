"use client";

import { Button } from "@/components/ui/button";
import { FormModal } from "@/components/ui/form-modal";
import { TableUi } from "../ui/salary-data-table";
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
import type { FieldType } from "@/components/ui/form-modal";
const breadcrumbs: TBreadcrumbs = [
  { label: "Dashboard", href: "/" },
  { label: "Settings" },
  { label: "Salary" },
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
  const [options, setOptions] = useState<EnumItem[]>([]);

  useEffect(() => {
    enumClass.getList("enums/salary-component-type").then(setOptions);
  }, []);

  const fields :FieldType[] = [
    { name: "name", label: "Name", required: true },
    {
      name: "type",
      label: "Type",
      type: "select",
      required: true,
      options: options,
    },
    { name: "description", label: "Deskription", required: true },
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
          <h2 className="text-2xl font-bold tracking-tight">Master Data</h2>
          <p className="text-muted-foreground">Group</p>
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
