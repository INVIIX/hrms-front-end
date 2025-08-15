import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { EditProfileForm } from "../components/ui/edit-profile-form";
import { ChangePasswordForm } from "../components/ui/change-password-form";
import { Separator } from "@/components/ui/separator";
import { TBreadcrumbs, useBreadcrumbs } from "@/components/context/breadcrumb-context";
import { useEffect } from "react";

const breadcrumbs: TBreadcrumbs = [
    { label: "Dashboard", href: "/" },
    { label: "Settings" },
    { label: "My Account" },
];

export default function AuthProfilePage() {
    const navigate = useNavigate();
    const { setBreadcrumbs } = useBreadcrumbs();

    useEffect(() => {
        setBreadcrumbs(breadcrumbs);
    }, [])

    return <>
        <div className="w-full h-full flex flex-1 flex-col gap-4">
            <div className="flex justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">My Account</h2>
                    <p className="text-muted-foreground">
                        manage your account profile and password.
                    </p>
                </div>
                <div className="flex items-center">
                    <Button variant="outline" onClick={() => navigate(-1)}>Back</Button>
                </div>
            </div>
            <Separator />
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex flex-col md:w-[40%]">
                    <h3 className="text-xl font-bold">
                        Edit Profile
                    </h3>
                    <p className="text-muted-foreground text-sm text-balance">
                        Enter your information below update your account.
                    </p>
                </div>
                <div className="flex-1 border rounded p-4 shadow rounded-lg md:w-[60%]">
                    <EditProfileForm />
                </div>
            </div>
            <Separator />
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex flex-col md:w-[40%]">
                    <h3 className="text-xl font-bold">
                        Change Password
                    </h3>
                    <p className="text-muted-foreground text-sm text-balance">
                        Enter your new password below to update your password.
                    </p>
                </div>
                <div className="flex-1 border rounded p-4 shadow rounded-lg md:w-[60%]">
                    <ChangePasswordForm />
                </div>
            </div>
        </div >
    </>;
}