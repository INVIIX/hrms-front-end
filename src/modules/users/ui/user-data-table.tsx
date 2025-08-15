import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge";
import ColumnHeader from "@/components/commons/data-table/colum-header";
import DataTable, { ColumnsFilterOptionsType } from "@/components/commons/data-table/data-table";
import { Button } from "@/components/ui/button";
import { PencilIcon, Trash2Icon } from "lucide-react";
import { NavLink } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import apiClient from "@/lib/apiClient";
import { AxiosError } from "axios";
import { ConfirmDeleteDialog } from "@/components/commons/data-table/confirm-delete";
import { Checkbox } from "@/components/ui/checkbox";

type TUser = {
    id: number;
    email: string;
    name: string;
    status: boolean,
    password?: string;
    avatar?: string;
}

export function UserDataTable() {
    const apiEndpoint = "users";
    const queryClient = useQueryClient()
    const reloadData = () => {
        queryClient.invalidateQueries({ queryKey: [apiEndpoint] })
    }

    const onRowDelete = async (primaryKey: number | string | null) => {
        try {
            const response = await apiClient.delete(`${apiEndpoint}/${primaryKey}`)
            if (response.status == 200) {
                toast.success('Data has been deleted.');
                reloadData()
            }
        } catch (err) {
            const error = err as AxiosError
            toast.error(error.message);
        }
    }

    const columns: ColumnDef<TUser>[] = [
        {
            id: "id",
            header: ({ table }) => {
                return <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            },
            cell: ({ row }) => {
                return <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            }
        },
        {
            accessorKey: "name",
            header: ({ column }) => (
                <ColumnHeader column={column} title="Name" />
            ),
        },
        {
            accessorKey: "email",
            header: ({ column }) => (
                <ColumnHeader column={column} title="Email" />
            ),
        },
        {
            accessorKey: "status",
            header: ({ column }) => (
                <ColumnHeader column={column} title="Status" />
            ),
            cell: ({ row }) => {
                const data = row.original.status;
                return <Badge variant={data ? "default" : "secondary"}>{data ? 'Active' : 'Inactive'}</Badge>
            }
        },
        {
            id: "actions",
            header: () => {
                return <></>
            },
            cell: ({ row }) => {
                return <div className="w-auto flex items-center justify-end gap-2">
                    <Button variant="outline" asChild>
                        <NavLink to={`/settings/users/${row.original.id}/edit`}><PencilIcon /></NavLink>
                    </Button>
                    <ConfirmDeleteDialog onConfirm={() => onRowDelete(row.original.id)}>
                        <Button variant="outline">
                            <Trash2Icon />
                        </Button>
                    </ConfirmDeleteDialog>
                </div>
            }
        }
    ]

    const columnsFilterOptions: ColumnsFilterOptionsType = [{
        title: "Status",
        columnProp: "status",
        control: {
            keyValue: 'id',
            keyLabel: 'name',
        },
        data: [{
            name: 'Active',
            id: 1
        }, {
            name: 'In Active',
            id: 0
        }]
    }];

    return <>
        <DataTable<TUser>
            source={apiEndpoint}
            columns={columns}
            columnsFilterOptions={columnsFilterOptions}
        />
    </>
}