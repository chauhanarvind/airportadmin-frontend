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
import UserForm, { UserFormData } from "./UserForm";

interface ModalProps {
  triggerLabel: string; // "+new user or edit"
  initialData?: Partial<Omit<UserFormData, "password">>;
  onSubmit: (data: UserFormData) => void;
  isEditMode?: boolean;
}

export default function Modal({
  triggerLabel,
  initialData,
  onSubmit,
  isEditMode = false,
}: ModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={isEditMode ? "outline" : "default"} size="sm">
          {triggerLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl w-full">
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
                ? "Update user information."
                : "Fill in the details to create a new user."}
            </span>
          </DialogDescription>
        </DialogHeader>

        <UserForm
          initialData={initialData}
          onSubmit={onSubmit}
          isEditMode={isEditMode}
          submitText={isEditMode ? "Update User" : "Create User"}
        />
      </DialogContent>
    </Dialog>
  );
}
