"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { StaffingRequestDayCreate } from "./StaffingRequestTypes";

interface Props {
  onWeekChange: (days: StaffingRequestDayCreate[]) => void;
}

export default function WeekPicker({ onWeekChange }: Props) {
  const [selectedDate, setSelectedDate] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputDate = e.target.value;
    setSelectedDate(inputDate);

    const week = generateWeekFromDate(inputDate);
    const weekDays: StaffingRequestDayCreate[] = week.map((date) => ({
      date,
      items: [],
    }));

    onWeekChange(weekDays);
  };
  const today = new Date().toISOString().split("T")[0];
  return (
    <div className="space-y-2">
      <Label htmlFor="weekStart" className="font-medium">
        Select any date in the target week
      </Label>
      <Input
        id="weekStart"
        type="date"
        value={selectedDate}
        onChange={handleChange}
        min={today}
      />
    </div>
  );
}

function generateWeekFromDate(dateStr: string): string[] {
  const selected = new Date(dateStr);
  if (isNaN(selected.getTime())) return [];

  const monday = new Date(selected);
  const day = selected.getDay(); // Sunday = 0, Monday = 1, ..., Saturday = 6
  const diff = day === 0 ? -6 : 1 - day; // shift Sunday to previous Monday
  monday.setDate(selected.getDate() + diff);

  const week: string[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    week.push(d.toISOString().slice(0, 10)); // "YYYY-MM-DD"
  }

  return week;
}
