"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import PageContainer from "@/app/components/layout/PageContainer";
import PageHeader from "@/app/components/ui/PageHeader";
import PageLoader from "@/app/components/ui/PageLoader";
import { handleGetById } from "@/app/lib/crudService";
import { ShiftCoverResponseDto } from "@/app/features/common/shift-cover/ShiftCoverTypes";
import ShiftCoverForm from "./ShiftCoverForm";

export default function ShiftCoverDetailPage() {
  const { id } = useParams();
  const [request, setRequest] = useState<ShiftCoverResponseDto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchRequest = async () => {
      const res = await handleGetById<ShiftCoverResponseDto>(
        `/api/shift-cover/${id}`,
        "Shift cover request"
      );
      if (res) setRequest(res);
      setLoading(false);
    };

    fetchRequest();
  }, [id]);

  if (loading) return <PageLoader />;
  if (!request)
    return <p className="text-muted-foreground">Request not found.</p>;

  return (
    <PageContainer>
      <PageHeader title="Review Shift Cover Request" />
      <ShiftCoverForm request={request} />
    </PageContainer>
  );
}
