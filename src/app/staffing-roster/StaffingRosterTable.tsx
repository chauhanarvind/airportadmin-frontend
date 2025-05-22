"use client";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
} from "@/components/ui/table";
import RosterRow from "./RosterRow";
import { StaffingRosterTableProps } from "./StaffingTypes";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function StaffingRosterTable({
  fields,
  append,
  remove,
}: StaffingRosterTableProps) {
  const groupedByDay = days.map((day) =>
    fields.filter((field) => field.day === day)
  );

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Weekly Staffing Roster</h2>
      <div className="border rounded-xl overflow-x-auto shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Day</TableHead>
              <TableHead>Job Role</TableHead>
              <TableHead>Job Level</TableHead>
              <TableHead>Count</TableHead>
              <TableHead>Start</TableHead>
              <TableHead>End</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {groupedByDay.map((group, dayIdx) =>
              group.map((field, rowIdx) => {
                const index = fields.findIndex((f) => f.id === field.id);
                const isFirstRow = rowIdx === 0;
                const rowBg = dayIdx % 2 === 0 ? "bg-muted/40" : "";

                return (
                  <RosterRow
                    key={field.id}
                    field={field}
                    index={index}
                    isFirstRow={isFirstRow}
                    rowBg={rowBg}
                    append={append}
                    remove={remove}
                    groupCountForDay={group.length}
                    rowIdxInGroup={rowIdx}
                  />
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
