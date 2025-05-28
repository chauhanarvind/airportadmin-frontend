"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { handleFetchAll } from "@/app/lib/crudService";
import { LocationResponse } from "./LocationTypes";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function LocationTable() {
  const [locations, setLocations] = useState<LocationResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fetchLocations = async () => {
    setLoading(true);
    try {
      const data = await handleFetchAll<LocationResponse[]>(
        "/api/locations/",
        "Locations"
      );
      if (data) setLocations(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

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
              className="hover:bg-blue-100 transition cursor-pointer"
              onClick={() => router.push(`/dashboard/locations/${loc.id}`)}
            >
              <TableCell>{loc.locationName}</TableCell>
              <TableCell>{loc.description || "-"}</TableCell>
            </TableRow>
          ))}

          {locations.length === 0 && !loading && (
            <TableRow>
              <TableCell
                colSpan={2}
                className="text-center text-muted-foreground py-6"
              >
                No locations found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
