import TitleHeader from "@/components/commons/title-header";
import { MdOutlineDataUsage } from "react-icons/md";
import { useState } from "react";
import DataTable, {
  ColumnsFilterOptionsType,
} from "@/components/commons/data-table/data-table";
import { useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/apiClient";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@radix-ui/react-checkbox";
import ColumnHeader from "@/components/commons/data-table/colum-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router";
import { PencilIcon, Trash2Icon, CloudUpload } from "lucide-react";
import { ConfirmDeleteDialog } from "@/components/commons/data-table/confirm-delete";
import { ButtonAll } from "@/components/commons/button-all";
import { Separator } from "@/components/ui/separator";
import GeneralModal from "@/components/commons/general-modal";
import { TabsWidget } from "../components/widgets/tabs-widget";
import FormLeaveWidget from "../components/widgets/form-leave-widget";
import { SelectedActions } from "@/components/commons/data-table/selected-actions";
import { ViewOptions } from "@/components/commons/data-table/view-options";

type TUser = {
  id: number;
  email: string;
  name: string;
  status: boolean;
  password?: string;
  avatar?: string;
};

export default function Leave() {
  const [active, setActive] = useState("request");
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

  const columnsOwn: ColumnDef<TUser>[] = [
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

  const columnsWork: ColumnDef<TUser>[] = [
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

  const tabs = [
    { key: "request", label: "Leave Request" },
    { key: "police", label: "Policies & Leave Types" },
  ];

  function getTableDataAndColumns(tab: string) {
    switch (tab) {
      case "police":
        return { columns: columnsWork };
      case "request":
      default:
        return { columns: columnsOwn };
    }
  }

  const { columns } = getTableDataAndColumns(active);

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-5">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col col-span-4">
          <div className="flex items-center justify-between gap-2 sm:flex-row flex-col">
            <TitleHeader
              icon={<MdOutlineDataUsage className="w-4 h-4 text-blue-700" />}
              title="Leave"
              desc="Lorem ipsum dolor sit amet consectetur adipiscing elit."
            />
            <div className="flex items-center gap-2">
              {active === "police" && (
                <div className="hidden sm:flex items-center gap-2">
                  <ButtonAll
                    className="h-10"
                    variant="primary"
                    onClick={() => openModal("import")}
                  >
                    New Leave Type
                  </ButtonAll>
                </div>
              )}

              {active === "police" && (
                <div className="sm:hidden fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-end">
                  <ButtonAll
                    className="h-10"
                    variant="primary"
                    onClick={() => console.log("Main action")}
                    fabActions={[
                      {
                        icon: <CloudUpload className="w-5 h-5" />,
                        onClick: () => openModal("new"),
                        label: "New Data",
                        variant: "primary",
                      },
                    ]}
                  >
                    New Loans Type
                  </ButtonAll>
                </div>
              )}

              <GeneralModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                size={modalType === "new" ? "2xl" : "3xl"}
                title="New Leave Type"
                desc="Define a new leave type with custom rules and policies."
                footer={
                  <>
                    <button
                      className="bg-gray-300 hover:bg-gray-500 text-sm px-4 py-2 w-32 rounded-md"
                      onClick={() => setIsOpen(false)}
                    >
                      Cancel
                    </button>
                    <button className="bg-gray-800 hover:bg-gray-600 text-white text-sm px-4 py-2 w-32 rounded-md">
                      Submit
                    </button>
                  </>
                }
              >
                {modalType && (
                  <div className="flex flex-col p-4">
                    <FormLeaveWidget />
                  </div>
                )}
              </GeneralModal>
            </div>
          </div>
          <div className="flex items-center justify-between gap-2 mt-4">
            <TabsWidget
              tabs={tabs}
              initialActive={active}
              onChange={setActive}
            />
          </div>
          <Separator className="my-4" />
          <DataTable
            source={apiEndpoint}
            columns={columns}
            columnsFilterOptions={columnsFilterOptions}
            rightContent={(table) => (
              <>
                <SelectedActions table={table} />
                <ViewOptions table={table} />
              </>
            )}
          />
        </div>
      </div>
    </div>
  );
}
