"use client";

import { useEffect, useState } from "react";
import PageHeader from "@/app/components/ui/PageHeader";
import PageContainer from "@/app/components/layout/PageContainer";
import PageLoader from "@/app/components/ui/PageLoader";

import { handleFetchList } from "@/app/lib/crudService";
import { useAuth } from "@/app/components/AuthProvider";
import MyShiftTable from "./MyShiftTable";

interface MyShift {
  id: number;
  date: string;
  roleName: string;
  startTime: string;
  endTime: string;
  locationName: string;
  userFullName?: string;
  unassigned?: boolean;
}

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
    if (!user?.id) return;

    const fetchShifts = async () => {
      const res = await handleFetchList<MyShift[]>(
        `/api/roster/my/${user.id}`,
        "My Shifts"
      );
      if (!res) return;

      const assignedShifts = res.filter((shift) => !shift.unassigned);

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
        return (
          <MyShiftTable key={weekStart} weekStart={weekStart} shifts={shifts} />
        );
      })}
    </PageContainer>
  );
}
