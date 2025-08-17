import React from "react";

type TabContentType = "table" | "chart";

export type Tab = {
  key: string;
  label: string;
  type: TabContentType;
};

type TabsProps = {
  tabs: Tab[];
  active: string;
  onTabChange: (key: string) => void;
};

export const Tabs: React.FC<TabsProps> = ({ tabs, active, onTabChange }) => {
  return (
    <div className="items-center gap-2 bg-gray-100 rounded-md px-2 py-1 w-fit hidden md:flex">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onTabChange(tab.key)}
          className={`flex items-center px-4 py-2 rounded-md transition font-medium text-sm
                    ${
                      active === tab.key
                        ? "bg-white text-black shadow dark:bg-blue-500 dark:text-white"
                        : "bg-transparent text-gray-500 hover:bg-gray-200"
                    }`}
        >
          <span className="font-normal text-sm">{tab.label}</span>
        </button>
      ))}
    </div>
  );
};
