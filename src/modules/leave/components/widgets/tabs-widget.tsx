import React, { useState } from "react";
import { Tabs, Tab } from "../ui/tabs";

type TabsWidgetProps = {
  initialActive?: string;
  tabs: Tab[];
  onChange?: (key: string) => void;
};

export const TabsWidget: React.FC<TabsWidgetProps> = ({
  initialActive,
  tabs,
  onChange,
}) => {
  const [active, setActive] = useState<string>(initialActive || tabs[0].key);

  const handleTabChange = (key: string) => {
    setActive(key);
    onChange?.(key);
  };

  return <Tabs tabs={tabs} active={active} onTabChange={handleTabChange} />;
};