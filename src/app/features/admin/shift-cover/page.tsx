"use client";

import { useCallback, useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";

import PageContainer from "@/app/components/layout/PageContainer";
import PageHeader from "@/app/components/ui/PageHeader";
import { useRequireRoles } from "@/app/lib/useRequireRoles";
import { uiTheme } from "@/app/lib/uiConfig";
import { handleFetchPaged } from "@/app/lib/crudService";

import { ShiftCoverResponseDto } from "@/app/features/common/shift-cover/ShiftCoverTypes";
import ShiftCoverFilterBar from "./ShiftCoverFilterBar";
import ShiftCoverTable from "./ShiftCoverTable";

interface PaginatedResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

export default function ShiftCoverAdminPage() {
  useRequireRoles(["Admin"]);

  const methods = useForm({
    defaultValues: {
      originalUserId: "",
      coveringUserId: "",
      status: "",
    },
  });

  const { watch } = methods;
  const filters = watch();

  const [data, setData] = useState<ShiftCoverResponseDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchData = useCallback(async () => {
    setLoading(true);

    const query = new URLSearchParams();

    if (filters.originalUserId)
      query.append("originalUserId", filters.originalUserId);
    if (filters.coveringUserId)
      query.append("coveringUserId", filters.coveringUserId);
    if (filters.status && filters.status !== "ALL")
      query.append("status", filters.status);

    query.append("page", page.toString());
    query.append("size", "10");

    const res = await handleFetchPaged<
      PaginatedResponse<ShiftCoverResponseDto>
    >(`/cover-requests?${query.toString()}`, "Shift Cover Requests");

    if (res) {
      setData(res.content);
      setTotalPages(res.totalPages);
    }

    setLoading(false);
  }, [filters.originalUserId, filters.coveringUserId, filters.status, page]);

  useEffect(() => {
    setPage(0); // Reset to page 0 when filters change
  }, [filters.originalUserId, filters.coveringUserId, filters.status]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <PageContainer>
      <PageHeader title="All Shift Cover Requests" />

      <FormProvider {...methods}>
        <div
          className={`${uiTheme.colors.card} ${uiTheme.spacing.cardPadding} mb-6`}
        >
          <ShiftCoverFilterBar />
        </div>

        <div
          className={`${uiTheme.colors.card} ${uiTheme.spacing.cardPadding}`}
        >
          <ShiftCoverTable
            data={data}
            loading={loading}
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      </FormProvider>
    </PageContainer>
  );
}
