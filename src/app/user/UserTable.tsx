import { useEffect, useState } from "react";
import api from "../lib/api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ApiUser from "../interface/ApiUser";
import { UserFormData } from "./UserForm";
import UserModal from "./UserModal";
import { handleCreate, handleDelete, handleUpdate } from "../lib/crudService";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  roleName: string;
  jobLevelName: string;
  jobRoleName: string;
  jobCategoryName: string;
  roleId: number | null;
  jobLevelId: number | null;
  jobRoleId: number | null;
}

export default function UserTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/users/");
      console.log(res);

      const flatUsers = res.data.map(
        (user: ApiUser): User => ({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          roleName: user.role?.name || "-",
          jobLevelName: user.jobLevel?.levelName || "-",
          jobCategoryName: user.jobRole?.category?.categoryName || "-",
          jobRoleName: user.jobRole?.roleName || "-",
          jobLevelId: user.jobLevel?.id || null,
          jobRoleId: user.jobRole?.id || null,
          roleId: user.role?.id || null,
        })
      );

      console.log(flatUsers);
      setUsers(flatUsers);
    } catch (err: unknown) {
      toast.error("Failed to fetch users.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreateUser = async (data: UserFormData) => {
    handleCreate("/api/users/create", data, "User", fetchUsers);
  };

  const handleUpdateUser = async (data: UserFormData) => {
    handleUpdate(`/api/users/${data.id}`, data, "User", fetchUsers);
  };

  const handleDeleteUser = async (data: UserFormData) => {
    handleDelete(`/api/users/${data.id}`, "User", fetchUsers);
  };

  return (
    <div className="max-w-6xl  mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Users</h1>

        {/* Modal */}
        <UserModal triggerLabel="+ New User" onSubmit={handleCreateUser} />
      </div>

      <div className="border rounded-xl overflow-hidden shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Job Level</TableHead>
              <TableHead>Job Category</TableHead>
              <TableHead>Job Role</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.firstName + " " + user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.roleName}</TableCell>
                <TableCell>{user.jobLevelName}</TableCell>
                <TableCell>{user.jobCategoryName}</TableCell>
                <TableCell>{user.jobRoleName}</TableCell>

                <TableCell className="text-right space-x-2">
                  <UserModal
                    key={user.id}
                    triggerLabel="Edit"
                    initialData={user}
                    onSubmit={handleUpdateUser}
                    isEditMode={true}
                  />

                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteUser(user)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}

            {users.length == 0 && !loading && (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center text-muted-foreground"
                ></TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
