"use client";

import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";

import PageContainer from "@/app/components/layout/PageContainer";
import PageHeader from "@/app/components/ui/PageHeader";
import PageLoader from "@/app/components/ui/PageLoader";
import { handleFetchList } from "@/app/lib/crudService";
import { ShiftCoverResponseDto } from "@/app/features/common/shift-cover/ShiftCoverTypes";
import ShiftCoverTable from "./ShiftCoverTable";
import { useRequireRoles } from "@/app/lib/useRequireRoles";
import ShiftCoverFilterBar from "./ShiftCoverFilterBar";
import { uiTheme } from "@/app/lib/uiConfig";

export default function ShiftCoverAdminPage() {
  useRequireRoles(["Admin"]);

  const [requests, setRequests] = useState<ShiftCoverResponseDto[]>([]);
  const [loading, setLoading] = useState(true);

  const methods = useForm({
    defaultValues: {
      originalUserId: "",
      coveringUserId: "",
      status: "",
    },
  });

  const { watch } = methods;
  const filters = watch();

  useEffect(() => {
    const fetchRequests = async () => {
      const query = new URLSearchParams();

      if (filters.originalUserId)
        query.append("originalUserId", filters.originalUserId);
      if (filters.coveringUserId)
        query.append("coveringUserId", filters.coveringUserId);
      if (filters.status && filters.status !== "ALL")
        query.append("status", filters.status);

      const url = `/api/shift-cover?${query.toString()}`;

      const res = await handleFetchList<ShiftCoverResponseDto[]>(
        url,
        "Shift Cover Requests"
      );
      if (res) setRequests(res);
      setLoading(false);
    };

    fetchRequests();
  }, [filters]);

  if (loading) return <PageLoader />;

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
          {requests.length === 0 ? (
            <p className="text-muted-foreground">
              No shift cover requests match the filters.
            </p>
          ) : (
            <ShiftCoverTable requests={requests} />
          )}
        </div>
      </FormProvider>
    </PageContainer>
  );
}
