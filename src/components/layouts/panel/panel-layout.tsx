import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Outlet, useLocation } from "react-router";
import { PanelSidebar } from "./panel-sidebar";
import {
  HiOutlineLocationMarker,
  HiOutlineSun,
  HiOutlineMoon,
} from "react-icons/hi";

import { Separator } from "@/components/ui/separator";

import { PanelBreadcrumbs } from "./panel-breadcrumbs";
import { useBreadcrumbs } from "@/components/context/breadcrumb-context";
import { useEffect, useState } from "react";
import PWABadge from "@/components/commons/PWABadge";
import { useAuth } from "@/modules/auth/components/context/auth-context";

export default function PanelLayout() {
  const location = useLocation();
  const { setBreadcrumbs } = useBreadcrumbs();
  const { user } = useAuth();

  useEffect(() => {
    setBreadcrumbs([]);
  }, [location]);

  return (
    <>
      <SidebarProvider>
        <PanelSidebar />
        <SidebarInset>
          <header className="flex h-14 shrink-0 items-center gap-2 border-b">
            <div className="flex flex-1 items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <div className="sm:flex flex-col leading-tight hidden">
                <span className="text-md font-semibold text-gray-700 dark:text-gray-200">
                  Hallo, {user?.name}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  your work overview
                </span>
              </div>
              <div className="sm:flex flex-col leading-tight ms-5 hidden">
                <span className="text-sm bg-green-500 px-2 rounded-md text-white dark:bg-blue-500">
                  {user?.role == "0"
                    ? "Superadmin"
                    : user?.role == "1"
                    ? "Admin"
                    : "User"}
                </span>
              </div>
            </div>
            <div className="ml-auto px-4">
              <PWABadge />
              <div className="flex items-center gap-2 justify-center">
                <button
                  onClick={() => {
                    document.documentElement.classList.toggle("dark");
                  }}
                  className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                >
                  <HiOutlineSun className="hidden dark:block w-4 h-4 text-yellow-400" />
                  <HiOutlineMoon className="block dark:hidden w-4 h-4 text-gray-800" />
                </button>
                <HiOutlineLocationMarker className="w-4 h-4 text-gray-500 dark:text-gray-300" />
                <span className="text-sm">Office, South Jakarta</span>
              </div>
            </div>
          </header>
          <main className="w-full p-4">
            <div className="flex items-center justify-between mb-4">
              <PanelBreadcrumbs />
            </div>
            <Outlet />
          </main>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
