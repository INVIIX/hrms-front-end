"use client"

import { TBreadcrumbs, useBreadcrumbs } from "@/components/context/breadcrumb-context";
import { useEffect, useState } from "react";
import { UserForm } from "../ui/user-form";
import { TUser } from "../helpers/types";
import apiClient from "@/lib/apiClient";
import { useNavigate, useParams } from "react-router";
import { Button } from "@/components/ui/button";

const breadcrumbs: TBreadcrumbs = [
    { label: "Dashboard", href: "/" },
    { label: "Settings" },
    { label: "Users", href: '/settings/users' },
    { label: "Edit User" },
];

export default function UserEditPage() {
    const navigate = useNavigate();
    const { setBreadcrumbs } = useBreadcrumbs();
    const { userId } = useParams();
    const [user, setUser] = useState<TUser>();

    useEffect(() => {
        setBreadcrumbs(breadcrumbs);
        apiClient.get(`users/${userId}`)
            .then((response) => response.data)
            .then((body) => setUser(body.data))
    }, [])

    return <>
        <div className="w-full h-full flex flex-1 flex-col gap-4 w-full">
            <div className="flex justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Edit User.</h2>
                    <p className="text-muted-foreground">
                        Enter data information below to edit an user.
                    </p>
                </div>
                <div className="flex items-center">
                    <Button variant="outline" onClick={() => navigate(-1)}>Back</Button>
                </div>
            </div>
            {user && <UserForm method="PUT" url={`users/${userId}`} redirect="settings/users" data={user} />}
        </div>
    </>;
}