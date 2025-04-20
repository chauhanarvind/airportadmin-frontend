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

interface User {
  id: number;
  fullName: string;
  email: string;
  role: string;
  jobLevel: string;
  jobRole: string;
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
          fullName: user.firstName + user.lastName,
          email: user.email,
          role: user.role?.name || "-",
          jobLevel: user.jobLevel?.levelName || "-",
          jobRole: user.jobRole?.roleName || "-",
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

  return (
    <div className="max-w-6xl  mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Users</h1>
        <Button>+ New User</Button>
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
                <TableCell>{user.fullName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.jobLevel}</TableCell>
                <TableCell>{user.jobRole}</TableCell>

                <TableCell className="text-right space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toast(`Edit user ID: ${user.id}`)}
                  >
                    Edit
                  </Button>

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
