import { useState } from "react";
import { ChevronDown, ChevronUp, Clock, Calendar, Receipt, GraduationCap, FileText } from "lucide-react";

const activitiesData = [
  {
    date: "Today • Tue, 21 Jul 2025",
    expanded: true,
    items: [
      { icon: <Clock className="w-5 h-5" />, title: "Clock In", desc: "Clocked in at 08:58", time: "30m ago" },
      { icon: <Calendar className="w-5 h-5" />, title: "Annual Leave Request Made", desc: 'Your leave request “Cuti Tahunan” for 20 to 22 June 2025 has been made.', time: "1hr ago" },
      { icon: <FileText className="w-5 h-5" />, title: "Payroll Info Unhidden", desc: "You unhide your payroll info at 14:30", time: "2hrs ago" },
      { icon: <Clock className="w-5 h-5" />, title: "Swap Request from Maria Lopez", desc: "Maria Lopez requested a swap shift from you.", time: "2hrs ago" },
      { icon: <GraduationCap className="w-5 h-5" />, title: "Training Completed", desc: "You completed 101 Leadership", time: "2d ago" },
    ],
  },
  {
    date: "Sun, 19 Jul 2025",
    expanded: true,
    items: [
      { icon: <Receipt className="w-5 h-5" />, title: "Reimbursement Approved!", desc: "Your reimbursement claim for 4 Feb 2024 has been approved.", time: "2d ago" },
      { icon: <FileText className="w-5 h-5" />, title: "Education Loan Rejected", desc: "Your education loan with amount: Rp. 300.000,00 has been rejected", time: "2d ago" },
    ],
  },
  {
    date: "",
    expanded: false,
    items: [
      { icon: <FileText className="w-5 h-5" />, title: "Payslip Downloaded", desc: "Payslip for Sept 2025 downloaded", time: "4d ago" },
    ],
  },
];

export default function RecentActivitiesCard() {
  const [activities, setActivities] = useState(activitiesData);
  const [activityFilter, setActivityFilter] = useState("All Activities");
  const [timeFilter, setTimeFilter] = useState("This Week");

  const toggleExpand = (index) => {
    const updated = [...activities];
    updated[index].expanded = !updated[index].expanded;
    setActivities(updated);
  };

  return (
    <div className="p-4 bg-white border rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-semibold">Recent Activities</h2>
          <p className="text-sm text-gray-500">Time leaves a trace, here’s yours</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-4">
        <select
          className="border rounded px-3 py-2 text-sm"
          value={activityFilter}
          onChange={(e) => setActivityFilter(e.target.value)}
        >
          <option>All Activities</option>
          <option>Clock In</option>
          <option>Leave Request</option>
        </select>
        <select
          className="border rounded px-3 py-2 text-sm"
          value={timeFilter}
          onChange={(e) => setTimeFilter(e.target.value)}
        >
          <option>This Week</option>
          <option>This Month</option>
          <option>Last Month</option>
        </select>
      </div>

      {/* Activity Groups */}
      {activities.map((group, index) => (
        <div key={index} className="mb-4">
          {group.date && (
            <div
              className="flex justify-between items-center cursor-pointer text-sm font-medium text-gray-600"
              onClick={() => toggleExpand(index)}
            >
              <span>{group.date}</span>
              {group.expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>
          )}
          {group.expanded && (
            <div className="mt-2 space-y-3">
              {group.items.map((item, i) => (
                <div key={i} className="flex items-start gap-3 border-l-2 border-gray-200 pl-3">
                  <div className="text-gray-500">{item.icon}</div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </div>
                  <span className="text-xs text-gray-400">{item.time}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
