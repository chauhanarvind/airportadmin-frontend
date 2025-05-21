"use client";

import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { format, addDays, startOfWeek, isBefore } from "date-fns";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function WeekPicker({
  replace,
}: {
  replace: (data: any[]) => void;
}) {
  const { setValue } = useFormContext();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const today = new Date();

  const generateWeekItems = (date: Date) => {
    const monday = startOfWeek(date, { weekStartsOn: 1 });
    return Array.from({ length: 7 }, (_, i) => {
      const d = addDays(monday, i);
      return {
        day: format(d, "EEEE"), // "Monday", "Tuesday", etc.
        jobRoleId: null,
        jobLevelId: null,
        requiredCount: 0,
        startTime: "",
        endTime: "",
      };
    });
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    const monday = startOfWeek(date, { weekStartsOn: 1 });
    if (isBefore(monday, startOfWeek(today, { weekStartsOn: 1 }))) return;

    const formatted = format(monday, "yyyy-MM-dd");
    setSelectedDate(monday);
    setValue("weekStart", formatted);
    replace(generateWeekItems(monday));
  };

  useEffect(() => {
    handleDateSelect(today); // Init on mount
  }, []);

  return (
    <div className="space-y-1">
      <Label>Select Week</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !selectedDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selectedDate
              ? `Week of ${format(selectedDate, "PPP")}`
              : "Pick a date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={selectedDate ?? undefined}
            onSelect={handleDateSelect}
            weekStartsOn={1}
            disabled={(date) =>
              isBefore(
                startOfWeek(date, { weekStartsOn: 1 }),
                startOfWeek(today, { weekStartsOn: 1 })
              )
            }
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
