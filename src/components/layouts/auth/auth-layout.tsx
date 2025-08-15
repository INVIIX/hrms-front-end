"use client"

import { cn } from "@/lib/utils";
import { Outlet } from "react-router";

export default function AuthLayout({
    className,
    ...props
}: React.ComponentProps<"div">) {
    return (
        <div className={cn("flex flex-col bg-gray-100 items-center justify-center min-h-screen", className)} {...props}>
            <div className="w-full max-w-lg p-6">
                <Outlet />
            </div>
        </div>
    );
}