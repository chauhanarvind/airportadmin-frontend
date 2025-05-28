"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { handleFetchList } from "@/app/lib/crudService";
import { JobLevelResponse } from "./JobLevelTypes";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function JobLevelTable() {
  const [levels, setLevels] = useState<JobLevelResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fetchLevels = async () => {
    setLoading(true);
    try {
      const data = await handleFetchList<JobLevelResponse[]>(
        "/api/job-levels/",
        "Job Levels"
      );
      if (data) setLevels(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLevels();
  }, []);

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Level Name</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {levels.map((level) => (
            <TableRow
              key={level.id}
              className="hover:bg-blue-100 transition cursor-pointer"
              onClick={() => router.push(`/dashboard/job-levels/${level.id}`)}
            >
              <TableCell>{level.levelName}</TableCell>
            </TableRow>
          ))}

          {levels.length === 0 && !loading && (
            <TableRow>
              <TableCell
                colSpan={1}
                className="text-center text-muted-foreground py-6"
              >
                No job levels found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
