"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { UserResponse } from "./UserTypes";
import { handleFetchList } from "@/app/lib/crudService";
import { useRequireRoles } from "@/app/lib/useRequireRoles";
import EmptyState from "@/app/components/ui/EmptyState";
import PageLoader from "@/app/components/ui/PageLoader";

export default function UserTable() {
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useRequireRoles(["Admin", "Manager"]);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const data = await handleFetchList<UserResponse[]>(
          "/api/users/",
          "Users"
        );
        if (data) setUsers(data);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Job Level</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Constraint Profile</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {users.map((u) => (
            <TableRow
              key={u.id}
              className="hover:bg-blue-50 transition cursor-pointer"
              onClick={() => router.push(`/dashboard/users/${u.id}`)}
            >
              <TableCell>{u.firstName + " " + u.lastName}</TableCell>
              <TableCell>{u.email}</TableCell>
              <TableCell>{u.roleName}</TableCell>
              <TableCell>{u.jobLevelName}</TableCell>
              <TableCell>{u.jobRoleName}</TableCell>
              <TableCell>{u.constraintProfileName ?? "-"}</TableCell>
            </TableRow>
          ))}

          {users.length === 0 && !loading && (
            <TableRow>
              <TableCell colSpan={6}>
                <EmptyState message="No users found." />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
