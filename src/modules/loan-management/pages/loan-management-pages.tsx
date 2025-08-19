import TitleHeader from "@/components/commons/title-header";
import { MdOutlineDataUsage } from "react-icons/md";
import { useState } from "react";
import DataTable, {
  ColumnsFilterOptionsType,
} from "@/components/commons/data-table/data-table";
// import { useQueryClient } from "@tanstack/react-query";
// import apiClient from "@/lib/apiClient";
// import { toast } from "sonner";
// import { AxiosError } from "axios";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@radix-ui/react-checkbox";
import ColumnHeader from "@/components/commons/data-table/colum-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router";
// import { PencilIcon, Trash2Icon, CloudUpload, Eye } from "lucide-react";
import { CloudUpload, Eye } from "lucide-react";
import { ButtonAll } from "@/components/commons/button-all";
import { Separator } from "@/components/ui/separator";
import GeneralModal from "@/components/commons/general-modal";
import { TabsWidget } from "../components/widgets/tabs-widget";
import FormLoanWidget from "../components/widgets/form-loan-widget";

type TUser = {
  id: number;
  email: string;
  name: string;
  status: boolean;
  password?: string;
  avatar?: string;
};

export default function LoanManagement() {
  const [active, setActive] = useState("overview");
  const apiEndpoint = "users";
  // const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState<"import" | "new" | "view" | null>(
    null
  );
  const [selectedUser, setSelectedUser] = useState<TUser | null>(null);

  const openModal = (type: "import" | "new") => {
    setModalType(type);
    setIsOpen(true);
  };

  // const reloadData = () => {
  //   queryClient.invalidateQueries({ queryKey: [apiEndpoint] });
  // };

  // const onRowDelete = async (primaryKey: number | string | null) => {
  //   try {
  //     const response = await apiClient.delete(`${apiEndpoint}/${primaryKey}`);
  //     if (response.status == 200) {
  //       toast.success("Data has been deleted.");
  //       reloadData();
  //     }
  //   } catch (err) {
  //     const error = err as AxiosError;
  //     toast.error(error.message);
  //   }
  // };

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
        const user = row.original;
        return (
          <div className="w-auto flex items-center justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setModalType("view");
                setSelectedUser(user);
                setIsOpen(true);
              }}
            >
              <Eye />
            </Button>
            {/* <Button variant="outline" asChild>
              <NavLink to={`/settings/users/${row.original.id}/edit`}>
                <PencilIcon />
              </NavLink>
            </Button>
            <ConfirmDeleteDialog onConfirm={() => onRowDelete(row.original.id)}>
              <Button variant="outline">
                <Trash2Icon />
              </Button>
            </ConfirmDeleteDialog> */}
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
      // cell: ({ row }) => {
      cell: ({  }) => {
        return (
          <div className="w-auto flex items-center justify-end gap-2">
            <Button variant="outline" asChild>
              <NavLink to={``}>
                <Eye />
              </NavLink>
            </Button>
            {/* <Button variant="outline" asChild>
              <NavLink to={`/settings/users/${row.original.id}/edit`}>
                <PencilIcon />
              </NavLink>
            </Button>
            <ConfirmDeleteDialog onConfirm={() => onRowDelete(row.original.id)}>
              <Button variant="outline">
                <Trash2Icon />
              </Button>
            </ConfirmDeleteDialog> */}
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
    { key: "overview", label: "Overviews" },
    { key: "types", label: "Loan Types" },
  ];

  function getTableDataAndColumns(tab: string) {
    switch (tab) {
      case "types":
        return { columns: columnsWork };
      case "overview":
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
              title="Loans Management"
              desc="Lorem ipsum dolor sit amet consectetur adipiscing elit."
            />
            <div className="flex items-center gap-2">
              {active === "types" && (
                <div className="hidden sm:flex items-center gap-2">
                  <ButtonAll
                    className="h-10"
                    variant="primary"
                    onClick={() => openModal("import")}
                  >
                    New Loans Type
                  </ButtonAll>
                </div>
              )}

              {active === "types" && (
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
                title={modalType === "view" ? "Loans Detail" : "New Loans Type"}
                desc={
                  modalType === "view"
                    ? "Detail information about this user loans."
                    : "Lorem ipsum dolor sit amet."
                }
                footer={
                  modalType === "view" ? (
                    <button
                      className="bg-gray-800 hover:bg-gray-600 text-white text-sm px-4 py-2 w-32 rounded-md"
                      onClick={() => setIsOpen(false)}
                    >
                      Close
                    </button>
                  ) : (
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
                  )
                }
              >
                {modalType === "view" && selectedUser && (
                  <div className="flex flex-col gap-2 p-4 space-y-3">
                    <div className="grid grid-cols-3 gap-6 mt-4 text-sm dark:text-gray-800">
                      <div>
                        <p className="font-semibold">Employee Name</p>
                        <p className="font-medium text-gray-500">John Doe</p>
                      </div>
                      <div>
                        <p className="font-semibold">Department</p>
                        <p className="font-medium text-gray-500">Lorem</p>
                      </div>
                      <div>
                        <p className="font-semibold">Loan Type</p>
                        <p className="font-medium text-gray-500">
                          Personal Loan
                        </p>
                      </div>

                      <div>
                        <p className="font-semibold">Amount</p>
                        <p className="font-medium text-gray-500">
                          Rp. 1.000.000
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold">Status</p>
                        <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-700">
                          Aktif
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold">Interest Rate</p>
                        <p className="font-medium text-gray-500">8.5</p>
                      </div>

                      <div>
                        <p className="font-semibold">Tenure</p>
                        <p className="font-medium text-gray-500">24 months</p>
                      </div>
                      <div>
                        <p className="font-semibold">Monthly EMI</p>
                        <p className="font-medium text-gray-500">Rp. 400.000</p>
                      </div>
                      <div>
                        <p className="font-semibold">Outstanding</p>
                        <p className="font-medium text-gray-500">Rp. 600.000</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 dark:text-gray-800">
                      <p className="font-semibold text-sm">Purpose</p>
                      <div className="bg-gray-100 py-4 px-2 rounded-md border">
                        <span>Renovasi Rumah</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 dark:text-gray-800">
                      <p className="font-semibold text-sm">
                        Repayment progress
                      </p>
                      <div className="w-full bg-gray-200 rounded-md h-5">
                        <div
                          className="bg-gray-600 h-5 rounded-md"
                          style={{ width: "80%" }}
                        ></div>
                      </div>
                      <div className="flex justify-between">
                        <p className="font-normal text-sm">
                          Paid : Rp. 400.000
                        </p>
                        <p className="font-normal text-sm text-gray-400">
                          Remaining : Rp. 400.000
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 dark:text-gray-800">
                      <p className="font-semibold text-sm">Approved by</p>
                      <p className="font-normal text-sm text-gray-400">
                        HR Jhon Doe at 21 Jul 2025
                      </p>
                    </div>
                  </div>
                )}
                {modalType && modalType !== "view" && (
                  <div className="flex flex-col p-4">
                    <FormLoanWidget />
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
          />
        </div>
      </div>
    </div>
  );
}
