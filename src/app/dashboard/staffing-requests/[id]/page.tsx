"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { handleGetById, handleUpdate } from "@/app/lib/crudService";
import { uiTheme } from "@/app/lib/uiConfig";
import PageContainer from "@/app/components/layout/PageContainer";
import PageHeader from "@/app/components/ui/PageHeader";
import PageLoader from "@/app/components/ui/PageLoader";
import { Button } from "@/components/ui/button";

import {
  RosterStatus,
  StaffingRequestDetail,
  StaffingRequestUpdate,
} from "../../common/staffing-requests/StaffingRequestTypes";
import RosterStatusBadge from "../../common/staffing-requests/RosterStatusBadge";
import StaffingRosterTable from "../../common/staffing-requests/StaffingRosterTable";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AdminStaffingRequestDetailPage() {
  const { id } = useParams();
  const [request, setRequest] = useState<StaffingRequestDetail | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<RosterStatus>("PENDING");

  useEffect(() => {
    const fetch = async () => {
      const data = await handleGetById<StaffingRequestDetail>(
        `/api/staffing-requests/${id}`,
        "Staffing request"
      );
      if (data) {
        setRequest(data);
        setSelectedStatus(data.status);
      }
    };
    fetch();
  }, [id]);

  const handleStatusUpdate = async () => {
    if (!id || !selectedStatus) return;

    const payload: StaffingRequestUpdate = { status: selectedStatus };
    console.log(payload);
    await handleUpdate<StaffingRequestDetail, StaffingRequestUpdate>(
      `/api/staffing-requests/${id}/status`,
      "PUT",
      payload,
      "Staffing request",
      (updated) => {
        toast.success("Status updated");
        setRequest((prev) => prev && { ...prev, status: updated.status });
      }
    );
  };

  if (!request) return <PageLoader />;

  return (
    <PageContainer>
      <PageHeader
        title="Staffing Request Detail"
        actions={
          <Link href="/dashboard/staffing-requests">
            <Button size="sm" className={uiTheme.buttons.back}>
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
          </Link>
        }
      />

      {/* Metadata */}
      <div
        className={`${uiTheme.colors.card} ${uiTheme.spacing.cardPadding} space-y-4 mt-4`}
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

      <div
        className={`${uiTheme.colors.card} ${uiTheme.spacing.cardPadding} space-y-4 mt-4`}
      >
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div className="sm:w-64 space-y-1.5">
            <label className={uiTheme.text.label} htmlFor="status">
              Status
            </label>
            <div className="space-y-1 max-w-xs w-full">
              <label htmlFor="status" className={uiTheme.text.label}>
                Status
              </label>
              <Select
                value={selectedStatus}
                onValueChange={(val) => setSelectedStatus(val as RosterStatus)}
              >
                <SelectTrigger
                  id="status"
                  className="w-full bg-white border border-gray-300 rounded-md px-3 py-2"
                >
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent
                  className="bg-white border border-gray-200 shadow-md rounded-md z-50"
                  style={{ backgroundColor: "white" }}
                >
                  {["PENDING", "APPROVED", "REJECTED"].map((status) => (
                    <SelectItem
                      key={status}
                      value={status}
                      className="!bg-white !text-black hover:bg-blue-50"
                    >
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            onClick={handleStatusUpdate}
            disabled={!selectedStatus || selectedStatus === request.status}
            className={uiTheme.buttons.action}
          >
            Update Status
          </Button>
        </div>
      </div>

      {/* Roster Table */}
      <div className="mt-6">
        <StaffingRosterTable days={request.days} />
      </div>
    </PageContainer>
  );
}
