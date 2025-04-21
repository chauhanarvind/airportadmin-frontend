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
import Modal from "./forms/Modal";
import { UserFormData } from "./forms/UserForm";
import { AxiosError } from "axios";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  roleName: string;
  jobLevelName: string;
  jobRoleName: string;
  roleId: number | null;
  jobLevelId: number | null;
  jobRoleId: number | null;
}

export default function UsersTable() {
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
    try {
      const res = await api.post("/api/users/create", data);
      console.log(res.data);

      if (res.status == 200) {
        toast.success("User created successfully");
      } else {
        toast.error("Failed to create user");
      }
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;
      let errorMessage = error.message;
      if (error.response?.data.message) {
        errorMessage += `:${error.response.data.message}`;
      }
      console.log("Error creating user : ", error);
      toast.error(errorMessage);
    }
  };

  const handleUpdateUser = () => {};

  return (
    <div className="max-w-6xl  mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Users</h1>

        {/* Modal */}
        <Modal triggerLabel="+ New User" onSubmit={handleCreateUser} />
      </div>

      <div className="border rounded-xl overflow-hidden shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Job Level</TableHead>
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
                <TableCell>{user.jobRoleName}</TableCell>

                <TableCell className="text-right space-x-2">
                  <Modal
                    triggerLabel="Edit"
                    initialData={user}
                    onSubmit={handleUpdateUser}
                    isEditMode={true}
                  ></Modal>

                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => toast(`Delete user ID: ${user.id}`)}
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
