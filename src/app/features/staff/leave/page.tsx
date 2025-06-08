"use client";

import { useCallback, useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";

import { useRequireRoles } from "@/app/lib/useRequireRoles";
import { uiTheme } from "@/app/lib/uiConfig";
import { handleFetchPaged } from "@/app/lib/crudService";

import PageContainer from "@/app/components/layout/PageContainer";
import PageHeader from "@/app/components/ui/PageHeader";
import FilterBar from "./FilterBar";
import LeaveTable from "../../common/leave/LeaveTable";
import { LeaveRequestResponse } from "../../common/leave/LeaveTypes";

interface PaginatedResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

export default function LeaveRequestsPage() {
  useRequireRoles(["Admin", "Manager", "Supervisor"]);

  const methods = useForm({
    defaultValues: {
      userId: "",
      status: "",
    },
  });

  const { watch } = methods;
  const filters = watch();

  const [leaves, setLeaves] = useState<LeaveRequestResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [debouncedUserId, setDebouncedUserId] = useState(filters.userId);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedUserId(filters.userId);
    }, 1000); // 500ms delay

    return () => clearTimeout(handler); // Cancel on change
  }, [filters.userId]);
  const fetchLeaves = useCallback(async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams();
      if (debouncedUserId && !isNaN(Number(debouncedUserId))) {
        query.append("userId", debouncedUserId);
      }

      if (filters.status && filters.status !== "ALL") {
        query.append("status", filters.status);
      }

      query.append("page", page.toString());
      query.append("size", "10");

      const res = await handleFetchPaged<
        PaginatedResponse<LeaveRequestResponse>
      >(`/api/leaves?${query.toString()}`, "Leave Requests");

      if (res) {
        setLeaves(res.content);
        setTotalPages(res.totalPages);
      }
    } finally {
      setLoading(false);
    }
  }, [debouncedUserId, filters.status, page]);

  useEffect(() => {
    setPage(0); // Reset to first page when filters change
  }, [filters.userId, filters.status]);

  useEffect(() => {
    fetchLeaves();
  }, [fetchLeaves]);

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
          <LeaveTable
            data={leaves}
            loading={loading}
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
            clickable={false}
          />
        </div>
      </FormProvider>
    </PageContainer>
  );
}
