"use client";

import { useForm, FormProvider } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { uiTheme } from "@/app/lib/uiConfig";
import RoleSelector from "@/app/components/RoleSelector";
import {
  LeaveRequestResponse,
  LeaveStatus,
} from "@/app/dashboard/common/leave/LeaveTypes";

interface Props {
  initialData: LeaveRequestResponse;
  onSubmit: (data: { status: LeaveStatus }) => void;
}

export default function LeaveForm({ initialData, onSubmit }: Props) {
  const methods = useForm<{ status: LeaveStatus }>({
    defaultValues: { status: initialData.status },
  });

  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Read-only Info */}
        <div className={uiTheme.layout.formGrid}>
          <div className="space-y-2">
            <Label className={uiTheme.text.label}>User</Label>
            <div className="p-2 bg-gray-100 rounded">
              {initialData.userName ?? `User ${initialData.userId}`}
            </div>
          </div>

          <div className="space-y-2">
            <Label className={uiTheme.text.label}>Start Date</Label>
            <div className="p-2 bg-gray-100 rounded">
              {initialData.startDate}
            </div>
          </div>

          <div className="space-y-2">
            <Label className={uiTheme.text.label}>End Date</Label>
            <div className="p-2 bg-gray-100 rounded">{initialData.endDate}</div>
          </div>

          <div className="space-y-2">
            <Label className={uiTheme.text.label}>Reason</Label>
            <div className="p-2 bg-gray-100 rounded">{initialData.reason}</div>
          </div>
        </div>

        {/* Status Dropdown */}
        <div className="space-y-2">
          <RoleSelector
            label="Update Status"
            name="status"
            required={true}
            staticOptions={["PENDING", "APPROVED", "REJECTED", "CANCELLED"]}
          />
        </div>

        {/* Submit Button */}
        <div>
          <Button type="submit" className="w-full">
            Update Status
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
