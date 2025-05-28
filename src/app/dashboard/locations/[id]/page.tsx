"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { useRequireRoles } from "@/app/lib/useRequireRoles";
import { handleGetById, handleUpdate } from "@/app/lib/crudService";
import { uiTheme } from "@/app/lib/uiConfig";
import { Button } from "@/components/ui/button";
import LocationForm from "../LocationForm";
import {
  LocationResponse,
  CreateLocation,
  UpdateLocation,
} from "../LocationTypes";

type LocationFormData = Partial<UpdateLocation> & CreateLocation;

export default function EditLocationPage() {
  useRequireRoles(["Admin", "Manager"]);

  const { id } = useParams();
  const router = useRouter();
  const [initialData, setInitialData] =
    useState<Partial<LocationFormData> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchLocation = async () => {
      setLoading(true);
      try {
        const location = await handleGetById<LocationResponse>(
          `/api/locations/${id}`,
          "Location"
        );

        if (location) {
          setInitialData({
            id: location.id,
            locationName: location.locationName,
            description: location.description,
          });
        } else {
          router.push("/dashboard/locations");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchLocation();
  }, [id, router]);

  const handleSubmit = async (data: LocationFormData) => {
    await handleUpdate<LocationResponse, LocationFormData>(
      `/api/locations/${data.id}`,
      "PUT",
      data,
      "Location",
      () => router.push("/dashboard/locations")
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading location details...</p>
      </div>
    );
  }

  if (!initialData) return null;

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
        <h1 className={uiTheme.text.heading}>Edit Location</h1>
      </div>

      {/* Form Card */}
      <div
        className={`${uiTheme.colors.card} ${uiTheme.spacing.cardPadding} space-y-6`}
      >
        <LocationForm
          initialData={initialData}
          isEditMode
          onSubmit={handleSubmit}
          submitText="Update Location"
        />
      </div>
    </div>
  );
}
