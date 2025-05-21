"use client";

import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import RoleSelector from "@/app/components/RoleSelector";
import { toast } from "sonner";
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

type StaffingItem = {
  day: string;
  jobRoleId: number | null;
  jobLevelId: number | null;
  requiredCount: number;
  startTime: string;
  endTime: string;
};

type RosterFormData = {
  items: StaffingItem[];
};

export default function StaffingRosterTable() {
  const methods = useForm<RosterFormData>({
    defaultValues: {
      items: days.map((day) => ({
        day,
        jobRoleId: null,
        jobLevelId: null,
        requiredCount: 0,
        startTime: "",
        endTime: "",
      })),
    },
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const onSubmit = (data: RosterFormData) => {
    console.log("Submitted roster:", data);
    toast.success("Roster submitted successfully!");
    // TODO: send to API
  };

  const groupedByDay = days.map((day) =>
    fields.filter((field) => field.day === day)
  );

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="max-w-6xl mx-auto p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">Weekly Staffing Roster</h1>
          </div>

          <div className="border rounded-xl overflow-x-auto shadow">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[100px]">Day</TableHead>
                  <TableHead className="min-w-[160px]">Job Role</TableHead>
                  <TableHead className="min-w-[160px]">Job Level</TableHead>
                  <TableHead className="min-w-[100px]">Count</TableHead>
                  <TableHead className="min-w-[120px]">Start</TableHead>
                  <TableHead className="min-w-[120px]">End</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {groupedByDay.map((group, dayIdx) =>
                  group.map((field, rowIdx) => {
                    const index = fields.findIndex((f) => f.id === field.id);
                    const isFirstRow = rowIdx === 0;
                    const day = group[0].day;
                    const rowBg = dayIdx % 2 === 0 ? "bg-muted/40" : "";

                    return (
                      <TableRow key={field.id} className={clsx(rowBg)}>
                        <TableCell className="font-medium">
                          {isFirstRow ? day : ""}
                        </TableCell>

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
                            className="w-full max-w-[100px]"
                            {...register(`items.${index}.requiredCount`, {
                              required: "Required",
                              min: { value: 0, message: "Must be ≥ 0" },
                            })}
                          />
                        </TableCell>

                        <TableCell>
                          <Input
                            type="time"
                            className="w-full max-w-[120px]"
                            {...register(`items.${index}.startTime`, {
                              required: "Required",
                            })}
                          />
                        </TableCell>

                        <TableCell>
                          <Input
                            type="time"
                            className="w-full max-w-[120px]"
                            {...register(`items.${index}.endTime`, {
                              required: "Required",
                            })}
                          />
                        </TableCell>

                        <TableCell className="text-right space-x-2">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => remove(index)}
                          >
                            Delete
                          </Button>

                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            className={isFirstRow ? "" : "invisible"}
                            onClick={() =>
                              append({
                                day,
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
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>

          <Button type="submit" className="w-full">
            Submit Weekly Roster
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
