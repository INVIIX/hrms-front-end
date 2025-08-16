import DataTable, {
  ColumnsFilterOptionsType,
} from "@/components/commons/data-table/data-table";
import TitleHeader from "@/components/commons/title-header";
import { MdOutlineDataUsage } from "react-icons/md";
import apiClient from "@/lib/apiClient";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router";
import { PencilIcon, Trash2Icon } from "lucide-react";
import { ConfirmDeleteDialog } from "@/components/commons/data-table/confirm-delete";
import { Badge } from "@/components/ui/badge";
import ColumnHeader from "@/components/commons/data-table/colum-header";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "node_modules/@tanstack/table-core/build/lib/types";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { ButtonAll } from "@/components/commons/button-all";
import { Separator } from "@/components/ui/separator";
import OrganizationTree from "../components/widgets/organization-widget";
import { useState } from "react";
import GeneralModal from "@/components/commons/general-modal";
import { Card } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import FormSubgroupWidget from "../components/widgets/form-subgroup-widget";

type TUser = {
  id: number;
  email: string;
  name: string;
  status: boolean;
  password?: string;
  avatar?: string;
};

export default function GroupManagement() {
  const apiEndpoint = "users";
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState<"import" | "new" | null>(null);

  const openModal = (type: "import" | "new") => {
    setModalType(type);
    setIsOpen(true);
  };

  const reloadData = () => {
    queryClient.invalidateQueries({ queryKey: [apiEndpoint] });
  };

  const onRowDelete = async (primaryKey: number | string | null) => {
    try {
      const response = await apiClient.delete(`${apiEndpoint}/${primaryKey}`);
      if (response.status == 200) {
        toast.success("Data has been deleted.");
        reloadData();
      }
    } catch (err) {
      const error = err as AxiosError;
      toast.error(error.message);
    }
  };

  const columns: ColumnDef<TUser>[] = [
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
      accessorKey: "name",
      header: ({ column }) => <ColumnHeader column={column} title="Name" />,
    },
    {
      accessorKey: "email",
      header: ({ column }) => <ColumnHeader column={column} title="Email" />,
    },
    {
      accessorKey: "status",
      header: ({ column }) => <ColumnHeader column={column} title="Status" />,
      cell: ({ row }) => {
        const data = row.original.status;
        return (
          <Badge variant={data ? "default" : "secondary"}>
            {data ? "Active" : "Inactive"}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      header: () => {
        return <></>;
      },
      cell: ({ row }) => {
        return (
          <div className="w-auto flex items-center justify-end gap-2">
            <Button variant="outline" asChild>
              <NavLink to={`/settings/users/${row.original.id}/edit`}>
                <PencilIcon />
              </NavLink>
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
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-5">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col col-span-4">
          <div className="flex items-center justify-between gap-2">
            <TitleHeader
              icon={<MdOutlineDataUsage className="w-4 h-4 text-blue-700" />}
              title="Group Managements"
              desc="Lorem ipsum dolor sit amet consectetur adipiscing elit."
            />
            <ButtonAll
              className="h-10"
              type="button"
              children="New Subgroup"
              onClick={() => openModal("new")}
            />
          </div>
          <Separator className="my-4" />
          <OrganizationTree />
          <DataTable<TUser>
            source={apiEndpoint}
            columns={columns}
            columnsFilterOptions={columnsFilterOptions}
          />
        </div>
      </div>

      <GeneralModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        size={modalType === "new" ? "2xl" : "3xl"}
        title={modalType === "import" ? "Upload batch file" : "Create Subgroup"}
        desc={
          modalType === "new"
            ? "Lorem ipsum dolor sit amet."
            : "Lorem ipsum dolor sit amet"
        }
        footer={
          modalType === "new" && (
            <>
              <button
                className="bg-gray-300 hover:bg-gray-500 text-sm px-4 py-2 w-32 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                form="subgroupForm"
                className="bg-gray-800 hover:bg-gray-600 text-white text-sm px-4 py-2 w-32 rounded-md"
                // onClick={handleImportSubmit}
              >
                Create
              </button>
            </>
          )
        }
      >
        {modalType === "new" && (
          <div className="flex flex-col p-4 mb-4">
            <FormSubgroupWidget />
          </div>
        )}
      </GeneralModal>
    </div>
  );
}
