import TitleHeader from "@/components/commons/title-header";
import { MdOutlineDataUsage } from "react-icons/md";
import { useRef, useState } from "react";
import { ClockStatusCard } from "@/components/ui/card-clock";
import { Calendar, Clock, TrendingUp, GraduationCap, HandCoins, Heart, Shield } from "lucide-react";
import FeatureCard from "@/components/ui/card-worklife";
import LeaveBalanceCard from "@/components/ui/card-leave-balanced";
import PerformanceCard from "@/components/ui/card-performance";
import RecentActivitiesCard from "@/components/ui/card-recent-activities";
import AttendanceCard from "@/components/ui/card-attendance";
import RecentAttendanceLogs from "@/components/ui/card-attendance-log";

const features = [
  { icon: <Calendar size={28} />, title: "Leave" },
  { icon: <Clock size={28} />, title: "Shifts" },
  { icon: <TrendingUp size={28} />, title: "Performance" },
  { icon: <GraduationCap size={28} />, title: "Training" },
  { icon: <HandCoins size={28} />, title: "Loan" },
];
const leaveItems = [
  {
    icon: <Shield className="text-blue-500 w-4 h-4" />,
    name: "5-Year Leave",
    used: "5",
    total: "12",
    pending: "5",
  },
  {
    icon: <Heart className="text-pink-500 w-4 h-4" />,
    name: "Sick Leave",
    used: "5",
    total: "54",
    pending: "2",
  },
];
export default function Attendance() {

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <TitleHeader
        icon={<MdOutlineDataUsage className="w-4 h-4 text-blue-700" />}
        title="Attendance"
        desc=""
      />
      {/* Left Column */}
      <div className="flex flex-col gap-4 w-full md:w-1/3">
        <AttendanceCard />
        <RecentAttendanceLogs />
      </div>
      {/* <div className="flex-1 p-4 border rounded-sm bg-white">
        <h2 className="text-xl font-semibold mb-4">My Worklife</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {features.map((feature, index) => (
            <FeatureCard key={index} icon={feature.icon} title={feature.title} />
          ))}
        </div>
      </div>
      */}

    </div>
  );
}
