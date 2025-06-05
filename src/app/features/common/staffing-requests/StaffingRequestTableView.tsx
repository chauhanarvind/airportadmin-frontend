"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { uiTheme } from "@/app/lib/uiConfig";
import { StaffingRequestDayDetail } from "./StaffingRequestTypes";

interface Props {
  days: StaffingRequestDayDetail[];
}

// to view the detail of staffing request
export default function StaffingRequestTableView({ days }: Props) {
  return (
    <div className="space-y-6">
      {days.map((day) => (
        <div
          key={day.id}
          className={`${uiTheme.colors.card} ${uiTheme.spacing.cardPadding}`}
        >
          <h3 className="font-medium text-lg mb-2">
            {new Date(day.date).toLocaleDateString(undefined, {
              weekday: "long",
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </h3>

          {day.items.length === 0 ? (
            <p className="text-muted-foreground">
              No roles requested for this day.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Job Role</TableHead>
                  <TableHead>Job Level</TableHead>
                  <TableHead>Required Count</TableHead>
                  <TableHead>Start Time</TableHead>
                  <TableHead>End Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {day.items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.jobRoleName}</TableCell>
                    <TableCell>{item.jobLevelName}</TableCell>
                    <TableCell>{item.requiredCount}</TableCell>
                    <TableCell>{item.startTime}</TableCell>
                    <TableCell>{item.endTime}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      ))}
    </div>
  );
}
