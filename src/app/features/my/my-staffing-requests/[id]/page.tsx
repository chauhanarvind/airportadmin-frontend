"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import PageContainer from "@/app/components/layout/PageContainer";
import PageHeader from "@/app/components/ui/PageHeader";
import PageLoader from "@/app/components/ui/PageLoader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { handleGetById } from "@/app/lib/crudService";
import { uiTheme } from "@/app/lib/uiConfig";
import { StaffingRequestDetail } from "../../../common/staffing-requests/StaffingRequestTypes";
import RosterStatusBadge from "../../../common/staffing-requests/RosterStatusBadge";
import StaffingRequestTableView from "../../../common/staffing-requests/StaffingRequestTableView";
import { useRequireRoles } from "@/app/lib/useRequireRoles";

export default function MyStaffingRequestDetailPage() {
  useRequireRoles(["Admin", "Manager", "Supervisor", "Crew"]);
  const { id } = useParams();
  const [request, setRequest] = useState<StaffingRequestDetail | null>(null);
  const [rosterExists, setRosterExists] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await handleGetById<StaffingRequestDetail>(
        `/api/staffing-requests/${id}`,
        "Staffing request"
      );
      if (data) {
        setRequest(data);

        if (data.status !== "PENDING") {
          const exists = await handleGetById<boolean>(
            `/api/roster/check/${id}`,
            "Roster check"
          );
          setRosterExists(!!exists);
        }
      }
    };
    fetchData();
  }, [id]);

  if (!request) return <PageLoader />;

  return (
    <PageContainer>
      <PageHeader
        title="Staffing Request Detail"
        actions={
          <div className="flex gap-2">
            {rosterExists && (
              <Link href={`/features/staff/roster/${id}`}>
                <Button className={uiTheme.colors.primary} variant="outline">
                  View Roster
                </Button>
              </Link>
            )}
            <Link href="/features/my/my-staffing-requests">
              <Button size="sm" className={uiTheme.buttons.back}>
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back
              </Button>
            </Link>
          </div>
        }
      />

      {/* Request Info */}
      <div
        className={`${uiTheme.colors.card} ${uiTheme.spacing.cardPadding} mt-4 space-y-4`}
      >
        <div className={uiTheme.layout.formGrid}>
          <div className="space-y-2">
            <Label>Location</Label>
            <Input value={request.locationName} disabled />
          </div>

          <div className="space-y-2">
            <Label>Request Type</Label>
            <Input value={request.requestType} disabled />
          </div>

          <div className="space-y-2">
            <Label>Status</Label>
            <div className="pt-2">
              <RosterStatusBadge status={request.status} />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Submitted</Label>
            <Input
              value={new Date(request.createdAt).toLocaleString()}
              disabled
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Reason</Label>
          <Input value={request.reason || "-"} disabled />
        </div>
      </div>

      {/* Roster Table */}
      <div className="mt-6">
        <StaffingRequestTableView days={request.days} />
      </div>
    </PageContainer>
  );
}
