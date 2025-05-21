"use client";

import { useFormContext } from "react-hook-form";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import RoleSelector from "@/app/components/RoleSelector";
import clsx from "clsx";

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
}: {
  fields: any[];
  append: Function;
  remove: Function;
}) {
  const { register } = useFormContext();

  const groupedByDay = days.map((day) =>
    fields.filter((field) => field.day?.trim() === day)
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
                  <TableRow key={field.id} className={clsx(rowBg)}>
                    <TableCell>{isFirstRow ? field.day : ""}</TableCell>

                    <TableCell>
                      <RoleSelector
                        label=""
                        apiUrl="/api/job-roles/"
                        name={`items.${index}.jobRoleId`}
                        optionKey="roleName"
                      />
                    </TableCell>

                    <TableCell>
                      <RoleSelector
                        label=""
                        apiUrl="/api/job-levels/"
                        name={`items.${index}.jobLevelId`}
                        optionKey="levelName"
                      />
                    </TableCell>

                    <TableCell>
                      <Input
                        type="number"
                        min={0}
                        {...register(`items.${index}.requiredCount`)}
                      />
                    </TableCell>

                    <TableCell>
                      <Input
                        type="time"
                        {...register(`items.${index}.startTime`)}
                      />
                    </TableCell>

                    <TableCell>
                      <Input
                        type="time"
                        {...register(`items.${index}.endTime`)}
                      />
                    </TableCell>

                    <TableCell className="text-right space-x-2">
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={() => remove(index)}
                      >
                        Delete
                      </Button>
                      {isFirstRow && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() =>
                            append({
                              day: field.day,
                              jobRoleId: null,
                              jobLevelId: null,
                              requiredCount: 0,
                              startTime: "",
                              endTime: "",
                            })
                          }
                        >
                          +
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
