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
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useMemo } from "react";

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
  // 🧠 Memoized grouping to reduce unnecessary re-renders
  const groupedByDay = useMemo(() => {
    return days.map((day) => fields.filter((field) => field.day === day));
  }, [fields]);

  return (
    <Card className="rounded-2xl shadow-md">
      <CardHeader>
        <CardTitle className="text-xl">Weekly Staffing Roster</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <div className="border rounded-lg">
          <Table>
            <TableHeader className="bg-muted">
              <TableRow>
                <TableHead className="min-w-[80px] sticky top-0 z-10 bg-muted">
                  Day
                </TableHead>
                <TableHead className="min-w-[150px]">Job Role</TableHead>
                <TableHead className="min-w-[150px]">Job Level</TableHead>
                <TableHead className="min-w-[80px]">Count</TableHead>
                <TableHead className="min-w-[100px]">Start</TableHead>
                <TableHead className="min-w-[100px]">End</TableHead>
                <TableHead className="text-right min-w-[120px] pr-6">
                  Actions
                </TableHead>
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
      </CardContent>
    </Card>
  );
}
