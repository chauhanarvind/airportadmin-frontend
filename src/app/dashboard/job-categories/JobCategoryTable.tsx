"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { handleFetchAll } from "@/app/lib/crudService";
import { JobCategoryResponse } from "./JobCategoryTypes";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function JobCategoryTable() {
  const [categories, setCategories] = useState<JobCategoryResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const data = await handleFetchAll<JobCategoryResponse[]>(
        "/api/job-categories/",
        "Job Categories"
      );
      if (data) setCategories(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Category Name</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {categories.map((cat) => (
            <TableRow
              key={cat.id}
              className="hover:bg-blue-100 transition cursor-pointer"
              onClick={() => router.push(`/dashboard/job-categories/${cat.id}`)}
            >
              <TableCell>{cat.categoryName}</TableCell>
            </TableRow>
          ))}

          {categories.length === 0 && !loading && (
            <TableRow>
              <TableCell
                colSpan={1}
                className="text-center text-muted-foreground py-6"
              >
                No job categories found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
