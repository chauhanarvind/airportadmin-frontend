"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { handleFetchList } from "@/app/lib/crudService";
import { JobCategoryResponse } from "./JobCategoryTypes";

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

export default function JobCategoryTable() {
  const [categories, setCategories] = useState<JobCategoryResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const data = await handleFetchList<JobCategoryResponse[]>(
          "/api/job-categories/",
          "Job Categories"
        );
        if (data) setCategories(data);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <PageLoader />;
  }

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
              className="hover:bg-blue-50 transition cursor-pointer"
              onClick={() =>
                router.push(`/features/admin/job-categories/${cat.id}`)
              }
            >
              <TableCell>{cat.categoryName}</TableCell>
            </TableRow>
          ))}

          {categories.length === 0 && (
            <TableRow>
              <TableCell colSpan={1}>
                <EmptyState message="No job categories found." />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
