"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ShiftCoverResponseDto } from "@/app/features/common/shift-cover/ShiftCoverTypes";

interface Props {
  requests: ShiftCoverResponseDto[];
}

export default function ShiftCoverTable({ requests }: Props) {
  const [data] = useState<ShiftCoverResponseDto[]>(requests);
  const router = useRouter();

  const goToDetail = (id: number) => {
    router.push(`/admin/shift-cover/${id}`);
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
              <TableCell>{req.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
