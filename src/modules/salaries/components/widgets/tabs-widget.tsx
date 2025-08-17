import React, { useState } from "react";
import { Tabs, Tab } from "../ui/tabs";

type TabsWidgetProps = {
  initialActive?: string;
  tabs: Tab[];
  onChange?: (key: string) => void;
  renderTable?: (tabKey: string) => React.ReactNode;
  renderChart?: (tabKey: string) => React.ReactNode;
};

export const TabsWidget: React.FC<TabsWidgetProps> = ({
  initialActive,
  tabs,
  onChange,
  renderTable,
  renderChart,
}) => {
  const [active, setActive] = useState<string>(initialActive || tabs[0].key);

  const handleTabChange = (key: string) => {
    setActive(key);
    onChange?.(key);
  };

  const currentTab = tabs.find((tab) => tab.key === active);

  // return <Tabs tabs={tabs} active={active} onTabChange={handleTabChange} />;
  return (
    <div>
      <Tabs tabs={tabs} active={active} onTabChange={handleTabChange} />

      <div className="mt-4">
        {currentTab?.type === "table" && renderTable && renderTable(active)}
        {currentTab?.type === "chart" && renderChart && renderChart(active)}
      </div>
    </div>
  );
};
