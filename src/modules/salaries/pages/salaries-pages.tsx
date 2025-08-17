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
import { PencilIcon, Trash2Icon, Eye, EyeOff } from "lucide-react";
import { ConfirmDeleteDialog } from "@/components/commons/data-table/confirm-delete";
import { ButtonAll } from "@/components/commons/button-all";
import { Separator } from "@/components/ui/separator";
import { TabsWidget } from "../components/widgets/tabs-widget";
import { Tab } from "../components/ui/tabs";
import ContentChart from "../components/ui/content-chart";
import GeneralModal from "@/components/commons/general-modal";
import { Input } from "@/components/ui/input";

type TUser = {
  id: number;
  email: string;
  name: string;
  status: boolean;
  password?: string;
  avatar?: string;
};

export default function Salaries() {
  const [active, setActive] = useState("overview");
  const apiEndpoint = "users";
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState<"import" | "new" | "password" | null>(null);
  const [showValues, setShowValues] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");

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

  const tabs: Tab[] = [
    { key: "overview", label: "Overview", type: "chart" },
    { key: "details", label: "Employee Details", type: "table" },
  ];

  function getTabContent(tabKey: string, showValues: boolean) {
    const tab = tabs.find((t) => t.key === tabKey);
    if (!tab) return null;

    if (tab.type === "table") {
      let columnsToUse: ColumnDef<TUser>[] = [];
      switch (tab.key) {
        case "details":
          columnsToUse = columnsOwn;
          break;
      }

      return (
        <DataTable
          source={apiEndpoint}
          columns={columnsToUse}
          columnsFilterOptions={columnsFilterOptions}
        />
      );
    }

    if (tab.type === "chart") {
      return (
        <div className="w-full">
          <ContentChart showValues={showValues} />
        </div>
      );
    }

    return null;
  }

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
            <div className="gap-2 flex items-center">
              <ButtonAll
                className="h-10 flex items-center gap-2"
                type="button"
                onClick={() => {
                  if (showValues) {
                    setShowValues(false);
                  } else {
                    setModalType("password");
                    setIsOpen(true);
                  }
                }}
              >
                {showValues ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
                {showValues ? "Hide" : "Show"}
              </ButtonAll>

              <GeneralModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                size="md"
                title="Enter your password"
                desc="Type your user password to show the data"
                footer={
                  <>
                    <button
                      className="bg-gray-300 hover:bg-gray-500 text-sm px-4 py-2 w-32 rounded-md"
                      onClick={() => {
                        setPasswordInput("");
                        setIsOpen(false);
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      className="bg-gray-800 hover:bg-gray-600 text-white text-sm px-4 py-2 w-32 rounded-md"
                      onClick={() => {
                        if (passwordInput === "12345678") {
                          setShowValues(true);
                          setIsOpen(false);
                          setPasswordInput("");
                        } else {
                          toast.error("Incorrect password!");
                        }
                      }}
                    >
                      Confirm
                    </button>
                  </>
                }
              >
                <div className="flex flex-col p-4">
                  <Input
                    type="password"
                    placeholder="Type your password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                  />
                </div>
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
          {getTabContent(active, showValues)}
        </div>
      </div>
    </div>
  );
}
