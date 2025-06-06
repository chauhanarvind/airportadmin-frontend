"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { useRequireRoles } from "@/app/lib/useRequireRoles";
import { handleGetById, handleUpdate } from "@/app/lib/crudService";
import { Button } from "@/components/ui/button";
import PageContainer from "@/app/components/layout/PageContainer";
import PageHeader from "@/app/components/ui/PageHeader";
import PageLoader from "@/app/components/ui/PageLoader";

import LocationForm from "../LocationForm";
import {
  LocationResponse,
  CreateLocation,
  UpdateLocation,
} from "../LocationTypes";
import { uiTheme } from "@/app/lib/uiConfig";

type LocationFormData = Partial<UpdateLocation> & CreateLocation;

export default function EditLocationPage() {
  useRequireRoles(["Admin"]);

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
          router.push("/features/admin/locations");
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
      () => router.push("/features/admin/locations")
    );
  };

  if (loading) return <PageLoader />;
  if (!initialData) return null;

  return (
    <PageContainer>
      <PageHeader
        title="Edit Location"
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
          initialData={initialData}
          isEditMode
          onSubmit={handleSubmit}
          submitText="Update Location"
        />
      </div>
    </PageContainer>
  );
}
