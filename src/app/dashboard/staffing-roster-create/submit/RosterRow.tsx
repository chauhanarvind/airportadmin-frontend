"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { TableRow, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import RoleSelector from "@/app/components/RoleSelector";
import clsx from "clsx";
import { StaffingItem } from "./StaffingTypes";

type RosterRowProps = {
  field: StaffingItem;
  index: number;
  isFirstRow: boolean;
  rowBg: string;
  append: (row: StaffingItem) => void;
  remove: (index: number) => void;
  groupCountForDay: number;
  rowIdxInGroup: number;
};

const RosterRow = React.memo(function RosterRow({
  field,
  index,
  isFirstRow,
  rowBg,
  append,
  remove,
  groupCountForDay,
  rowIdxInGroup,
}: RosterRowProps) {
  const { register, watch, setValue } = useFormContext();
  const currentRow = watch(`items.${index}`) as StaffingItem;

  const isRowFilled =
    currentRow?.jobRoleId &&
    currentRow?.jobLevelId &&
    currentRow?.requiredCount > 0 &&
    currentRow?.startTime &&
    currentRow?.endTime;

  const addRow = () => {
    if (!isRowFilled) return;
    append({
      day: field.day,
      jobRoleId: null,
      jobLevelId: null,
      requiredCount: 0,
      startTime: "",
      endTime: "",
    });
    setTimeout(() => {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    }, 0);
  };

  const clearRow = () => {
    setValue(`items.${index}.jobRoleId`, null);
    setValue(`items.${index}.jobLevelId`, null);
    setValue(`items.${index}.requiredCount`, 0);
    setValue(`items.${index}.startTime`, "");
    setValue(`items.${index}.endTime`, "");
  };

  return (
    <TableRow className={clsx("transition-all", rowBg, "hover:bg-muted/60")}>
      <TableCell className="font-medium">
        {isFirstRow ? field.day : ""}
      </TableCell>

      <TableCell>
        <RoleSelector
          label=""
          apiUrl="/api/job-roles/"
          name={`items.${index}.jobRoleId`}
          optionKey="roleName"
          required={false}
        />
      </TableCell>

      <TableCell>
        <RoleSelector
          label=""
          apiUrl="/api/job-levels/"
          name={`items.${index}.jobLevelId`}
          optionKey="levelName"
          required={false}
        />
      </TableCell>

      <TableCell>
        <Input
          type="number"
          min={0}
          className="w-full max-w-[80px] focus:ring-2 focus:ring-blue-500"
          {...register(`items.${index}.requiredCount`)}
        />
      </TableCell>

      <TableCell>
        <Input
          type="time"
          className="w-full max-w-[110px] focus:ring-2 focus:ring-blue-500"
          {...register(`items.${index}.startTime`)}
        />
      </TableCell>

      <TableCell>
        <Input
          type="time"
          className="w-full max-w-[110px] focus:ring-2 focus:ring-blue-500"
          {...register(`items.${index}.endTime`)}
        />
      </TableCell>

      <TableCell className="text-right space-x-2 pr-6 whitespace-nowrap flex justify-end items-center">
        {rowIdxInGroup === 0 && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={clearRow}
            disabled={groupCountForDay > 1}
          >
            Clear
          </Button>
        )}

        {rowIdxInGroup > 0 && (
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={() => remove(index)}
          >
            Delete
          </Button>
        )}

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addRow}
          className={clsx(!isFirstRow && "invisible")}
          disabled={!isRowFilled || rowIdxInGroup !== groupCountForDay - 1}
          tabIndex={isRowFilled ? 0 : -1}
        >
          +
        </Button>
      </TableCell>
    </TableRow>
  );
});

RosterRow.displayName = "RosterRow";
export default RosterRow;
