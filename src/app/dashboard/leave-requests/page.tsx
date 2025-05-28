"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, FormProvider, useWatch } from "react-hook-form";
import { useRequireRoles } from "@/app/lib/useRequireRoles";
import { uiTheme } from "@/app/lib/uiConfig";
import {
  LeaveRequestResponse,
  LeaveStatus,
} from "@/app/dashboard/common/leave/LeaveTypes";
import { handleFetchAll } from "@/app/lib/crudService";
import LeaveTable from "./LeaveTable";
import RoleSelector from "@/app/components/RoleSelector";

type FilterFormValues = {
  userId: string;
  status: LeaveStatus | "";
};

export default function LeaveRequestsPage() {
  useRequireRoles(["Admin", "Supervisor", "Manager"]);

  const methods = useForm<FilterFormValues>({
    defaultValues: {
      userId: "",
      status: "",
    },
  });

  const { control } = methods;
  const userId = useWatch({ control, name: "userId" });
  const status = useWatch({ control, name: "status" });

  const [leaveData, setLeaveData] = useState<LeaveRequestResponse[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      let url = `/api/leaves/?`;
      if (userId.trim()) url += `userId=${userId}&`;
      if (status) url += `status=${status}&`;

      const res = await handleFetchAll<{ content: LeaveRequestResponse[] }>(
        url,
        "Leave Requests"
      );
      if (res?.content) setLeaveData(res.content);
    };

    fetchData();
  }, [userId, status]);

  return (
    <div className={uiTheme.layout.container}>
      {/* Page Heading */}
      <div className="flex justify-between items-center">
        <h1 className={uiTheme.text.heading}>Leave Requests</h1>
      </div>

      {/* Filters */}
      <div
        className={`${uiTheme.colors.card} ${uiTheme.spacing.cardPadding} space-y-4 mt-6`}
      >
        <FormProvider {...methods}>
          <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="userId" className={uiTheme.text.label}>
                Filter by User ID
              </Label>
              <Input
                id="userId"
                placeholder="Enter user ID"
                {...methods.register("userId")}
              />
            </div>

            <RoleSelector
              label="Status"
              name="status"
              required={false}
              staticOptions={["PENDING", "APPROVED", "REJECTED", "CANCELLED"]}
            />
          </form>
        </FormProvider>
      </div>

      {/* Table */}
      <div
        className={`${uiTheme.colors.card} ${uiTheme.spacing.cardPadding} mt-6`}
      >
        <LeaveTable data={leaveData} />
      </div>
    </div>
  );
}
