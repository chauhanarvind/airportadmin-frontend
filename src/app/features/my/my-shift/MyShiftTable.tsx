"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import { toast } from "sonner";
import { CoveringUserOption, MyShift } from "./MyShiftTypes";
import { UserResponse } from "../../admin/users/UserTypes";
import { useAuth } from "@/app/components/AuthProvider";
import { handleCreate, handleFetchList } from "@/app/lib/crudService";

interface Props {
  weekStart: string;
  shifts: MyShift[];
}

export default function MyShiftTable({ weekStart, shifts }: Props) {
  const endOfWeek = new Date(weekStart);
  endOfWeek.setDate(endOfWeek.getDate() + 6);

  const { user } = useAuth();
  const [openRow, setOpenRow] = useState<number | null>(null);
  const [coveringUsers, setCoveringUsers] = useState<CoveringUserOption[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<Record<number, number>>(
    {}
  );
  const [warnings, setWarnings] = useState<Record<number, string[]>>({});

  useEffect(() => {
    handleFetchList<UserResponse[]>("/api/users/all", "Users", (data) => {
      const minimal = data.map((u) => ({
        id: u.id,
        firstName: u.firstName,
        lastName: u.lastName,
      }));
      setCoveringUsers(minimal);
    });
  }, []);

  const handleSubmitRequest = async (shift: MyShift, forceSubmit = false) => {
    const coveringUserId = selectedUsers[shift.id];
    if (!coveringUserId) {
      toast.error("Please select a covering user");
      return;
    }

    // Step 1: Check for warnings unless forcing
    if (!forceSubmit) {
      const checkDto = {
        coveringUserId,
        shiftDate: shift.date,
        startTime: shift.startTime,
        endTime: shift.endTime,
      };

      const warningList = await handleCreate<typeof checkDto, string[]>(
        "/api/cover-requests/check",
        checkDto,
        "Cover eligibility"
      );

      if (warningList && warningList.length > 0) {
        setWarnings((prev) => ({
          ...prev,
          [shift.id]: warningList,
        }));
        return; // stop here until user explicitly forces
      }
    }

    // Step 2: Submit actual request
    const payload = {
      originalUserId: user?.id,
      coveringUserId,
      shiftDate: shift.date,
      startTime: shift.startTime,
      endTime: shift.endTime,
      status: "PENDING",
      warnings: "",
    };

    await handleCreate<typeof payload>(
      "/api/cover-requests",
      payload,
      "Cover request",
      () => {
        toast.success("Cover request submitted");
        setOpenRow(null);
        setWarnings((prev) => {
          const updated = { ...prev };
          delete updated[shift.id];
          return updated;
        });
      }
    );
  };

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
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {shifts.map((shift) => (
            <React.Fragment key={shift.id}>
              <TableRow>
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
                <TableCell>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      setOpenRow(openRow === shift.id ? null : shift.id)
                    }
                  >
                    Request Cover
                  </Button>
                </TableCell>
              </TableRow>

              {openRow === shift.id && (
                <TableRow>
                  <TableCell colSpan={6}>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-4">
                        <Select
                          onValueChange={(val) =>
                            setSelectedUsers((prev) => ({
                              ...prev,
                              [shift.id]: parseInt(val),
                            }))
                          }
                        >
                          <SelectTrigger className="w-64">
                            <SelectValue placeholder="Select covering user" />
                          </SelectTrigger>
                          <SelectContent>
                            {coveringUsers.map((user) => (
                              <SelectItem
                                key={user.id}
                                value={user.id.toString()}
                              >
                                {user.firstName} {user.lastName}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <Button
                          size="sm"
                          onClick={() => handleSubmitRequest(shift)}
                        >
                          Submit Request
                        </Button>
                      </div>

                      {warnings[shift.id]?.length > 0 && (
                        <div className="mt-2 space-y-1">
                          <ul className="text-yellow-700 text-sm list-disc list-inside">
                            {warnings[shift.id].map((warn, i) => (
                              <li key={i}>⚠️ {warn}</li>
                            ))}
                          </ul>
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => handleSubmitRequest(shift, true)}
                          >
                            Submit Anyway
                          </Button>
                        </div>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
