"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { handleFetchList } from "@/app/lib/crudService";
import { ConstraintProfileResponse } from "./ConstraintProfileTypes";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function ConstraintProfileTable() {
  const [profiles, setProfiles] = useState<ConstraintProfileResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fetchProfiles = async () => {
    setLoading(true);
    try {
      const data = await handleFetchList<ConstraintProfileResponse[]>(
        "/api/constraint-profiles/",
        "Constraint Profiles"
      );
      if (data) setProfiles(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Max Hours/Day</TableHead>
            <TableHead>Max Hours/Week</TableHead>
            <TableHead>Preferred Time</TableHead>
            <TableHead>Allowed Days</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {profiles.map((p) => (
            <TableRow
              key={p.id}
              className="hover:bg-blue-100 transition cursor-pointer"
              onClick={() => router.push(`/features/constraints/${p.id}`)}
            >
              <TableCell>{p.name}</TableCell>
              <TableCell>{p.maxHoursPerDay ?? "-"}</TableCell>
              <TableCell>{p.maxHoursPerWeek ?? "-"}</TableCell>
              <TableCell>
                {p.preferredStartTime && p.preferredEndTime ? (
                  <div className="w-[110px] font-mono text-sm text-gray-800">
                    {`${p.preferredStartTime.slice(
                      0,
                      5
                    )} - ${p.preferredEndTime.slice(0, 5)}`}
                  </div>
                ) : (
                  "-"
                )}
              </TableCell>

              <TableCell>
                {p.allowedDays.length > 0
                  ? p.allowedDays.map((d) => d.slice(0, 3)).join(", ")
                  : "-"}
              </TableCell>
            </TableRow>
          ))}

          {profiles.length === 0 && !loading && (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center text-muted-foreground py-6"
              >
                No constraint profiles found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
