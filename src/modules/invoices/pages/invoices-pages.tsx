import TitleHeader from "@/components/commons/title-header";
import { MdOutlineDataUsage } from "react-icons/md";
import { useRef, useState } from "react";
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
import {
  PencilIcon,
  Trash2Icon,
  Eye,
  EyeOff,
  Coins,
  Activity,
  BanknoteArrowUp,
  BanknoteArrowDown,
} from "lucide-react";
import { ConfirmDeleteDialog } from "@/components/commons/data-table/confirm-delete";
import { ButtonAll } from "@/components/commons/button-all";
import { Separator } from "@/components/ui/separator";
import GeneralModal from "@/components/commons/general-modal";
import { Input } from "@/components/ui/input";
import CameraView, {
  CameraViewHandle,
} from "../components/widgets/camera-access";
import SalariesCardList from "../components/widgets/card-counter";
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

const analyticsData = [
  {
    label: "total revenue",
    value: 1000000,
    growth: "+12% from last month",
    icon: <BanknoteArrowDown className="w-8 h-8 text-white p-1" />,
    bg: "bg-white dark:bg-gray-800",
    prefix: "Rp. ",
  },
  {
    label: "paid ammount",
    value: 1000000,
    growth: "8 invoices paid",
    icon: <Coins className="w-9 h-9 text-white p-1" />,
    bg: "bg-white dark:bg-gray-800",
    prefix: "Rp. ",
  },
  {
    label: "pending ammount",
    value: 1000000,
    growth: "5 invoices pending",
    icon: <BanknoteArrowUp className="w-8 h-8 text-white p-1" />,
    bg: "bg-white dark:bg-gray-800",
    prefix: "Rp. ",
  },
  {
    label: "overdue ammount",
    value: 1000000000,
    growth: "2 invoices overdue",
    icon: <Activity className="w-8 h-8 text-white p-1" />,
    bg: "bg-white dark:bg-gray-800",
    prefix: "Rp. ",
  },
];

export default function Invoices() {
  const apiEndpoint = "users";
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [, setModalType] = useState<"import" | "new" | "password" | null>(null);
  const [showValues, setShowValues] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [phase, setPhase] = useState<"password" | "camera">("password");
  const cameraRef = useRef<CameraViewHandle>(null);

  const analytics = analyticsData.map((item) => ({
    ...item,
    value: showValues ? item.value : "*******",
  }));

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

  const handlePasswordConfirm = () => {
    if (passwordInput === "12345678") {
      setPhase("camera");
    } else {
      toast.error("Incorrect password!");
    }
  };

  const handleCameraConfirm = () => {
    setShowValues(true);
    setPhase("password");
    setTimeout(() => {
      setIsOpen(false);
      setPasswordInput("");
    }, 100);
  };

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-5">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col col-span-4">
          <div className="flex items-center justify-between gap-2 sm:flex-row flex-col">
            <TitleHeader
              icon={<MdOutlineDataUsage className="w-4 h-4 text-blue-700" />}
              title="Invoices"
              desc="Lorem ipsum dolor sit amet consectetur adipiscing elit."
            />
            <div className="gap-2 flex items-center">
              <ButtonAll
                className="h-10"
                type="button"
                icon={
                  showValues ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )
                }
                onClick={() => {
                  if (showValues) {
                    setShowValues(false);
                  } else {
                    setModalType("password");
                    setIsOpen(true);
                  }
                }}
              >
                {showValues ? "Hide" : "Show"}
              </ButtonAll>

              <GeneralModal
                isOpen={isOpen}
                onClose={() => {
                  setIsOpen(false);
                  setPasswordInput("");
                  setPhase("password");
                }}
                size="md"
                title={
                  phase === "password"
                    ? "Enter your password"
                    : "Camera Verification"
                }
                desc={
                  phase === "password"
                    ? "Type your user password to continue"
                    : "Use your camera to verify before showing data"
                }
                footer={
                  <>
                    <button
                      className="bg-gray-300 hover:bg-gray-500 text-sm px-4 py-2 rounded-md"
                      onClick={() => {
                        setPasswordInput("");
                        setIsOpen(false);
                        setPhase("password");
                      }}
                    >
                      Cancel
                    </button>
                    {phase === "password" ? (
                      <button
                        className="bg-gray-800 hover:bg-gray-600 text-white text-sm px-4 py-2 rounded-md"
                        onClick={handlePasswordConfirm}
                      >
                        Confirm
                      </button>
                    ) : (
                      <button
                        className="bg-gray-800 hover:bg-gray-600 text-white text-sm px-4 py-2 rounded-md"
                        onClick={handleCameraConfirm}
                      >
                        Confirm
                      </button>
                    )}
                  </>
                }
              >
                {phase === "password" ? (
                  <div className="flex flex-col p-4">
                    <Input
                      type="password"
                      placeholder="Type your password"
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                    />
                  </div>
                ) : (
                  <div className="flex flex-col p-4 items-center">
                    <div className="w-full h-80 flex items-center justify-center">
                      <CameraView ref={cameraRef} active={phase === "camera"} />
                    </div>
                  </div>
                )}
              </GeneralModal>
            </div>
          </div>
          <Separator className="my-4" />
          <SalariesCardList analytics={analytics} />
          <DataTable
            source={apiEndpoint}
            columns={columnsOwn}
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
