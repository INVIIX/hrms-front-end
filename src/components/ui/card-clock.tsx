import { useState, useEffect } from "react";
import { ClockIcon } from "lucide-react";
import moment from "moment";

interface ClockStatusCardProps {
  initialStatus?: "clocked-in" | "clocked-out";
}

export function ClockStatusCard({ initialStatus = "clocked-out" }: ClockStatusCardProps) {
  const [status, setStatus] = useState(initialStatus);
  const [time, setTime] = useState(moment());

  // Update time every second
  useEffect(() => {
    const interval = setInterval(() => setTime(moment()), 1000);
    return () => clearInterval(interval);
  }, []);

  const isClockedIn = status === "clocked-in";

  const handleToggle = () => {
    setStatus(isClockedIn ? "clocked-out" : "clocked-in");
  };

  return (
    <div className="border rounded-lg bg-white border-red-400 p-4 w-full max-w-md shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-600 font-medium">Current status:</p>
          <p
            className={`flex items-center gap-1 font-semibold text-lg ${
              isClockedIn ? "text-green-600" : "text-red-600"
            }`}
          >
            <ClockIcon className="w-5 h-5" />
            {isClockedIn ? "Clocked in" : "Clocked out"}
          </p>
        </div>
        <button
          onClick={handleToggle}
          className={`flex items-center gap-2 px-4 py-2 rounded-md font-semibold text-white ${
            isClockedIn ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          <ClockIcon className="w-5 h-5" />
          {isClockedIn ? "Clock Out" : "Clock In"}
        </button>
      </div>

      <div className="mt-4">
        <p className="text-3xl font-bold">{time.format("h:mm:ss A")}</p>
        <p className="text-gray-500">{time.format("dddd, DD MMMM YYYY")}</p>
      </div>
    </div>
  );
}
