// Matches JobCategoryRequestDto
export interface CreateJobCategory {
  categoryName: string;
}

// Optional fields for partial updates
export interface UpdateJobCategory extends Partial<CreateJobCategory> {
  id: number;
}

// Matches JobCategoryResponseDto
export interface JobCategoryResponse {
  id: number;
  categoryName: string;
}
