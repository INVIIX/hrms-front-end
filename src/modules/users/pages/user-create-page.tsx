"use client"

import { TBreadcrumbs, useBreadcrumbs } from "@/components/context/breadcrumb-context";
import { useEffect } from "react";
import { UserForm } from "../ui/user-form";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

const breadcrumbs: TBreadcrumbs = [
    { label: "Dashboard", href: "/" },
    { label: "Settings" },
    { label: "Users", href: '/settings/users' },
    { label: "Create User" },
];

export default function UserCreatePage() {
    const navigate = useNavigate();
    const { setBreadcrumbs } = useBreadcrumbs();

    useEffect(() => {
        setBreadcrumbs(breadcrumbs);
    }, [breadcrumbs])

    return (
        <>
            <div className="w-full h-full flex flex-1 flex-col gap-4 w-full">
                <div className="flex justify-between">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Create User.</h2>
                        <p className="text-muted-foreground">
                            Enter data information below to create an user.
                        </p>
                    </div>
                    <div className="flex items-center">
                        <Button variant="outline" onClick={() => navigate(-1)}>Back</Button>
                    </div>
                </div>
                <UserForm url="users" redirect="/settings/users" />
            </div>
        </>
    );
}