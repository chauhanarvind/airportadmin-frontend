"use client";

import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";

import PageContainer from "@/app/components/layout/PageContainer";
import PageHeader from "@/app/components/ui/PageHeader";
import PageLoader from "@/app/components/ui/PageLoader";
import { useRequireRoles } from "@/app/lib/useRequireRoles";
import { uiTheme } from "@/app/lib/uiConfig";
import { handleFetchList } from "@/app/lib/crudService";
import StaffAvailabilityTable from "../../common/staff-availability/StaffAvailabilityTable";
import StaffAvailabilityFilterBar from "./StaffAvailabilityFilterBar";
import { StaffAvailabilityResponse } from "../../common/staff-availability/StaffAvailabilityTypes";

export default function StaffAvailabilityPage() {
  useRequireRoles(["Admin", "Manager", "Supervisor"]);

  const methods = useForm({
    defaultValues: {
      userId: "",
      date: "",
    },
  });

  const { watch } = methods;
  const filters = watch();

  const [data, setData] = useState<StaffAvailabilityResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const query = new URLSearchParams();

      if (filters.userId) query.append("userId", filters.userId);
      if (filters.date) query.append("date", filters.date);

      const url = `/api/staff-availability?${query.toString()}`;
      const res = await handleFetchList<StaffAvailabilityResponse[]>(
        url,
        "Staff Availability"
      );

      if (res) setData(res);
      setLoading(false);
    };

    fetchData();
  }, [filters]);

  if (loading) return <PageLoader />;

  return (
    <PageContainer>
      <PageHeader title="Staff Availability" />
      <FormProvider {...methods}>
        <div
          className={`${uiTheme.colors.card} ${uiTheme.spacing.cardPadding} mb-6`}
        >
          <StaffAvailabilityFilterBar />
        </div>
        <div
          className={`${uiTheme.colors.card} ${uiTheme.spacing.cardPadding}`}
        >
          {data.length === 0 ? (
            <p className="text-muted-foreground">
              No records found for the selected filters.
            </p>
          ) : (
            <StaffAvailabilityTable data={data} clickableRows={false} />
          )}
        </div>
      </FormProvider>
    </PageContainer>
  );
}
