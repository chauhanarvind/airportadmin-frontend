"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { uiTheme } from "@/app/lib/uiConfig";
import { handleGetById, handleUpdate } from "@/app/lib/crudService";
import PageContainer from "@/app/components/layout/PageContainer";
import PageHeader from "@/app/components/ui/PageHeader";
import PageLoader from "@/app/components/ui/PageLoader";
import { Button } from "@/components/ui/button";

import MyStaffAvailabilityForm from "../MyStaffAvailabilityForm";
import {
  StaffAvailabilityRequest,
  StaffAvailabilityResponse,
} from "@/app/features/common/staff-availability/StaffAvailabilityTypes";
import { useRequireRoles } from "@/app/lib/useRequireRoles";

export default function EditStaffAvailabilityPage() {
  useRequireRoles(["Admin", "Manager", "Supervisor", "Crew"]);
  const { id } = useParams();
  const router = useRouter();
  const [entry, setEntry] = useState<StaffAvailabilityResponse | null>(null);
  const [availabilityId, setAvailabilityId] = useState<number | undefined>(
    undefined
  );

  useEffect(() => {
    const fetchAvailability = async () => {
      const data = await handleGetById<StaffAvailabilityResponse>(
        `/api/staff-availability/${id}`,
        "Staff availability"
      );
      setAvailabilityId(data?.id);
      if (data) setEntry(data);
    };
    fetchAvailability();
  }, [id]);

  const handleSubmit = async (data: StaffAvailabilityRequest) => {
    await handleUpdate(
      `/api/staff-availability/${availabilityId}`,
      "PUT",
      data,
      "Staff availability",
      () => router.push("/features/my/my-staff-availability")
    );
  };

  if (!entry) return <PageLoader />;

  return (
    <PageContainer>
      <PageHeader
        title="Edit Availability"
        actions={
          <Link href="/features/my/my-staff-availability">
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
