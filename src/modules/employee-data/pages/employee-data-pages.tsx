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
import { PencilIcon, Trash2Icon, CloudUpload, PlusIcon } from "lucide-react";
import { ConfirmDeleteDialog } from "@/components/commons/data-table/confirm-delete";
import { ButtonAll } from "@/components/commons/button-all";
import { Separator } from "@/components/ui/separator";
import GeneralModal from "@/components/commons/general-modal";
import { Card } from "@/components/ui/card";
import { FaFileExcel } from "react-icons/fa6";
import DragAndDropUpload from "../components/ui/drag-drop";
import { TabsWidget } from "../components/widgets/tabs-widget";
import { WizardWidget } from "../components/widgets/wizard-widget";
import FormOwnWidget from "../components/widgets/form-own-widget";
import FormWorkWidget from "../components/widgets/form-work-widget";
import FormSalariWidget from "../components/widgets/form-salari-widget";
import FormEducationWidget from "../components/widgets/form-education-widget";

type TUser = {
  id: number;
  email: string;
  name: string;
  status: boolean;
  password?: string;
  avatar?: string;
};

export default function EmployeeData() {
  const [active, setActive] = useState("own");
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

  const columnsSalaries: ColumnDef<TUser>[] = [
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

  const columnsEducation: ColumnDef<TUser>[] = [
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

  const columnsEtc: ColumnDef<TUser>[] = [
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
    { key: "own", label: "Data Pribadi" },
    { key: "work", label: "Data Pekerjaan" },
    { key: "salari", label: "Gaji dan Tunjangan" },
    { key: "educations", label: "Riwayat Pendidikan dan Pelatihan" },
    { key: "etc", label: "Dokumen Pendukung" },
  ];

  function getTableDataAndColumns(tab: string) {
    switch (tab) {
      case "work":
        return { columns: columnsWork };
      case "salari":
        return { columns: columnsSalaries };
      case "educations":
        return { columns: columnsEducation };
      case "etc":
        return { columns: columnsEtc };
      case "own":
      default:
        return { columns: columnsOwn };
    }
  }

  const { columns } = getTableDataAndColumns(active);

  const steps = [
    { title: "Data Pribadi", content: <FormOwnWidget /> },
    { title: "Data Pekerjaan", content: <FormWorkWidget /> },
    { title: "Gaji dan Tunjangan", content: <FormSalariWidget /> },
    {
      title: "Riwayat Pendidikan dan Pelatihan",
      content: <FormEducationWidget />,
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-5">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col col-span-4">
          <div className="flex items-center justify-between gap-2 sm:flex-row flex-col">
            <TitleHeader
              icon={<MdOutlineDataUsage className="w-4 h-4 text-blue-700" />}
              title="Employee Data"
              desc="Lorem ipsum dolor sit amet consectetur adipiscing elit."
            />
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-2">
                <ButtonAll
                  className="h-10"
                  variant="primary"
                  icon={<CloudUpload className="w-4 h-4" />}
                  onClick={() => openModal("import")}
                >
                  Import Batch
                </ButtonAll>
                <ButtonAll
                  className="h-10"
                  variant="primary"
                  onClick={() => openModal("new")}
                >
                  New Users
                </ButtonAll>
              </div>

              <div className="sm:hidden fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-end">
                <ButtonAll
                  className="h-10"
                  variant="primary"
                  onClick={() => console.log("Main action")}
                  fabActions={[
                    {
                      icon: <CloudUpload className="w-5 h-5" />,
                      onClick: () => openModal("import"),
                      label: "Import Data",
                      variant: "primary",
                    },
                    {
                      icon: <PlusIcon className="w-5 h-5" />,
                      onClick: () => openModal("new"),
                      label: "Export Data",
                      variant: "primary",
                    },
                  ]}
                >
                  Tambah User
                </ButtonAll>
              </div>

              <GeneralModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                size={modalType === "new" ? "2xl" : "3xl"}
                title={
                  modalType === "import"
                    ? "Upload batch file"
                    : "Single add user"
                }
                desc={
                  modalType === "import"
                    ? "Set up your organization structure with batch import"
                    : "Lorem ipsum dolor sit amet"
                }
                footer={
                  modalType === "import" ? (
                    <>
                      <button
                        className="bg-gray-300 hover:bg-gray-500 text-sm px-4 py-2 w-32 rounded-md"
                        onClick={() => setIsOpen(false)}
                      >
                        Cancel
                      </button>
                      <button
                        className="bg-gray-800 hover:bg-gray-600 text-white text-sm px-4 py-2 w-32 rounded-md"
                        // onClick={handleImportSubmit}
                      >
                        Import
                      </button>
                    </>
                  ) : (
                    <WizardWidget
                      steps={steps}
                      onFinish={() => alert("Wizard finished!")}
                    />
                  )
                }
              >
                {modalType === "import" && (
                  <div className="flex flex-col p-4">
                    <div className="mb-4">
                      <span className="text-sm dark:text-gray-800">
                        Please download our template to setup batch import.
                      </span>
                      <Card className="mt-2 p-4 w-fit gap-2 rounded-md">
                        <div className="flex items-center gap-2">
                          <FaFileExcel className="me-2 w-6 h-6 text-green-400" />
                          <div className="flex flex-col">
                            <a href="/template/batch-import-template.xlsx">
                              Batch Import Template
                            </a>
                            <span className="text-xs text-gray-500">
                              Download
                            </span>
                          </div>
                        </div>
                      </Card>
                    </div>
                    <span className="text-sm mb-4 dark:text-gray-800">
                      Already setup batch import? Please upload the file below.
                    </span>
                    <DragAndDropUpload
                      onFileSelect={(file) => console.log("File:", file)}
                    />
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
