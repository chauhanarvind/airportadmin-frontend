"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { handleFetchAll } from "@/app/lib/crudService";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { JobRoleResponse } from "./JobRoleTypes";

export default function JobRoleTable() {
  const [jobRoles, setJobRoles] = useState<JobRoleResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fetchJobRoles = async () => {
    setLoading(true);
    try {
      const data = await handleFetchAll<JobRoleResponse[]>(
        "/api/job-roles/",
        "Job Roles"
      );
      if (data) setJobRoles(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobRoles();
  }, []);

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Role Name</TableHead>
            <TableHead>Category</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {jobRoles.map((role) => (
            <TableRow
              key={role.id}
              className="hover:bg-blue-100 transition cursor-pointer"
              onClick={() => router.push(`/dashboard/job-roles/${role.id}`)}
            >
              <TableCell>{role.roleName}</TableCell>
              <TableCell>{role.categoryName}</TableCell>
            </TableRow>
          ))}

          {jobRoles.length === 0 && !loading && (
            <TableRow>
              <TableCell
                colSpan={2}
                className="text-center text-muted-foreground py-6"
              >
                No job roles found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
