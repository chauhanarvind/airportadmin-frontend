"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { uiTheme } from "@/app/lib/uiConfig";
import { handleGetById, handleCreate } from "@/app/lib/crudService";

import MyStaffAvailabilityForm from "../MyStaffAvailabilityForm";
import {
  StaffAvailabilityRequest,
  StaffAvailabilityResponse,
} from "../../common/staff-availability/StaffAvailabilityTypes";

export default function EditStaffAvailabilityPage() {
  const { id } = useParams();
  const router = useRouter();
  const [entry, setEntry] = useState<StaffAvailabilityResponse | null>(null);

  useEffect(() => {
    const fetchAvailability = async () => {
      const data = await handleGetById<StaffAvailabilityResponse>(
        `/api/staff-availability/${id}`,
        "Staff availability"
      );
      if (data) setEntry(data);
    };
    fetchAvailability();
  }, [id]);

  const handleSubmit = async (data: StaffAvailabilityRequest) => {
    await handleCreate(
      "/api/staff-availability",
      data,
      "Staff availability",
      () => router.push("/dashboard/my-staff-availability")
    );
  };

  if (!entry) return <p className="p-4">Loading...</p>;

  return (
    <div className={uiTheme.layout.container}>
      <h1 className={uiTheme.text.heading}>Edit Availability</h1>

      <div
        className={`${uiTheme.colors.card} ${uiTheme.spacing.cardPadding} mt-4`}
      >
        <MyStaffAvailabilityForm
          onSubmit={handleSubmit}
          defaultValues={{
            userId: entry.userId,
            date: entry.date,
            isAvailable: entry.isAvailable,
            unavailableFrom: entry.unavailableFrom ?? "",
            unavailableTo: entry.unavailableTo ?? "",
          }}
        />
      </div>
    </div>
  );
}
