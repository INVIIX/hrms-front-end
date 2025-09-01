import { useState } from "react";
import { CalendarDays } from "lucide-react";

const mockData = [
  { date: "21 Jul 2024", clockIn: "09:00", clockOut: "18:00", hours: "9 hours" },
  { date: "20 Jul 2024", clockIn: "09:00", clockOut: "18:00", hours: "9 hours" },
  { date: "19 Jul 2024", clockIn: "09:00", clockOut: "18:00", hours: "9 hours" },
  { date: "18 Jul 2024", clockIn: "09:00", clockOut: "18:00", hours: "9 hours" },
  { date: "17 Jul 2024", clockIn: "09:00", clockOut: "18:00", hours: "9 hours" },
  { date: "16 Jul 2024", clockIn: "09:00", clockOut: "18:00", hours: "9 hours" },
];

export default function RecentAttendanceLogs() {
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(mockData.length / itemsPerPage);
  const paginatedData = mockData.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-lg">
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <CalendarDays className="w-5 h-5 text-gray-700" />
        <h2 className="text-lg font-semibold">Recent Attendance Logs</h2>
      </div>
      <p className="text-gray-500 text-sm mb-4">Your past attendance entries</p>

      {/* Filter */}
      <div className="mb-4">
        <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-40">
          <option>This Week</option>
          <option>Last Week</option>
          <option>This Month</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm text-gray-700">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Tanggal</th>
              <th className="text-left py-2">Clock In</th>
              <th className="text-left py-2">Clock Out</th>
              <th className="text-left py-2">Jam Kerja</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="py-2">{item.date}</td>
                <td className="py-2">{item.clockIn}</td>
                <td className="py-2">{item.clockOut}</td>
                <td className="py-2">{item.hours}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
        <p>Showing {paginatedData.length} of {mockData.length}</p>
        <div className="flex items-center gap-2">
          <button
            className="px-2 py-1 rounded border disabled:opacity-50"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            &lt;
          </button>
          <span>{page}</span>
          <button
            className="px-2 py-1 rounded border disabled:opacity-50"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}
