// common/staffing-requests/StaffingRequestDetailsCard.tsx

import { StaffingRequestDetail } from "./StaffingRequestTypes";
import RosterStatusBadge from "./RosterStatusBadge";
import { uiTheme } from "@/app/lib/uiConfig";

interface Props {
  request: StaffingRequestDetail;
}

export default function StaffingRequestDetailsCard({ request }: Props) {
  return (
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
          <strong>Status:</strong> <RosterStatusBadge status={request.status} />
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
  );
}
