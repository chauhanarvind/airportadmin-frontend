"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { handleGetById } from "@/app/lib/crudService";
import { uiTheme } from "@/app/lib/uiConfig";
import { StaffingRequestDetail } from "../../common/staffing-requests/StaffingRequestTypes";
import RosterStatusBadge from "../../common/staffing-requests/RosterStatusBadge";

export default function MyStaffingRequestDetailPage() {
  const { id } = useParams();
  const [request, setRequest] = useState<StaffingRequestDetail | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await handleGetById<StaffingRequestDetail>(
        `/api/staffing-requests/${id}`,
        "Staffing request"
      );
      if (data) setRequest(data);
    };
    fetchData();
  }, [id]);

  if (!request) {
    return <p className="p-4">Loading...</p>;
  }

  return (
    <div className={uiTheme.layout.container}>
      <h1 className={uiTheme.text.heading}>Staffing Request Detail</h1>

      <div
        className={`${uiTheme.colors.card} ${uiTheme.spacing.cardPadding} mt-4 space-y-4`}
      >
        <p>
          <strong>Location:</strong> {request.locationName}
        </p>
        <p>
          <strong>Request Type:</strong> {request.requestType}
        </p>
        <p>
          <strong>Reason:</strong> {request.reason || "-"}
        </p>
        <p>
          <strong>Status:</strong> <RosterStatusBadge status={request.status} />
        </p>
        <p>
          <strong>Submitted:</strong>{" "}
          {new Date(request.createdAt).toLocaleString()}
        </p>
      </div>

      <div className="mt-6 space-y-6">
        {request.days.map((day) => (
          <div
            key={day.id}
            className={`${uiTheme.colors.card} ${uiTheme.spacing.cardPadding}`}
          >
            <h3 className="font-medium text-lg mb-2">
              {new Date(day.date).toLocaleDateString(undefined, {
                weekday: "long",
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </h3>

            {day.items.length === 0 ? (
              <p className="text-muted-foreground">
                No roles requested for this day.
              </p>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left">
                    <th>Job Role</th>
                    <th>Job Level</th>
                    <th>Required Count</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                  </tr>
                </thead>
                <tbody>
                  {day.items.map((item) => (
                    <tr key={item.id}>
                      <td>{item.jobRoleName}</td>
                      <td>{item.jobLevelName}</td>
                      <td>{item.requiredCount}</td>
                      <td>{item.startTime}</td>
                      <td>{item.endTime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
