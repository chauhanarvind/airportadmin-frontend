"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import PageContainer from "@/app/components/layout/PageContainer";
import PageHeader from "@/app/components/ui/PageHeader";
import PageLoader from "@/app/components/ui/PageLoader";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import AdminStatusUpdateForm from "./AdminStatusUpdateForm";

import { handleGetById, handleCreate } from "@/app/lib/crudService";
import { uiTheme } from "@/app/lib/uiConfig";
import { StaffingRequestDetail } from "@/app/features/common/staffing-requests/StaffingRequestTypes";
import StaffingRequestDetailsCard from "@/app/features/common/staffing-requests/StaffingRequestDetailsCard";
import StaffingRequestTableView from "@/app/features/common/staffing-requests/StaffingRequestTableView";
import { useRequireRoles } from "@/app/lib/useRequireRoles";

export default function AdminStaffingRequestPage() {
  useRequireRoles(["Admin"]);
  const { id } = useParams();
  const requestId = id as string;

  const [request, setRequest] = useState<StaffingRequestDetail | null>(null);
  const [rosterExists, setRosterExists] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchRequest = useCallback(async () => {
    const req = await handleGetById<StaffingRequestDetail>(
      `/api/staffing-requests/${requestId}`,
      "Staffing request"
    );
    if (req) setRequest(req);

    const exists = await handleGetById<boolean>(
      `/api/roster/check/${requestId}`,
      "Roster check"
    );
    setRosterExists(!!exists);
    setLoading(false);
  }, [requestId]);

  useEffect(() => {
    fetchRequest();
  }, [fetchRequest]);

  const handleGenerateRoster = async () => {
    try {
      const exists = await handleGetById<boolean>(
        `/api/roster/check/${requestId}`,
        "Roster check"
      );

      if (exists) {
        toast.info("Roster already exists.");
        setRosterExists(true);
        return;
      }

      await handleCreate(`/api/roster/generate/${requestId}`, {}, "Roster");
      toast.success("Roster generated successfully");

      setRosterExists(true);
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate roster");
    }
  };

  if (loading || !request) return <PageLoader />;

  return (
    <PageContainer>
      <PageHeader
        title="Staffing Request Detail"
        actions={
          <div className="flex gap-2">
            {!rosterExists && request.status === "APPROVED" && (
              <Button
                onClick={handleGenerateRoster}
                className={uiTheme.colors.primary}
              >
                Generate Roster
              </Button>
            )}
            {rosterExists && (
              <Link href={`/features/staff/roster/${requestId}`}>
                <Button className={uiTheme.colors.primary} variant="outline">
                  View Roster
                </Button>
              </Link>
            )}
            <Link href="/features/admin/staffing-requests">
              <Button size="sm" className={uiTheme.buttons.back}>
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back
              </Button>
            </Link>
          </div>
        }
      />

      {/* Read-only request details */}
      <StaffingRequestDetailsCard request={request} />

      {/* Admin-only status form */}
      <AdminStatusUpdateForm onStatusUpdated={fetchRequest} />

      {/* Shift table */}
      <div className="mt-6">
        <StaffingRequestTableView days={request.days} />
      </div>
    </PageContainer>
  );
}
