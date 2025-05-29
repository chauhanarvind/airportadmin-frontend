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

import EmptyState from "@/app/components/ui/EmptyState";
import PageLoader from "@/app/components/ui/PageLoader";

export default function JobLevelTable() {
  const [levels, setLevels] = useState<JobLevelResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
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

    fetchLevels();
  }, []);

  if (loading) return <PageLoader />;

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
              className="hover:bg-blue-50 transition cursor-pointer"
              onClick={() => router.push(`/dashboard/job-levels/${level.id}`)}
            >
              <TableCell>{level.levelName}</TableCell>
            </TableRow>
          ))}

          {levels.length === 0 && (
            <TableRow>
              <TableCell colSpan={1}>
                <EmptyState message="No job levels found." />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
