"use client"

import { Button } from "@/components/ui/button";
import { NavLink } from "react-router";
import { UserDataTable } from "../ui/user-data-table";
import { TBreadcrumbs, useBreadcrumbs } from "@/components/context/breadcrumb-context";
import { useEffect } from "react";

const breadcrumbs: TBreadcrumbs = [
    { label: "Dashboard", href: "/" },
    { label: "Settings" },
    { label: "Users" },
];

export default function UserIndexPage() {
    const { setBreadcrumbs } = useBreadcrumbs();
    
    useEffect(() => {
        setBreadcrumbs(breadcrumbs);
    }, [])
    
    return (
        <>
            <div className="w-full h-full flex flex-1 flex-col gap-4 w-full">
                <div className="flex justify-between">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">User's data table.</h2>
                        <p className="text-muted-foreground">
                            User data monitoring and management.
                        </p>
                    </div>
                    <div className="flex items-center">
                        <Button asChild><NavLink to="/settings/users/create">Create</NavLink></Button>
                    </div>
                </div>
                <UserDataTable />
            </div>
        </>
    );
}