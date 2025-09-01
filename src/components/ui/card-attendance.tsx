import { useState, useEffect } from "react";
import { Clock, LogIn } from "lucide-react";

export default function AttendanceCard() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) =>
    date.toLocaleTimeString("en-US", { hour12: true });

  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-GB", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

  return (
    <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-sm text-center border">
      {/* Current Time */}
      <div className="text-3xl font-bold">{formatTime(time)}</div>
      <div className="text-gray-500 text-sm">{formatDate(time)}</div>

      {/* Work Hours */}
      <div className="mt-2 text-gray-700 font-medium">
        Work hours <br />
        <span className="text-sm font-normal">
          In: 09:00 | Out: 18:00
        </span>
      </div>

      {/* Status */}
      <div className="mt-4 flex items-center justify-center text-red-500 font-semibold">
        <Clock className="w-4 h-4 mr-1" />
        Clocked out
      </div>

      {/* Info Section */}
      <div className="grid grid-cols-2 gap-4 mt-4 text-gray-500 text-sm">
        <div>
          <p>Clock in</p>
          <p className="text-lg font-semibold">--:--</p>
        </div>
        <div>
          <p>Clock out</p>
          <p className="text-lg font-semibold">--:--</p>
        </div>
        <div>
          <p>Hours worked</p>
          <p className="text-lg font-semibold">--:--</p>
        </div>
        <div>
          <p>Late time</p>
          <p className="text-lg font-semibold">--:--</p>
        </div>
      </div>

      {/* Button */}
      <button className="mt-6 w-full flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition">
        <LogIn className="w-5 h-5" />
        Clock In
      </button>
    </div>
  );
}
