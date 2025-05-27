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
import ApiJobLevel from "../interface/ApiJobLevel";
import { levelFormData } from "./LevelForm";
import LevelModal from "./LevelModal";
import { handleCreate, handleDelete, handleUpdate } from "../lib/crudService";

interface Level {
  id: number;
  levelName: string;
}

export default function LevelTable() {
  const [levels, setLevels] = useState<Level[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchLevels = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/job-levels/");

      const flatLevels = res.data.map(
        (level: ApiJobLevel): Level => ({
          id: level.id,
          levelName: level.levelName,
        })
      );

      setLevels(flatLevels);
    } catch (err: unknown) {
      toast.error("Failed to fetch categories.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLevels();
  }, []);

  const handleCreateLevel = async (data: levelFormData) => {
    console.log(data);
    handleCreate("/api/job-levels/create", data, "Job Level", fetchLevels);
  };

  const handleUpdateLevel = async (data: levelFormData) => {
    handleUpdate(`/api/job-levels/${data.id}`, data, "Job Level", fetchLevels);
  };

  const handleDeleteLevel = async (id: number) => {
    handleDelete(`/api/job-levels/${id}`, "Job Level", fetchLevels);
  };

  return (
    <div className="max-w-6xl  mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Job Levels</h1>

        {/* Modal */}
        <LevelModal
          triggerLabel="+ New Job Level"
          onSubmit={handleCreateLevel}
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
            {levels.map((level) => (
              <TableRow key={level.id}>
                <TableCell>{level.levelName}</TableCell>

                <TableCell className="text-right space-x-2">
                  <LevelModal
                    key={level.id}
                    triggerLabel="Edit"
                    initialData={level}
                    onSubmit={handleUpdateLevel}
                    isEditMode={true}
                  />

                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteLevel(level.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}

            {levels.length == 0 && !loading && (
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
