"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { handleFetchList } from "@/app/lib/crudService";
import { JobRoleResponse } from "./JobRoleTypes";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import EmptyState from "@/app/components/ui/EmptyState";
import PageLoader from "@/app/components/ui/PageLoader";

export default function JobRoleTable() {
  const [jobRoles, setJobRoles] = useState<JobRoleResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchJobRoles = async () => {
      setLoading(true);
      try {
        const data = await handleFetchList<JobRoleResponse[]>(
          "/api/job-roles/",
          "Job Roles"
        );
        if (data) setJobRoles(data);
      } finally {
        setLoading(false);
      }
    };

    fetchJobRoles();
  }, []);

  if (loading) return <PageLoader />;

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
              className="hover:bg-blue-50 transition cursor-pointer"
              onClick={() =>
                router.push(`/features/admin/job-roles/${role.id}`)
              }
            >
              <TableCell>{role.roleName}</TableCell>
              <TableCell>{role.categoryName}</TableCell>
            </TableRow>
          ))}

          {jobRoles.length === 0 && (
            <TableRow>
              <TableCell colSpan={2}>
                <EmptyState message="No job roles found." />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
