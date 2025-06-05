// Matches JobRoleRequestDto
export interface CreateJobRole {
  roleName: string;
  categoryId: number;
}

// For partial updates (if needed)
export interface UpdateJobRole extends Partial<CreateJobRole> {
  id: number;
}

// Matches JobRoleResponseDto
export interface JobRoleResponse {
  id: number;
  roleName: string;
  categoryId: number;
  categoryName: string;
}
