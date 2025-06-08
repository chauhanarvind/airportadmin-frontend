// common/staffing-requests/StaffingRequestDetailsCard.tsx

import { Label } from "@/components/ui/label";
import StatusBadge from "../StatusBadge";
import { StaffingRequestDetail } from "./StaffingRequestTypes";
import { uiTheme } from "@/app/lib/uiConfig";
import { Input } from "@/components/ui/input";

interface Props {
  request: StaffingRequestDetail;
}

export default function StaffingRequestDetailsCard({ request }: Props) {
  return (
    <div
      className={`${uiTheme.colors.card} ${uiTheme.spacing.cardPadding} mt-4 space-y-4`}
    >
      <div className={uiTheme.layout.formGrid}>
        <div className="space-y-2">
          <Label>Manager</Label>
          <Input
            value={`${request.managerFirstName} ${request.managerLastName}`}
            disabled
          />
        </div>

        <div className="space-y-2">
          <Label>Location</Label>
          <Input value={request.locationName} disabled />
        </div>

        <div className="space-y-2">
          <Label>Type</Label>
          <Input value={request.requestType} disabled />
        </div>

        <div className="space-y-2">
          <Label>Status</Label>
          <div className="pt-2">
            <StatusBadge status={request.status} />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Created</Label>
          <Input
            value={new Date(request.createdAt).toLocaleString()}
            disabled
          />
        </div>
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
