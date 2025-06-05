"use client";

import { useForm, FormProvider } from "react-hook-form";

import { useRequireRoles } from "@/app/lib/useRequireRoles";
import { uiTheme } from "@/app/lib/uiConfig";

import PageContainer from "@/app/components/layout/PageContainer";
import PageHeader from "@/app/components/ui/PageHeader";

import FilterBar from "./FilterBar";
import LeaveTable from "../../common/leave/LeaveTable";

export default function LeaveRequestsPage() {
  useRequireRoles(["Admin"]);

  const methods = useForm({
    defaultValues: {
      userId: "",
      status: "",
    },
  });

  const { watch } = methods;
  const filters = watch();

  return (
    <PageContainer>
      <PageHeader title="Leave Requests" />

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
    </PageContainer>
  );
}
