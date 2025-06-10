"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { handleFetchList } from "@/app/lib/crudService";
import { LocationResponse } from "./LocationTypes";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import PageLoader from "@/app/components/ui/PageLoader";
import EmptyState from "@/app/components/ui/EmptyState";

export default function LocationTable() {
  const [locations, setLocations] = useState<LocationResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchLocations = async () => {
      setLoading(true);
      try {
        const data = await handleFetchList<LocationResponse[]>(
          "/locations/",
          "Locations"
        );
        if (data) setLocations(data);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  if (loading) return <PageLoader />;

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Location Name</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {locations.map((loc) => (
            <TableRow
              key={loc.id}
              className="hover:bg-blue-50 transition cursor-pointer"
              onClick={() => router.push(`/features/admin/locations/${loc.id}`)}
            >
              <TableCell>{loc.locationName}</TableCell>
              <TableCell>{loc.description || "-"}</TableCell>
            </TableRow>
          ))}

          {locations.length === 0 && (
            <TableRow>
              <TableCell colSpan={2}>
                <EmptyState message="No locations found." />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
