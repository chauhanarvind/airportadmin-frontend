interface ApiUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role?: { id: number; name: string };
  jobLevel?: { id: number; levelName: string };
  jobRole?: {
    id: number;
    roleName: string;
    category?: {
      id: number;
      categoryName: string;
    };
  };
}

export default ApiUser;
