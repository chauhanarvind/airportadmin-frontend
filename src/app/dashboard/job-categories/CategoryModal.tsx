import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import { useState } from "react";
import CategoryForm, { CategoryFormData } from "./CategoryForm";

interface ModalProps {
  triggerLabel: string; // "+new user or edit"
  initialData?: Partial<CategoryFormData>;
  onSubmit: (data: CategoryFormData) => void;
  isEditMode?: boolean;
}

export default function CategoryModal({
  triggerLabel,
  initialData,
  onSubmit,
  isEditMode = false,
}: ModalProps) {
  const [open, setOpen] = useState(false);

  const handleSubmitAndClose = (data: CategoryFormData) => {
    onSubmit(data);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => setOpen(true)}
          variant={isEditMode ? "outline" : "default"}
          size="sm"
        >
          {triggerLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <DialogClose asChild>
          <button className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        </DialogClose>

        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold mb-2">
            {isEditMode ? "Edit user" : "Create New User"}
          </DialogTitle>
          <DialogDescription>
            <span className="sr-only">
              {isEditMode
                ? "Update job category information."
                : "Fill in the details to create a new job category."}
            </span>
          </DialogDescription>
        </DialogHeader>

        <CategoryForm
          initialData={initialData}
          onSubmit={handleSubmitAndClose}
          isEditMode={isEditMode}
          submitText={
            isEditMode ? "Update job category" : "Create job category"
          }
        />
      </DialogContent>
    </Dialog>
  );
}
