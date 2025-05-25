"use client";

import { useEffect, useState } from "react";
import api from "@/app/lib/api";
import FilterBar from "./FilterBar";
import StaffingRequestsTable, { StaffingRequest } from "./StaffingRequetsTable";

export default function StaffingRequestsPage() {
  const [requests, setRequests] = useState<StaffingRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async (filters = {}) => {
    try {
      setLoading(true);
      const res = await api.get("/api/staffing-requests/", { params: filters });
      console.log(res);
      setRequests(res.data.content);
    } catch (err) {
      console.error("Failed to load staffing requests", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests(); // initial load
  }, []);

  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Staffing Requests</h1>
      </div>

      <FilterBar onFilter={fetchRequests} />

      <StaffingRequestsTable data={requests} loading={loading} />
    </div>
  );
}
