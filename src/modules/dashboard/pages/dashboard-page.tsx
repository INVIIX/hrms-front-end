"use client";

import AnalyticsCardList from "../components/ui/card-counter";
import { useEffect } from "react";
import {
  TBreadcrumbs,
  useBreadcrumbs,
} from "@/components/context/breadcrumb-context";
import { IdCardLanyard, FileSymlink, HandCoins } from "lucide-react";
import TitleHeader from "@/components/commons/title-header";
import { MdOutlineDataUsage } from "react-icons/md";
import {
  TbCalendarCheck,
  TbChartLine,
} from "react-icons/tb";
import Counter from "../components/context/caounter";

const breadcrumbs: TBreadcrumbs = [{ label: "Dashboard", href: "/" }];

const analytics = [
  {
    label: "total employee",
    value: 1234,
    growth: "+12% from last month",
    icon: <IdCardLanyard className="w-8 h-8 text-white p-1" />,
    bg: "bg-white dark:bg-gray-800",
  },
  {
    label: "attendance rate",
    value: 94.2,
    growth: "+2.1% from last month",
    icon: <FileSymlink className="w-9 h-9 text-white p-1" />,
    bg: "bg-white dark:bg-gray-800",
    isPercentage: true,
  },
  {
    label: "monthly paid",
    value: 2.4,
    growth: "+8.2% form last month",
    icon: <HandCoins className="w-8 h-8 text-white p-1" />,
    bg: "bg-white dark:bg-gray-800",
    isPercentage: false,
    suffix: "M",
  },
];

const overview = [
  {
    label: "Engineering",
    color: "#4B7EC1",
    value: 456,
  },
  {
    label: "Sales",
    color: "#1EA022",
    value: 234,
  },
  {
    label: "Marketing",
    color: "#FF9500",
    value: 100,
  },
  {
    label: "HR",
    color: "#AF52DE",
    value: 20,
  },
];

const activities = [
  {
    label: "New leave request approved",
    icon: <TbCalendarCheck className="w-8 h-8 text-blue-500 p-1" />,
    user: "Sarah Johnson",
    time: 3,
  },
  {
    label: "Performance review completed",
    icon: <TbChartLine className="w-8 h-8 text-blue-500 p-1" />,
    user: "Sarah Johnson",
    time: 3,
  },
];

export default function DashboardPage() {
  const { setBreadcrumbs } = useBreadcrumbs();

  useEffect(() => {
    setBreadcrumbs(breadcrumbs);
  }, []);
  
  return (
    <>
      <div className="w-full mih-screen">
        <AnalyticsCardList analytics={analytics} />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col col-span-1">
            <TitleHeader
              icon={<MdOutlineDataUsage className="w-4 h-4 text-blue-700" />}
              title="Departments Overview"
              desc="Employee distribution across departments"
            />

            <div className="mt-4 space-y-3 p-2">
              {overview.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-block w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-200">
                      {item.label}
                    </span>
                  </div>
                  <span className="font-medium text-sm text-gray-900 dark:text-gray-800 bg-gray-200 px-2 rounded-md">
                    <Counter
                      value={item.value}
                      decimals={0}
                      format={(val) =>
                        val.toLocaleString("id-ID", {
                          maximumFractionDigits: 0,
                        })
                      }
                    />
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col col-span-2">
            <TitleHeader
              icon={<MdOutlineDataUsage className="w-4 h-4 text-blue-700" />}
              title="Recent Activities"
              desc="Latest system activities"
            />

            <div className="mt-4 space-y-3">
              {activities.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between bg-gray-200 p-4 rounded-md"
                >
                  <div className="flex items-center gap-5">
                    {item.icon}
                    <div className="flex flex-col">
                      <span className="text-md font-semibold text-gray-700 dark:text-gray-800">
                        {item.label}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {item.user} - {item.time} days
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* <h1 className="text-2xl font-bold mb-4">
          Welcome to the Dashboard Page
        </h1>
        <p>This is the main content area of the dashboard page.</p> */}
      </div>
    </>
  );
}
