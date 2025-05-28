// Matches ConstraintProfileRequestDto
export interface CreateConstraintProfile {
  name: string;
  maxHoursPerDay?: number;
  maxHoursPerWeek?: number;
  preferredStartTime?: string; // ISO time string, e.g., "08:00"
  preferredEndTime?: string;
  allowedDays?: string[]; // e.g., ["MONDAY", "TUESDAY"]
}

// For partial updates
export interface UpdateConstraintProfile
  extends Partial<CreateConstraintProfile> {
  id: number;
}

// Matches ConstraintProfileResponseDto
export interface ConstraintProfileResponse {
  id: number;
  name: string;
  maxHoursPerDay: number | null;
  maxHoursPerWeek: number | null;
  preferredStartTime: string | null;
  preferredEndTime: string | null;
  allowedDays: string[]; // ["MONDAY", "WEDNESDAY", ...]
}
