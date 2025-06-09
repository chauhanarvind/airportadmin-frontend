"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { uiTheme } from "@/app/lib/uiConfig";

interface LogoutDialogProps {
  trigger: React.ReactNode;
  onConfirm: () => void;
}

export default function LogoutDialog({
  trigger,
  onConfirm,
}: LogoutDialogProps) {
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    onConfirm();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        className={`rounded-xl ${uiTheme.colors.card} ${uiTheme.shadows.md} ${uiTheme.spacing.lg}`}
      >
        <DialogHeader>
          <DialogTitle className={uiTheme.text.heading}>
            Confirm Logout
          </DialogTitle>
        </DialogHeader>

        <p className={`${uiTheme.text.base} text-gray-600`}>
          Are you sure you want to log out?
        </p>

        <DialogFooter className="mt-6 flex justify-end gap-3">
          <Button
            onClick={() => setOpen(false)}
            className={uiTheme.buttons.reset}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            className={uiTheme.buttons.destructive}
          >
            Logout
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
