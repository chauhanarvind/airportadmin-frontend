"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

import LocationForm from "../LocationForm";
import { handleCreate } from "@/app/lib/crudService";
import { uiTheme } from "@/app/lib/uiConfig";
import { useRequireRoles } from "@/app/lib/useRequireRoles";
import { CreateLocation, LocationResponse } from "../LocationTypes";

export default function CreateLocationPage() {
  useRequireRoles(["Admin", "Manager"]);
  const router = useRouter();

  const handleSubmit = async (data: CreateLocation) => {
    await handleCreate<CreateLocation, LocationResponse>(
      "/api/locations/create",
      data,
      "Location",
      () => router.push("/dashboard/locations")
    );
  };

  return (
    <div className={uiTheme.layout.container}>
      {/* Back Button + Heading */}
      <div className="flex items-center gap-3">
        <Link href="/dashboard/locations">
          <Button size="sm" className={uiTheme.buttons.card}>
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
        </Link>
        <h1 className={uiTheme.text.heading}>Create New Location</h1>
      </div>

      {/* Form Card */}
      <div
        className={`${uiTheme.colors.card} ${uiTheme.spacing.cardPadding} space-y-6`}
      >
        <LocationForm
          onSubmit={handleSubmit}
          isEditMode={false}
          submitText="Create Location"
        />
      </div>
    </div>
  );
}
