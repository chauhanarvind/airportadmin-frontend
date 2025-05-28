// src/features/staff-availability/StaffAvailabilityTypes.ts

export interface StaffAvailabilityRequestDto {
  userId: number;
  date: string; // Use string to handle ISO format from date pickers
  unavailableFrom?: string; // Optional, ISO time string (e.g., "14:00:00")
  unavailableTo?: string;
  isAvailable: boolean;
}

export interface StaffAvailabilityResponseDto {
  id: number;
  userId: number;
  userName?: string; // Optional for display
  date: string;
  unavailableFrom?: string;
  unavailableTo?: string;
  isAvailable: boolean;
}
