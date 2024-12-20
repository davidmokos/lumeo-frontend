"use client";

import React from "react";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";

export default function Modal({
  onClose,
  children,
}: {
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogTitle className="sr-only">Modal</DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}
