// Matches CreateUserDto
export interface CreateUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roleId: number;
  jobRoleId: number;
  jobLevelId: number;
}

// Matches UpdateUserDto
export interface UpdateUser {
  id: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  roleId?: number;
  jobRoleId?: number;
  jobLevelId?: number;
  constraintProfileId?: number;
}

// Matches UserResponseDto
export interface UserResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;

  // Raw IDs (used in forms)
  roleId: number | null;
  jobRoleId: number | null;
  jobLevelId: number | null;
  constraintProfileId: number | null;

  // Display names
  roleName: string;
  jobRoleName: string;
  jobLevelName: string;
  constraintProfileName: string;
}
