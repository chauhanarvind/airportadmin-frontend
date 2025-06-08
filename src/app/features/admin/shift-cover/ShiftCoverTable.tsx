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
import { ShiftCoverResponseDto } from "@/app/features/common/shift-cover/ShiftCoverTypes";
import StatusBadge from "../../common/StatusBadge";

interface Props {
  data: ShiftCoverResponseDto[];
  loading: boolean;
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

export default function ShiftCoverTable({
  data,
  loading,
  page,
  totalPages,
  onPageChange,
}: Props) {
  const router = useRouter();

  const goToDetail = (id: number) => {
    router.push(`/features/admin/shift-cover/${id}`);
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Original User</TableHead>
            <TableHead>Covering User</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((req) => (
            <TableRow
              key={req.id}
              className="cursor-pointer hover:bg-muted"
              onClick={() => goToDetail(req.id)}
            >
              <TableCell>{req.shiftDate}</TableCell>
              <TableCell>
                {req.startTime} - {req.endTime}
              </TableCell>
              <TableCell>
                {req.originalUser.firstName} {req.originalUser.lastName}
              </TableCell>
              <TableCell>
                {req.coveringUser.firstName} {req.coveringUser.lastName}
              </TableCell>
              <TableCell>
                <StatusBadge status={req.status} />
              </TableCell>
            </TableRow>
          ))}

          {!loading && data.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center py-6 text-muted-foreground"
              >
                No shift cover requests found.
              </TableCell>
            </TableRow>
          )}

          {loading && (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-6">
                Loading...
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination Controls */}
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
