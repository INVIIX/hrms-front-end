import { ArrowRight } from "lucide-react";
import { JSX } from "react/jsx-runtime";

interface LeaveItem {
  icon: JSX.Element;
  name: string;
  used: string;
  total: string;
  pending: string;
}

interface LeaveBalanceCardProps {
  title: string;
  totalUsed: string;
  totalAll: string;
  items: LeaveItem[];
}

export default function LeaveBalanceCard({
  title,
  totalUsed,
  totalAll,
  items,
}: LeaveBalanceCardProps) {
  return (
    <div className="border rounded-xl p-4 bg-white shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <span className="text-gray-700 text-sm">
          {totalUsed} <span className="text-gray-500">of {totalAll} used</span>
        </span>
      </div>

      {/* Items */}
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-100">
                {item.icon}
              </div>
              <span className="text-gray-700">{item.name}</span>
            </div>
            <div className="text-sm text-gray-700">
              {item.used}
              <span className="text-gray-500">/{item.total} used</span>
            </div>
            <span className="text-gray-400 text-sm">{item.pending} pending</span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex justify-end mt-4">
        <button className="flex items-center gap-1 text-gray-700 text-sm hover:underline">
          See more <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
