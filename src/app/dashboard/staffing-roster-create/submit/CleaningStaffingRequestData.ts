import {
  CleanedStaffingItem,
  StaffingDay,
  StaffingRequestPayload,
} from "../StaffingTypes";

export function cleanStaffingRequestData(
  data: StaffingRequestPayload
): StaffingRequestPayload {
  const cleanedDays: StaffingDay[] = data.days
    .map((day) => {
      const validItems: CleanedStaffingItem[] = day.items.filter(
        (item) =>
          item.jobRoleId &&
          item.jobLevelId &&
          item.requiredCount > 0 &&
          item.startTime &&
          item.endTime
      );

      return validItems.length > 0
        ? { date: day.date, items: validItems }
        : null;
    })
    .filter((day): day is StaffingDay => day !== null); // Type guard

  return {
    ...data,
    days: cleanedDays,
  };
}
