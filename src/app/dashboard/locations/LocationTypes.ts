// Matches LocationRequestDto
export interface CreateLocation {
  locationName: string;
  description?: string;
}

// For updating a location
export interface UpdateLocation extends Partial<CreateLocation> {
  id: number;
}

// Matches LocationResponseDto
export interface LocationResponse {
  id: number;
  locationName: string;
  description?: string;
}
