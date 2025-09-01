import { Card } from "@/components/ui/card";

interface PerformanceCardProps {
  title: string;
  date: string;
  period: string;
  month: string;
  status: string;
  description?: string;
}

export default function PerformanceCard({
  title,
  date,
  period,
  month,
  status,
  description,
}: PerformanceCardProps) {
  return (
    <Card className="p-4 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-start">
        <h2 className="text-lg font-semibold">{title}</h2>
        <span className="text-sm text-gray-500">{date}</span>
      </div>
      <p className="text-gray-500 text-sm mb-4">Current period: {period}</p>

      <div className="border rounded-lg p-4 flex justify-between items-center">
        <div>
          <span className="bg-gray-200 text-gray-600 text-xs font-medium px-3 py-1 rounded-full">
            {status}
          </span>
          <h3 className="text-lg font-semibold mt-2">{month}</h3>
          <p className="text-gray-400 text-sm">{description || "Lorem Ipsum"}</p>
        </div>
        <div className="w-16 h-16 flex items-center justify-center rounded-lg bg-gray-50 text-gray-400 border">
          No Data
        </div>
      </div>

      <div className="mt-4">
        <h4 className="text-sm font-semibold">Catatan</h4>
        <p className="text-gray-400 text-sm">
          No description yet
        </p>
      </div>

      <div className="mt-4 text-right">
        <a href="#" className="text-sm text-gray-500 flex items-center justify-end gap-1">
          See more →
        </a>
      </div>
    </Card>
  );
}
