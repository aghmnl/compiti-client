"use client";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ReactNode, useState } from "react";

interface AlertDialogProps {
  triggerText?: string;
  triggerIcon?: ReactNode;
  title: string;
  description: string;
  cancelText?: string;
  confirmText?: string;
  onConfirm: () => Promise<void> | void;
}

export function CustomAlertDialog({
  triggerText,
  triggerIcon,
  title,
  description,
  cancelText = "Cancel",
  confirmText = "Confirm",
  onConfirm,
}: AlertDialogProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await onConfirm();
      setOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        {triggerIcon ? (
          <Button variant="ghost" size="icon">
            {triggerIcon}
          </Button>
        ) : (
          <Button variant="outline">{triggerText}</Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={isLoading}
            className={
              "text-destructive-foreground hover:bg-destructive/90 bg-red-500"
            }
          >
            {isLoading ? "Processing..." : confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
