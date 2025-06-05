"use client";

import { useEffect, useState } from "react";
import PageHeader from "@/app/components/ui/PageHeader";
import PageContainer from "@/app/components/layout/PageContainer";
import PageLoader from "@/app/components/ui/PageLoader";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { uiTheme } from "@/app/lib/uiConfig";
import { handleFetchList } from "@/app/lib/crudService";
import { MyShift } from "./MyShiftTypes";
import { useAuth } from "@/app/components/AuthProvider";

// Helper to get Monday of the week
function getWeekStart(dateStr: string): string {
  const date = new Date(dateStr);
  const day = date.getDay(); // Sunday = 0
  const diff = date.getDate() - day + (day === 0 ? -6 : 1); // adjust when Sunday
  const monday = new Date(date.setDate(diff));
  monday.setHours(0, 0, 0, 0);
  return monday.toISOString().split("T")[0]; // "YYYY-MM-DD"
}

export default function MyShiftsPage() {
  const [shiftGroups, setShiftGroups] = useState<Record<string, MyShift[]>>({});
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  useEffect(() => {
    const fetchShifts = async () => {
      const res = await handleFetchList<MyShift[]>(
        `/api/roster/my/${user?.id}`,
        "My Shifts"
      );
      console.log(res);
      if (!res) return;

      // Filter out unassigned shifts
      const assignedShifts = res.filter((shift) => !shift.unassigned);

      // Group by week
      const grouped: Record<string, MyShift[]> = {};
      assignedShifts.forEach((shift) => {
        const weekStart = getWeekStart(shift.date);
        if (!grouped[weekStart]) grouped[weekStart] = [];
        grouped[weekStart].push(shift);
      });

      setShiftGroups(grouped);
      setLoading(false);
    };

    fetchShifts();
  }, [user?.id]);

  if (loading) return <PageLoader />;

  const sortedWeeks = Object.keys(shiftGroups).sort();

  return (
    <PageContainer>
      <PageHeader title="My Assigned Shifts" />

      {sortedWeeks.length === 0 && (
        <p className="text-muted-foreground mt-4">No shifts assigned.</p>
      )}

      {sortedWeeks.map((weekStart) => {
        const shifts = shiftGroups[weekStart];
        const endOfWeek = new Date(weekStart);
        endOfWeek.setDate(endOfWeek.getDate() + 6);

        return (
          <div
            key={weekStart}
            className={`${uiTheme.colors.card} ${uiTheme.spacing.cardPadding} mt-6`}
          >
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
      })}
    </PageContainer>
  );
}
