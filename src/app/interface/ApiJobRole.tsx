export default interface ApiJobRole {
  id: number;
  roleName: string;
  category?: {
    id: number;
    categoryName: string;
  };
}
