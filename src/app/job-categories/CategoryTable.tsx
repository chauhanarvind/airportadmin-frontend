import { useEffect, useState } from "react";
import api from "../lib/api";
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
import { AxiosError } from "axios";
import ApiJobCategory from "../interface/ApiJobCategory";
import { CategoryFormData } from "./CategoryForm";
import CategoryModal from "./CategoryModal";

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
    console.log(data);

    try {
      const res = await api.post("/api/job-categories/create", data);
      console.log(res.data);

      if (res.status == 200) {
        toast.success("Job category created successfully");
        fetchCategories();
      } else {
        toast.error("Failed to create job category");
      }
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;
      let errorMessage = error.message;
      if (error.response?.data.message) {
        errorMessage += `:${error.response.data.message}`;
      }
      console.log("Error creating category : ", error);
      toast.error(errorMessage);
    }
  };

  const handleUpdateCategory = async (data: CategoryFormData) => {
    console.log(data);
    try {
      const res = await api.post(`/api/job-categories/${data.id}`, data);
      console.log(res.data);

      if (res.status == 200) {
        toast.success("Job category updated successfully");
        fetchCategories();
      } else {
        toast.error("Failed to update job category");
      }
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;
      let errorMessage = error.message;
      if (error.response?.data.message) {
        errorMessage += `:${error.response.data.message}`;
      }
      console.log("Error updating job category : ", error);
      toast.error(errorMessage);
    }
  };

  const handleDeleteCategory = async (data: CategoryFormData) => {
    try {
      console.log(data.id);
      const res = await api.delete(`/api/job-categories/${data.id}`);
      console.log(res);

      if (res.status == 204) {
        toast.success("Job category deleted successfully");
        fetchCategories();
      } else {
        toast.error("Failed to delete job category");
      }
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;
      let errorMessage = error.message;
      if (error.response?.data.message) {
        errorMessage += `:${error.response.data.message}`;
      }
      console.log("Error deleting job category : ", error);
      toast.error(errorMessage);
    }
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
                    onClick={() => handleDeleteCategory(category)}
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
