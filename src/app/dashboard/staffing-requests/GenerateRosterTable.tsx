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
import { GroupedDay } from "../common/Assignment/Types";

interface Props {
  days: GroupedDay[];
}

export default function GenerateRosterTable({ days }: Props) {
  return (
    <div className="space-y-6">
      {days.map((day) => (
        <div
          key={day.date}
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

          {day.assignments.length === 0 ? (
            <p className="text-muted-foreground">
              No assignments for this day.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Job Role</TableHead>
                  <TableHead>Start Time</TableHead>
                  <TableHead>End Time</TableHead>
                  <TableHead>Assigned To</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {day.assignments.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.roleName}</TableCell>
                    <TableCell>{item.startTime}</TableCell>
                    <TableCell>{item.endTime}</TableCell>
                    <TableCell>
                      {item.unassigned ? (
                        <span className="text-red-500 font-medium">
                          Unassigned
                        </span>
                      ) : (
                        item.userFullName
                      )}
                    </TableCell>
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
