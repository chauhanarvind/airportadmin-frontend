"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { handleGetById, handleUpdate } from "@/app/lib/crudService";

import { uiTheme } from "@/app/lib/uiConfig";
import StaffingRequestForm from "../StaffingRequestForm";
import { toast } from "sonner";
import {
  RosterStatus,
  StaffingRequestDetail,
  StaffingRequestUpdate,
} from "../../common/staffing-requests/StaffingRequestTypes";
import RosterStatusBadge from "../../common/staffing-requests/RosterStatusBadge";

export default function AdminStaffingRequestDetailPage() {
  const { id } = useParams();
  const [request, setRequest] = useState<StaffingRequestDetail | null>(null);

  useEffect(() => {
    const fetch = async () => {
      const data = await handleGetById<StaffingRequestDetail>(
        `/api/staffing-requests/${id}`,
        "Staffing request"
      );
      if (data) setRequest(data);
    };
    fetch();
  }, [id]);

  const handleStatusUpdate = async (status: RosterStatus) => {
    if (!id) return;

    const payload: StaffingRequestUpdate = { status };
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

  if (!request) return <p className="p-4">Loading...</p>;

  return (
    <div className={uiTheme.layout.container}>
      <h1 className={uiTheme.text.heading}>Staffing Request Detail</h1>

      <div
        className={`${uiTheme.colors.card} ${uiTheme.spacing.cardPadding} mt-4`}
      >
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
          <strong>Reason:</strong> {request.reason || "-"}
        </p>
        <p>
          <strong>Status:</strong> <RosterStatusBadge status={request.status} />
        </p>
        <p>
          <strong>Created:</strong>{" "}
          {new Date(request.createdAt).toLocaleString()}
        </p>
      </div>

      <div className="mt-6">
        <StaffingRequestForm
          request={request}
          onStatusUpdate={handleStatusUpdate}
        />
      </div>
    </div>
  );
}
