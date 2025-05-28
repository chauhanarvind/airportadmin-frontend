"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import api from "@/app/lib/api";
import { StaffAvailabilityResponseDto } from "./MyStaffAvailabilityTypes";

export default function StaffAvailabilityPage() {
  const [data, setData] = useState<StaffAvailabilityResponseDto[]>([]);
  const [userNameFilter, setUserNameFilter] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState<string>("all");

  const router = useRouter();

  const fetchData = async () => {
    try {
      const res = await api.get("/staff-availability/");
      let filtered = res.data;

      if (userNameFilter.trim()) {
        filtered = filtered.filter((entry: StaffAvailabilityResponseDto) =>
          entry.userName?.toLowerCase().includes(userNameFilter.toLowerCase())
        );
      }

      if (availabilityFilter !== "all") {
        filtered = filtered.filter(
          (entry: StaffAvailabilityResponseDto) =>
            String(entry.isAvailable) === availabilityFilter
        );
      }

      setData(filtered);
    } catch (error) {
      console.error("Failed to fetch staff availability:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userNameFilter, availabilityFilter]);

  return (
    <div className={uiTheme.layout.container}>
      <div className="flex justify-between items-center">
        <h2 className={uiTheme.text.heading}>Staff Availability</h2>
        <Button onClick={() => router.push("/staff-availability/create")}>
          + Add Availability
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className={uiTheme.text.subheading}>Filters</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label className={uiTheme.text.label}>User Name</Label>
            <Input
              value={userNameFilter}
              onChange={(e) => setUserNameFilter(e.target.value)}
              placeholder="Search by name"
            />
          </div>
          <div className="space-y-2">
            <Label className={uiTheme.text.label}>Availability</Label>
            <Select
              onValueChange={setAvailabilityFilter}
              value={availabilityFilter}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filter by availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="true">Available</SelectItem>
                <SelectItem value="false">Unavailable</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <StaffAvailabilityTable data={data} refresh={fetchData} />
    </div>
  );
}
