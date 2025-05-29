import React from "react";
import { AlertCircle } from "lucide-react";

interface EmptyStateProps {
  message?: string;
  icon?: React.ReactNode;
  className?: string;
}

export default function EmptyState({
  message = "No data found.",
  icon = <AlertCircle className="h-8 w-8 text-gray-400" />,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center text-gray-500 py-10 ${className}`}
    >
      <div className="mb-3">{icon}</div>
      <p className="text-sm">{message}</p>
    </div>
  );
}
