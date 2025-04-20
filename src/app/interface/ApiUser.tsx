interface ApiUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role?: { id: number; name: string };
  jobLevel?: { id: number; levelName: string };
  jobRole?: { id: number; roleName: string };
  jobCategory?: { id: number; jobCategory: string };
}

export default ApiUser;
