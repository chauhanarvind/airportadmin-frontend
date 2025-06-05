// Matches StaffAvailabilityRequestDto
export interface StaffAvailabilityRequest {
  userId: number;
  date: string; // "YYYY-MM-DD"
  unavailableFrom?: string; // "HH:mm"
  unavailableTo?: string; // "HH:mm"
  isAvailable: boolean;
}

// Matches StaffAvailabilityResponseDto
export interface StaffAvailabilityResponse {
  id: number;
  userId: number;
  userName?: string;
  date: string; // "YYYY-MM-DD"
  unavailableFrom?: string; // "HH:mm"
  unavailableTo?: string; // "HH:mm"
  isAvailable: boolean;
}
