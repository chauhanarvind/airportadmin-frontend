"use client";

import { StaffingRequestDay } from "./staffing";

type Props = {
  days: StaffingRequestDay[];
};

export default function WeeklyRosterTable({ days }: Props) {
  return (
    <div className="border rounded-md">
      <table className="w-full text-sm">
        <thead className="bg-muted text-left">
          <tr>
            <th className="p-3">Date</th>
            <th className="p-3">Job Role</th>
            <th className="p-3">Job Level</th>
            <th className="p-3">Start</th>
            <th className="p-3">End</th>
            <th className="p-3">Count</th>
          </tr>
        </thead>
        <tbody>
          {days.map((day) =>
            day.items.map((item, i) => (
              <tr key={`${day.date}-${i}`} className="border-t">
                <td className="p-3">{day.date}</td>
                <td className="p-3">{item.jobRoleName}</td>
                <td className="p-3">{item.jobLevelName}</td>
                <td className="p-3">{item.startTime}</td>
                <td className="p-3">{item.endTime}</td>
                <td className="p-3">{item.requiredCount}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
