"use client";

import { useCallback, useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";

import PageContainer from "@/app/components/layout/PageContainer";
import PageHeader from "@/app/components/ui/PageHeader";
import PageLoader from "@/app/components/ui/PageLoader";
import { useRequireRoles } from "@/app/lib/useRequireRoles";
import { uiTheme } from "@/app/lib/uiConfig";
import { handleFetchPaged } from "@/app/lib/crudService";

import StaffAvailabilityTable from "../../common/staff-availability/StaffAvailabilityTable";
import StaffAvailabilityFilterBar from "./StaffAvailabilityFilterBar";
import { StaffAvailabilityResponse } from "../../common/staff-availability/StaffAvailabilityTypes";

interface PaginatedResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

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
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchData = useCallback(async () => {
    setLoading(true);

    const query = new URLSearchParams();
    if (filters.userId) query.append("userId", filters.userId);
    if (filters.date) query.append("date", filters.date);
    query.append("page", page.toString());
    query.append("size", "10");

    const result = await handleFetchPaged<
      PaginatedResponse<StaffAvailabilityResponse>
    >(`/api/staff-availability?${query.toString()}`, "Staff Availability");

    if (result) {
      setData(result.content);
      setTotalPages(result.totalPages);
    }

    setLoading(false);
  }, [filters.userId, filters.date, page]);

  useEffect(() => {
    setPage(0); // reset page on filter change
  }, [filters.userId, filters.date]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
          <StaffAvailabilityTable
            data={data}
            loading={loading}
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
            clickableRows={false}
          />
        </div>
      </FormProvider>
    </PageContainer>
  );
}
