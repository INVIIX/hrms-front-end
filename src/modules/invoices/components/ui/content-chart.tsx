import { Coins, Activity, BanknoteArrowUp, HandCoins } from "lucide-react";
import SalariesCardList from "../widgets/card-counter";
import { Card } from "@/components/ui/card";
import ReactApexChart from "react-apexcharts";
import TitleHeader from "@/components/commons/title-header";
import { MdOutlineDataUsage } from "react-icons/md";

const analyticsData = [
  {
    label: "total payroll",
    value: 1000000,
    growth: "annual compensation",
    icon: <HandCoins className="w-8 h-8 text-white p-1" />,
    bg: "bg-white dark:bg-gray-800",
    prefix: "Rp. ",
  },
  {
    label: "average salaries",
    value: 1000000,
    growth: "per employee",
    icon: <Coins className="w-9 h-9 text-white p-1" />,
    bg: "bg-white dark:bg-gray-800",
    prefix: "Rp. ",
  },
  {
    label: "highest paid",
    value: 1000000,
    growth: "maximum compensation",
    icon: <BanknoteArrowUp className="w-8 h-8 text-white p-1" />,
    bg: "bg-white dark:bg-gray-800",
    prefix: "Rp. ",
  },
  {
    label: "salary range",
    value: 1000000000,
    growth: "lorem",
    icon: <Activity className="w-8 h-8 text-white p-1" />,
    bg: "bg-white dark:bg-gray-800",
    prefix: "Rp. ",
  },
];

const divisionData = [
  { label: "Engineering", value: 500000, color: "#3b82f6" },
  { label: "Marketing", value: 300000, color: "#10b981" },
  { label: "Sales", value: 400000, color: "#f59e0b" },
  { label: "HR", value: 200000, color: "#ef4444" },
  { label: "Finance", value: 350000, color: "#8b5cf6" },
];

type ContentChartProps = { showValues: boolean };

export default function ContentChart({ showValues }: ContentChartProps) {
  const analytics = analyticsData.map((item) => ({
    ...item,
    value: showValues ? item.value : "*******",
  }));

  const pieSeries = divisionData.map((item) => item.value);
  const pieOptions: ApexCharts.ApexOptions = {
    chart: { type: "pie", toolbar: { show: false } },
    labels: divisionData.map((item) => item.label),
    legend: { position: "bottom" },
    colors: divisionData.map((item) => item.color),
    dataLabels: {
      formatter: (_, opts) =>
        showValues
          ? `Rp. ${divisionData[opts.seriesIndex].value.toLocaleString()}`
          : "*******",
    },
    tooltip: {
      y: {
        formatter: (_, opts) =>
          showValues
            ? `Rp. ${divisionData[opts.seriesIndex].value.toLocaleString()}`
            : "*******",
      },
    },
  };

  const barSeries = [
    {
      name: "Salary",
      data: divisionData.map((item) => item.value),
    },
  ];
  const barOptions: ApexCharts.ApexOptions = {
    chart: { type: "bar", toolbar: { show: false } },
    xaxis: { categories: divisionData.map((item) => item.label) },
    colors: divisionData.map((item) => item.color),
    dataLabels: {
      enabled: true,
      formatter: (val: number) =>
        showValues ? `Rp. ${val.toLocaleString()}` : "*******",
    },
    tooltip: {
      y: {
        formatter: (val: number) =>
          showValues ? `Rp. ${val.toLocaleString()}` : "*******",
      },
    },
    yaxis: { labels: { formatter: (val) => `Rp. ${val.toLocaleString()}` } },
  };

  return (
    <>
      <SalariesCardList analytics={analytics} />
      <div className="flex flex-col md:flex-row gap-4 mt-4">
        <Card className="flex-1 p-4">
          <TitleHeader
            icon={<MdOutlineDataUsage className="w-4 h-4 text-blue-700" />}
            title="Compensation Breakdown"
            desc="Total compensation by component."
          />
          <ReactApexChart
            key={showValues ? "show" : "hide"}
            options={pieOptions}
            series={pieSeries}
            type="pie"
            height={300}
          />
        </Card>

        <Card className="flex-1 p-4">
          <TitleHeader
            icon={<MdOutlineDataUsage className="w-4 h-4 text-blue-700" />}
            title="Department Salary Overview"
            desc="Average salary by department."
          />
          <ReactApexChart
            key={showValues ? "show-bar" : "hide-bar"}
            options={barOptions}
            series={barSeries}
            type="bar"
            height={300}
          />
        </Card>
      </div>
    </>
  );
}
