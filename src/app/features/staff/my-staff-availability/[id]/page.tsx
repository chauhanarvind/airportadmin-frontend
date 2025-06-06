"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { uiTheme } from "@/app/lib/uiConfig";
import { handleGetById, handleCreate } from "@/app/lib/crudService";
import PageContainer from "@/app/components/layout/PageContainer";
import PageHeader from "@/app/components/ui/PageHeader";
import PageLoader from "@/app/components/ui/PageLoader";
import { Button } from "@/components/ui/button";

import MyStaffAvailabilityForm from "../MyStaffAvailabilityForm";
import {
  StaffAvailabilityRequest,
  StaffAvailabilityResponse,
} from "@/app/features/common/staff-availability/StaffAvailabilityTypes";

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
      () => router.push("/features/staff/my-staff-availability")
    );
  };

  if (!entry) return <PageLoader />;

  return (
    <PageContainer>
      <PageHeader
        title="Edit Availability"
        actions={
          <Link href="/features/staff/my-staff-availability">
            <Button size="sm" className={uiTheme.buttons.back}>
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
          </Link>
        }
      />

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
    </PageContainer>
  );
}
