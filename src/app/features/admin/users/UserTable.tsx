"use client";

import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import PageLoader from "@/app/components/ui/PageLoader";
import EmptyState from "@/app/components/ui/EmptyState";
import { UserResponse } from "./UserTypes";

interface Props {
  data: UserResponse[];
  loading: boolean;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function UserTable({
  data,
  loading,
  page,
  totalPages,
  onPageChange,
}: Props) {
  const router = useRouter();

  if (loading) return <PageLoader />;

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
          {data.map((u) => (
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

          {!loading && data.length === 0 && (
            <TableRow>
              <TableCell colSpan={6}>
                <EmptyState message="No users found." />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex justify-end gap-2 mt-4">
        <Button
          variant="outline"
          disabled={page === 0}
          onClick={() => onPageChange(page - 1)}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          disabled={page + 1 >= totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
