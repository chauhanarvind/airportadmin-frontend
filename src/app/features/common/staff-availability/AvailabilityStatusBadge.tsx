import React from "react";

export default function AvailabilityStatusBadge({
  available,
}: {
  available: boolean;
}) {
  return (
    <span
      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
        available ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
      }`}
    >
      {available ? "Available" : "Unavailable"}
    </span>
  );
}
