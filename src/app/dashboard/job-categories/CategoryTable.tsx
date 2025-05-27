import { useEffect, useState } from "react";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ApiJobCategory from "../interface/ApiJobCategory";
import { CategoryFormData } from "./CategoryForm";
import CategoryModal from "./CategoryModal";
import { handleCreate, handleDelete, handleUpdate } from "../lib/crudService";

interface Category {
  id: number;
  categoryName: string;
}

export default function CategoryTable() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/job-categories/");
      console.log(res);

      const flatCategories = res.data.map(
        (category: ApiJobCategory): Category => ({
          id: category.id,
          categoryName: category.categoryName,
        })
      );

      setCategories(flatCategories);
    } catch (err: unknown) {
      toast.error("Failed to fetch categories.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreateCategory = async (data: CategoryFormData) => {
    handleCreate(
      "/api/job-categories/create",
      data,
      "Job Category",
      fetchCategories
    );
  };

  const handleUpdateCategory = async (data: CategoryFormData) => {
    handleUpdate(
      `/api/job-categories/${data.id}`,
      data,
      "Job Category",
      fetchCategories
    );
  };

  const handleDeleteCategory = async (id: number) => {
    handleDelete(`/api/job-categories/${id}`, "Job Category", fetchCategories);
  };

  return (
    <div className="max-w-6xl  mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Job Categories</h1>

        {/* Modal */}
        <CategoryModal
          triggerLabel="+ New Job Category"
          onSubmit={handleCreateCategory}
        />
      </div>

      <div className="border rounded-xl overflow-hidden shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>{category.categoryName}</TableCell>

                <TableCell className="text-right space-x-2">
                  <CategoryModal
                    key={category.id}
                    triggerLabel="Edit"
                    initialData={category}
                    onSubmit={handleUpdateCategory}
                    isEditMode={true}
                  ></CategoryModal>

                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteCategory(category.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}

            {categories.length == 0 && !loading && (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center text-muted-foreground"
                ></TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
