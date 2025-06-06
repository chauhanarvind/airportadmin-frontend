import { useForm, FormProvider } from "react-hook-form";
import StaffingRequestFilterBar from "./StaffingRequestFilterBar"; // import the filter bar
import { useRequireRoles } from "@/app/lib/useRequireRoles";
import { useCallback, useEffect, useState } from "react";
import { StaffingRequestResponse } from "../../common/staffing-requests/StaffingRequestTypes";
import { handleFetchPaged } from "@/app/lib/crudService";
import PaginatedResponse from "../../common/interface";
import PageContainer from "@/app/components/layout/PageContainer";
import PageHeader from "@/app/components/layout/PageHeader";
import { uiTheme } from "@/app/lib/uiConfig";
import StaffingRequestTable from "../../common/staffing-requests/StaffingRequestTable";

export default function StaffingRequestsPage() {
  useRequireRoles(["Admin"]);

  const methods = useForm({
    defaultValues: {
      managerId: "",
      locationId: "",
      status: "",
    },
  });
  const { watch } = methods;
  const filters = watch();

  const [requests, setRequests] = useState<StaffingRequestResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const query = new URLSearchParams();
    if (filters.managerId) query.append("managerId", filters.managerId);
    if (filters.locationId) query.append("locationId", filters.locationId);
    if (filters.status && filters.status !== "ALL")
      query.append("status", filters.status);
    query.append("page", page.toString());
    query.append("size", "10");

    const result = await handleFetchPaged<
      PaginatedResponse<StaffingRequestResponse>
    >(`/api/staffing-requests/?${query.toString()}`, "Staffing Requests");

    if (result) {
      setRequests(result.content);
      setTotalPages(result.totalPages);
    }
    setLoading(false);
  }, [filters.managerId, filters.locationId, filters.status, page]);

  useEffect(() => {
    setPage(0); // Reset to first page on filter change
  }, [filters.managerId, filters.locationId, filters.status]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <PageContainer>
      <PageHeader title="All Staffing Requests" />
      <FormProvider {...methods}>
        <div
          className={`${uiTheme.colors.card} ${uiTheme.spacing.cardPadding} mb-6`}
        >
          <StaffingRequestFilterBar />
        </div>
        <div
          className={`${uiTheme.colors.card} ${uiTheme.spacing.cardPadding}`}
        >
          <StaffingRequestTable
            data={requests}
            loading={loading}
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
            basePath="staffing-requests"
          />
        </div>
      </FormProvider>
    </PageContainer>
  );
}
