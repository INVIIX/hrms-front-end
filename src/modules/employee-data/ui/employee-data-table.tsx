import { ColumnDef } from "@tanstack/react-table";
import ColumnHeader from "@/components/commons/data-table/colum-header";
import DataTable, {
  ColumnsFilterOptionsType,
} from "@/components/commons/data-table/data-table";
import { Button } from "@/components/ui/button";
import { PencilIcon, Trash2Icon } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import apiClient from "@/lib/apiClient";
import { AxiosError } from "axios";
import { ConfirmDeleteDialog } from "@/components/commons/data-table/confirm-delete";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect } from "react";
import moment from "moment";

type Tfield = {
  id: number;
  name: string;
  email: string;
  phone: string;
  nip: string;
  avatar: null;
  type: string;
  status: string;
  bank_name: string;
  bank_account: string;
  profile : Tprofile
};

type Tprofile = {
  name: string;
  nik: string;
  npwp: string;
  bpjs_kesehatan: string;
  bpjs_ketenagakerjaan: string;
  place_of_birth: string;
  date_of_birth: string;
  gender: string;
  marital_status: string;
  citizenship: string;
  legal_address: string;
  residential_address: string;
};

export function TableUi({
  refreshKey,
  onEdit,
  endPoint,
}: {
  refreshKey?: number;
  onEdit?: (row: any) => void;
  endPoint: string;
}) {
  const queryClient = useQueryClient();
  const reloadData = () => {
    console.log("reload");
    queryClient.invalidateQueries({ queryKey: [endPoint] });
  };
  useEffect(() => {
    if (refreshKey !== undefined) {
      reloadData();
    }
  }, [refreshKey]);

  const onRowDelete = async (primaryKey: number | string | null) => {
    try {
      const response = await apiClient.delete(`${endPoint}/${primaryKey}`);
      if (response.status == 200) {
        toast.success("Data has been deleted.");
        reloadData();
      }
    } catch (err) {
      const error = err as AxiosError;
      toast.error(error.message);
    }
  };

  const columns: ColumnDef<Tfield>[] = [
    {
      id: "id",
      header: ({ table }) => {
        return (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        );
      },
      cell: ({ row }) => {
        return (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        );
      },
    },
    {
      accessorKey: "nip",
      header: ({ column }) => <ColumnHeader column={column} title="NIP" />,
    },
    {
      accessorKey: "profile.name",
      header: ({ column }) => (
        <ColumnHeader column={column} title="Nama Lengkap" />
      ),
    },

    {
      accessorKey: "profile.date_of_birth",
      header: ({ column }) => <ColumnHeader column={column} title="TTL" />,
      cell: ({ row }) => {
        const data = row.original;
        console.log(data);
        return (
          <span>
            {data.profile?.place_of_birth},{" "}
            {moment(data.profile?.date_of_birth).format("DD-MM-YYYY")}
          </span>
        );
      },
    },
    {
      accessorKey: "profile.legal_address",
      header: ({ column }) => <ColumnHeader column={column} title="Alamat" />,
    },
    {
      accessorKey: "phone",
      header: ({ column }) => <ColumnHeader column={column} title="No.Tlp" />,
    },
    {
      accessorKey: "profile.gender",
      header: ({ column }) => (
        <ColumnHeader column={column} title="Jenis Kelamin" />
      ),
    },
    {
      accessorKey: "profile.marital_status",
      header: ({ column }) => (
        <ColumnHeader column={column} title="Status Pernikahan" />
      ),
    },
    {
      accessorKey: "profile.religion",
      header: ({ column }) => <ColumnHeader column={column} title="Agama" />,
    },
    {
      accessorKey: "profile.citizenship",
      header: ({ column }) => (
        <ColumnHeader column={column} title="Kewarganegaraan" />
      ),
    },
    {
      accessorKey: "profile.nik",
      header: ({ column }) => (
        <ColumnHeader column={column} title="No. KTP/Passpor" />
      ),
    },
    {
      accessorKey: "profile.npwp",
      header: ({ column }) => <ColumnHeader column={column} title="NPWP" />,
    },

    {
      id: "actions",

      header: ({ column }) => <ColumnHeader column={column} title="Actions" />,
      cell: ({ row }) => {
        return (
          <div className="w-auto flex items-center justify-end gap-2">
            <Button variant="outline" onClick={() => onEdit?.(row.original)}>
              <PencilIcon />
            </Button>

            <ConfirmDeleteDialog onConfirm={() => onRowDelete(row.original.id)}>
              <Button variant="outline">
                <Trash2Icon />
              </Button>
            </ConfirmDeleteDialog>
          </div>
        );
      },
    },
  ];

  const columnsFilterOptions: ColumnsFilterOptionsType = [
    {
      title: "Status",
      columnProp: "status",
      control: {
        keyValue: "id",
        keyLabel: "name",
      },
      data: [
        {
          name: "Active",
          id: 1,
        },
        {
          name: "In Active",
          id: 0,
        },
      ],
    },
  ];

  return (
    <>
      <DataTable<Tfield>
        source={endPoint}
        columns={columns}
        columnsFilterOptions={columnsFilterOptions}
      />
    </>
  );
}
