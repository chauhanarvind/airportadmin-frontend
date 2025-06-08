import { StaffingRequestCreate } from "../../common/staffing-requests/StaffingRequestTypes";

export function cleanStaffingRequestPayload(
  payload: StaffingRequestCreate
): StaffingRequestCreate {
  // Filter out days with no items
  const cleanedDays = payload.days
    .filter((day) => Array.isArray(day.items) && day.items.length > 0)
    .map((day) => ({
      date: day.date,
      items: day.items.map((item) => ({
        ...item,
        requiredCount: Number(item.requiredCount), // ensures it's a number
      })),
    }));

  return {
    ...payload,
    reason: payload.reason?.trim() || undefined,
    days: cleanedDays,
  };
}
