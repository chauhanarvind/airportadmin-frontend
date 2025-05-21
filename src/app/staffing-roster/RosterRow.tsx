"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { TableRow, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import RoleSelector from "@/app/components/RoleSelector";
import clsx from "clsx";

type RosterRowProps = {
  field: any;
  index: number;
  isFirstRow: boolean;
  rowBg: string;
  append: (row: any) => void;
  remove: (index: number) => void;
};

const RosterRow = React.memo(function RosterRow({
  field,
  index,
  isFirstRow,
  rowBg,
  append,
  remove,
}: RosterRowProps) {
  const { register } = useFormContext();

  const addRows = () => {
    append({
      day: field.day,
      jobRoleId: null,
      jobLevelId: null,
      requiredCount: 0,
      startTime: "",
      endTime: "",
    });
  };
  return (
    <TableRow className={clsx(rowBg)}>
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
          autoFocus={false}
          className="w-full max-w-[100px]"
          {...register(`items.${index}.requiredCount`)}
        />
      </TableCell>

      <TableCell>
        <Input
          type="time"
          className="w-full max-w-[120px]"
          {...register(`items.${index}.startTime`)}
        />
      </TableCell>

      <TableCell>
        <Input
          type="time"
          className="w-full max-w-[120px]"
          {...register(`items.${index}.endTime`)}
        />
      </TableCell>

      <TableCell className="text-right space-x-2">
        <Button
          type="button"
          variant="destructive"
          size="sm"
          onClick={() => remove(index)}
        >
          Delete
        </Button>

        {isFirstRow && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => addRows()}
          >
            +
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
});

RosterRow.displayName = "RosterRow";

export default RosterRow;
