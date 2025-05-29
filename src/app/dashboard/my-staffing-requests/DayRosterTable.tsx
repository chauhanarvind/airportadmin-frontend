"use client";

import { useFormContext, useFieldArray } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { StaffingRequestCreate } from "../common/staffing-requests/StaffingRequestTypes";
import { uiTheme } from "@/app/lib/uiConfig";
import RoleSelector from "@/app/components/RoleSelector";

interface Props {
  day: { id: string; date: string };
  dayIndex: number;
}

export default function DayRosterTable({ day, dayIndex }: Props) {
  const { control, register } = useFormContext<StaffingRequestCreate>();

  const {
    fields: itemFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: `days.${dayIndex}.items`,
  });

  return (
    <div className="border rounded-md p-4 space-y-4">
      <h3 className="font-semibold text-lg">
        {new Date(day.date).toLocaleDateString(undefined, {
          weekday: "long",
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </h3>

      {itemFields.map((item, itemIndex) => (
        <div
          key={item.id}
          className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end"
        >
          <div>
            <RoleSelector
              label="Job Role"
              name={`days.${dayIndex}.items.${itemIndex}.jobRoleId`}
              apiUrl="/api/job-roles/"
              optionKey="roleName"
              required={true}
            />
          </div>

          <div>
            <RoleSelector
              label="Job Level"
              apiUrl="/api/job-levels/"
              name={`days.${dayIndex}.items.${itemIndex}.jobLevelId`}
              optionKey="levelName"
              required={true}
            />
          </div>

          <div>
            <Label>Required Count</Label>
            <Input
              type="number"
              {...register(
                `days.${dayIndex}.items.${itemIndex}.requiredCount`,
                { required: true }
              )}
            />
          </div>

          <div>
            <Label>Start Time</Label>
            <Input
              type="time"
              {...register(`days.${dayIndex}.items.${itemIndex}.startTime`, {
                required: true,
              })}
            />
          </div>

          <div>
            <Label>End Time</Label>
            <Input
              type="time"
              {...register(`days.${dayIndex}.items.${itemIndex}.endTime`, {
                required: true,
              })}
            />
          </div>

          <div>
            <Button
              className={uiTheme.buttons.destructive}
              variant="destructive"
              type="button"
              onClick={() => remove(itemIndex)}
            >
              Remove
            </Button>
          </div>
        </div>
      ))}

      <Button
        type="button"
        className="mt-2"
        onClick={() =>
          append({
            jobRoleId: 0,
            jobLevelId: 0,
            requiredCount: 1,
            startTime: "09:00",
            endTime: "17:00",
          })
        }
      >
        + Add Role
      </Button>
    </div>
  );
}
