import { Pencil, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TableActionButtonsProps {
  onEdit?: () => void;
  onDelete?: () => void;
  disabled?: boolean;
}

export default function TableActionButtons({
  onEdit,
  onDelete,
  disabled = false,
}: TableActionButtonsProps) {
  return (
    <div className="flex items-center gap-2">
      {onEdit && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onEdit}
          disabled={disabled}
        >
          <Pencil className="h-4 w-4" />
        </Button>
      )}
      {onDelete && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onDelete}
          disabled={disabled}
        >
          <Trash className="h-4 w-4 text-red-600" />
        </Button>
      )}
    </div>
  );
}
