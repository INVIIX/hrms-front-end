"use client";

import { Sidebar, SidebarContent } from "@/components/ui/sidebar";

import { BadgeCheck, CogIcon, LogOut } from "lucide-react";

import {
  HomeIcon,
  UserRoundPen,
  IdCardLanyard,
  FileSymlink,
  Users,
  HandCoins,
  UserRoundX,
  FileBadge,
  ChartPie,
  ChartSpline,
  BanknoteArrowDown,
} from "lucide-react";

import { PanelSidebarMenu } from "./panel-sidebar-menu";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/modules/auth/components/context/auth-context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitialName } from "../../../modules/auth/helpers/utils";
import { NavLink } from "react-router";
import { Separator } from "@/components/ui/separator";
import { useIsMobile } from "@/hooks/use-mobile";
import { MobileBottomBar } from "./panel-bottombar";

export function PanelSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth();
  // console.log(user)
  const mainNavs = [
    {
      title: "Dashboard",
      icon: HomeIcon,
      url: "/",
      roles: ["developer", "employee", "manager"],
    },
    {
      title: "User Management",
      icon: UserRoundPen,
      url: "/users",
      roles: ["developer", "employee", "manager"]
    },
    {
      title: "Employees Data",
      icon: IdCardLanyard,
      url: "/employees",
      roles: ["developer", "employee", "manager"]
    },
    {
      title: "Reporting Lines",
      icon: FileSymlink,
      url: "/lines",
      roles: ["developer", "employee", "manager"]
    },
    {
      title: "Group Management",
      icon: Users,
      url: "/group",
      roles: ["developer", "employee", "manager"]
    },
    {
      title: "Salaries",
      icon: HandCoins,
      url: "/salaries",
      roles: ["developer", "employee", "manager"]
    },
    {
      title: "Loans Management",
      icon: BanknoteArrowDown,
      url: "/loans",
      roles: ["developer", "employee", "manager"]
    },
    {
      title: "Leave",
      icon: UserRoundX,
      url: "/leave",
      roles: ["developer", "employee", "manager"]
    },
    {
      title: "Invoices",
      icon: FileBadge,
      url: "/invoices",
      roles: ["developer", "employee", "manager"]
    },
    {
      title: "KPI Management",
      icon: ChartPie,
      url: "/kpi",
      roles: ["developer", "employee", "manager"]
    },
    {
      title: "Reports",
      icon: ChartSpline,
      url: "/report",
      roles: ["developer", "employee", "manager"]
    },
    {
      title: "Settings",
      icon: CogIcon,
      roles: ["developer", "employee", "manager"],
      children: [
        { title: "Group", url: "/settings/groups" },
        { title: "Position", url: "/settings/positions" },
        { title: "Salary Component", url: "/settings/salary-components" },
      ],
    },
    {
      title: "Home",
      icon: HomeIcon,
      roles: ["adipermana", "employee", "manager"],
      url: "/home",
    },
    {
      title: "Attendance",
      icon: HomeIcon,
      roles: ["adipermana", "employee", "manager"],
      url: "/attendance",
    },
  ];

  const userRole = user?.name ?? "";
  console.log(userRole)

  // const filteredNavs = mainNavs.filter(nav => {
  //   // Jika ada properti roles, cek apakah userRole termasuk
  //   if (nav.roles && !nav.roles.includes(userRole)) {
  //     return false;
  //   }
  //   return true;
  // });
  const filteredNavs = mainNavs
    .map(nav => {
      if (nav.children) {
        const filteredChildren = nav.children.filter(child =>
          !child.roles || child.roles.includes(userRole)
        );
        return { ...nav, children: filteredChildren };
      }
      return nav;
    })
    .filter(nav => {
      if (nav.roles && !nav.roles.includes(userRole)) return false;
      if (nav.children && nav.children.length === 0) return false;
      return true;
    });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Sidebar variant="inset" collapsible="icon" {...props}>
      <SidebarContent>
        <div className="group flex items-center space-x-3 p-4">
          <img
            src="../icons.svg"
            alt="Logo"
            className="w-6 h-6 transition-all duration-200 group-data-[state=collapsed]:w-5 group-data-[state=collapsed]:h-5"
          />
          <span className="text-lg font-semibold text-gray-800 dark:text-white transition-opacity duration-200 group-data-[state=collapsed]:opacity-0 group-data-[state=collapsed]:w-0 overflow-hidden">
            RS. PAMULANG
          </span>
        </div>
        <Separator />
      
          <PanelSidebarMenu navTitle="Main Navigation" navs={filteredNavs} />
     
       
        <div className="flex-1" />
      </SidebarContent>

      <div
        className="relative p-4 group-data-[state=collapsed]:p-2 border-t border-gray-200 dark:border-gray-700"
        ref={dropdownRef}
      >
        <div
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 p-2 group-data-[state=collapsed]:p-0 rounded-lg"
        >
          <Avatar className="h-8 w-8 cursor-pointer">
            <AvatarImage src={user?.avatar} alt={user?.name} />
            <AvatarFallback className="rounded-lg">
              {getInitialName(user?.name ?? "U")}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col overflow-hidden group-data-[state=collapsed]:opacity-0 group-data-[state=collapsed]:w-0">
            <span className="text-sm font-semibold text-gray-800 dark:text-white">
              {user?.name}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {user?.email}
            </span>
          </div>
        </div>

        {isDropdownOpen && (
          <div className="absolute bottom-full mb-2 left-2 w-56 bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-50">
            <div className="flex items-center px-4 py-2 text-gray-500 text-sm">
              <span>{user?.email}</span>
            </div>
            <NavLink to="me">
              <div className="w-full flex items-center px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700">
                <BadgeCheck className="me-2 w-4 h-4" /> Profile
              </div>
            </NavLink>
            <button
              onClick={logout}
              className="w-full flex items-center px-4 py-2 text-left text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <LogOut className="me-2 w-4 h-4" /> Logout
            </button>
          </div>
        )}
      </div>
    </Sidebar>
  );
}
