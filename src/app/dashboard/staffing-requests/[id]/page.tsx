"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import PageContainer from "@/app/components/layout/PageContainer";
import PageHeader from "@/app/components/ui/PageHeader";
import PageLoader from "@/app/components/ui/PageLoader";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import {
  RosterStatus,
  StaffingRequestDetail,
  StaffingRequestUpdate,
} from "../../common/staffing-requests/StaffingRequestTypes";

import RosterStatusBadge from "../../common/staffing-requests/RosterStatusBadge";
import StaffingRequestTableView from "../../common/staffing-requests/StaffingRequestTableView";

import {
  handleCreate,
  handleGetById,
  handleUpdate,
} from "@/app/lib/crudService";
import { uiTheme } from "@/app/lib/uiConfig";

export default function AdminStaffingRequestDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const requestId = id as string;

  const [request, setRequest] = useState<StaffingRequestDetail | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<RosterStatus>("PENDING");
  const [rosterExists, setRosterExists] = useState(false);

  // Initial fetch
  useEffect(() => {
    const load = async () => {
      const req = await handleGetById<StaffingRequestDetail>(
        `/api/staffing-requests/${requestId}`,
        "Staffing request"
      );
      if (req) {
        setRequest(req);
        setSelectedStatus(req.status);
      }

      const exists = await handleGetById<boolean>(
        `/api/roster/check/${requestId}`,
        "Roster check"
      );
      setRosterExists(!!exists);
    };

    load();
  }, [requestId]);

  const handleStatusUpdate = async () => {
    const payload: StaffingRequestUpdate = { status: selectedStatus };

    await handleUpdate(
      `/api/staffing-requests/${requestId}/status`,
      "PUT",
      payload,
      "Staffing request",
      async () => {
        toast.success("Status updated");

        // ✅ Fetch fresh request from backend
        const req = await handleGetById<StaffingRequestDetail>(
          `/api/staffing-requests/${requestId}`,
          "Staffing request"
        );

        if (req) {
          setRequest(req);
          setSelectedStatus(req.status);
        }

        if (selectedStatus === "APPROVED") {
          const exists = await handleGetById<boolean>(
            `/api/roster/check/${requestId}`,
            "Roster check"
          );
          setRosterExists(!!exists);
        }
      }
    );
  };

  const handleGenerateRoster = async () => {
    try {
      await handleCreate(`/api/roster/generate/${requestId}`, {}, "Roster");
      toast.success("Roster generated successfully");

      const exists = await handleGetById<boolean>(
        `/api/roster/check/${requestId}`,
        "Roster check"
      );
      setRosterExists(!!exists);

      // router.refresh();
    } catch (err) {
      console.error(err);
    }
  };

  if (!request) return <PageLoader />;

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
              <Link href={`/dashboard/staffing-requests/${requestId}/roster`}>
                <Button variant="outline">View Roster</Button>
              </Link>
            )}
            <Link href="/dashboard/staffing-requests">
              <Button size="sm" className={uiTheme.buttons.back}>
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back
              </Button>
            </Link>
          </div>
        }
      />

      {/* Request Info Card */}
      <div
        className={`${uiTheme.colors.card} ${uiTheme.spacing.cardPadding} mt-4 space-y-4`}
      >
        <div className={uiTheme.layout.formGrid}>
          <p>
            <strong>Manager:</strong> {request.managerFirstName}{" "}
            {request.managerLastName}
          </p>
          <p>
            <strong>Location:</strong> {request.locationName}
          </p>
          <p>
            <strong>Type:</strong> {request.requestType}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <RosterStatusBadge status={request.status} />
          </p>
          <p>
            <strong>Created:</strong>{" "}
            {new Date(request.createdAt).toLocaleString()}
          </p>
        </div>
        {request.reason && (
          <div>
            <p className={uiTheme.text.label}>Reason</p>
            <p>{request.reason}</p>
          </div>
        )}
      </div>

      {/* Status Update Card */}
      <div
        className={`${uiTheme.colors.card} ${uiTheme.spacing.cardPadding} mt-4 space-y-4`}
      >
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div className="sm:w-64 space-y-1.5">
            <label htmlFor="status" className={uiTheme.text.label}>
              Status
            </label>
            <Select
              value={selectedStatus}
              onValueChange={(val) => setSelectedStatus(val as RosterStatus)}
            >
              <SelectTrigger className="w-full bg-white border border-gray-300 rounded-md px-3 py-2">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 shadow-md rounded-md z-50">
                {["PENDING", "APPROVED", "REJECTED"].map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={handleStatusUpdate}
            disabled={selectedStatus === request.status}
            className={uiTheme.buttons.action}
          >
            Update Status
          </Button>
        </div>
      </div>

      {/* Staffing Request Table */}
      <div className="mt-6">
        <StaffingRequestTableView days={request.days} />
      </div>
    </PageContainer>
  );
}
