// Matches JobLevelRequestDto
export interface CreateJobLevel {
  levelName: string;
}

// For updates
export interface UpdateJobLevel extends Partial<CreateJobLevel> {
  id: number;
}

// Matches JobLevelResponseDto
export interface JobLevelResponse {
  id: number;
  levelName: string;
}
