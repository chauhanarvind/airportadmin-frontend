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
import { handleCreate, handleDelete, handleUpdate } from "../lib/crudService";
import ApiJobRole from "../interface/ApiJobRole";
import { RoleFormData } from "./RoleForm";
import RoleModal from "./RoleModal";

interface Role {
  id: number;
  roleName: string;
  categoryName?: string;
}

export default function RoleTable() {
  const label = "Job Role";
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchRoles = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/job-roles/");
      console.log(res);

      const flatRoles = res.data.map(
        (role: ApiJobRole): Role => ({
          id: role.id,
          roleName: role.roleName,
          categoryName: role?.category?.categoryName,
        })
      );

      setRoles(flatRoles);
    } catch (err: unknown) {
      toast.error("Failed to fetch roles.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleCreateRole = async (data: RoleFormData) => {
    handleCreate("/api/job-roles/create", data, label, fetchRoles);
  };

  const handleUpdateRole = async (data: RoleFormData) => {
    handleUpdate(`/api/job-roles/${data.id}`, data, label, fetchRoles);
  };

  const handleDeleteRole = async (id: number) => {
    handleDelete(`/api/job-roles/${id}`, label, fetchRoles);
  };

  return (
    <div className="max-w-6xl  mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Job Roles</h1>

        {/* Modal */}
        <RoleModal triggerLabel="+ New Job Role" onSubmit={handleCreateRole} />
      </div>

      <div className="border rounded-xl overflow-hidden shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Job Role</TableHead>
              <TableHead>Job Category</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {roles.map((role) => (
              <TableRow key={role.id}>
                <TableCell>{role.roleName}</TableCell>
                <TableCell>{role.categoryName}</TableCell>

                <TableCell className="text-right space-x-2">
                  <RoleModal
                    key={role.id}
                    triggerLabel="Edit"
                    initialData={role}
                    onSubmit={handleUpdateRole}
                    isEditMode={true}
                  />

                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteRole(role.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}

            {roles.length == 0 && !loading && (
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
