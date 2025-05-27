"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/app/lib/api";
import { StaffingRequestDetail } from "./staffing";
import RequestMetaData from "./RequestMetaData";
import WeeklyRosterTable from "./WeeklyRosterTable";

export default function StaffingRequestDetailPage() {
  const { id } = useParams();
  const [data, setData] = useState<StaffingRequestDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/api/staffing-requests/${id}`);
        console.log(res);
        setData(res.data);
      } catch (err) {
        console.error("Failed to load staffing requests", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (!data) {
    return (
      <div className="p-4 text-red-500">
        Request not found or failed to load.
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Staffing Request #{data.id}</h2>
        {/* Optional Back Button or Breadcrumb */}
      </div>

      <RequestMetaData data={data} />
      <WeeklyRosterTable days={data.days} />
    </div>
  );
}
