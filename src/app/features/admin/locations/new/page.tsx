"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import PageContainer from "@/app/components/layout/PageContainer";
import PageHeader from "@/app/components/ui/PageHeader";

import LocationForm from "../LocationForm";
import { handleCreate } from "@/app/lib/crudService";
import { useRequireRoles } from "@/app/lib/useRequireRoles";
import { CreateLocation, LocationResponse } from "../LocationTypes";
import { uiTheme } from "@/app/lib/uiConfig";

export default function CreateLocationPage() {
  useRequireRoles(["Admin"]);
  const router = useRouter();

  const handleSubmit = async (data: CreateLocation) => {
    await handleCreate<CreateLocation, LocationResponse>(
      "/api/locations/create",
      data,
      "Location",
      () => router.push("/features/admin/locations")
    );
  };

  return (
    <PageContainer>
      <PageHeader
        title="Create New Location"
        actions={
          <Link href="/features/admin/locations">
            <Button size="sm" className={uiTheme.buttons.back}>
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
          </Link>
        }
      />

      <div
        className={`${uiTheme.colors.card} ${uiTheme.spacing.cardPadding} space-y-6`}
      >
        <LocationForm
          onSubmit={handleSubmit}
          isEditMode={false}
          submitText="Create Location"
        />
      </div>
    </PageContainer>
  );
}
