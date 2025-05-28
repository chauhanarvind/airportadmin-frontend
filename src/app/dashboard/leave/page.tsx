"use client";

import { useForm, FormProvider } from "react-hook-form";
import { useRequireRoles } from "@/app/lib/useRequireRoles";
import { uiTheme } from "@/app/lib/uiConfig";
import FilterBar from "./FilterBar";
import LeaveTable from "./LeaveTable";

export default function LeaveRequestsPage() {
  useRequireRoles(["Admin", "Supervisor", "Manager"]);

  const methods = useForm({
    defaultValues: {
      userId: "",
      status: "",
    },
  });

  const { watch } = methods;
  const filters = watch();

  return (
    <div className={uiTheme.layout.container}>
      <div className="flex justify-between items-center">
        <h1 className={uiTheme.text.heading}>Leave Requests</h1>
      </div>

      <FormProvider {...methods}>
        <div
          className={`${uiTheme.colors.card} ${uiTheme.spacing.cardPadding} mb-6`}
        >
          <FilterBar />
        </div>

        <div
          className={`${uiTheme.colors.card} ${uiTheme.spacing.cardPadding}`}
        >
          <LeaveTable filters={filters} />
        </div>
      </FormProvider>
    </div>
  );
}
