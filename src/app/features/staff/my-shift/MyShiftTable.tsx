"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MyShift } from "./MyShiftTypes";

interface Props {
  weekStart: string;
  shifts: MyShift[];
}

export default function MyShiftTable({ weekStart, shifts }: Props) {
  const endOfWeek = new Date(weekStart);
  endOfWeek.setDate(endOfWeek.getDate() + 6);

  return (
    <div className="mt-6 bg-white p-4 rounded shadow">
      <h2 className="font-semibold text-lg mb-3">
        Week of{" "}
        {new Date(weekStart).toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
        })}{" "}
        –{" "}
        {endOfWeek.toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
        })}
      </h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Start</TableHead>
            <TableHead>End</TableHead>
            <TableHead>Location</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {shifts.map((shift) => (
            <TableRow key={shift.id}>
              <TableCell>
                {new Date(shift.date).toLocaleDateString(undefined, {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </TableCell>
              <TableCell>{shift.roleName}</TableCell>
              <TableCell>{shift.startTime}</TableCell>
              <TableCell>{shift.endTime}</TableCell>
              <TableCell>{shift.locationName}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
