"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import PageContainer from "@/app/components/layout/PageContainer";
import PageHeader from "@/app/components/ui/PageHeader";
import PageLoader from "@/app/components/ui/PageLoader";
import { handleGetById } from "@/app/lib/crudService";
import { ShiftCoverResponseDto } from "@/app/features/common/shift-cover/ShiftCoverTypes";
import ShiftCoverForm from "./ShiftCoverForm";
import { useRequireRoles } from "@/app/lib/useRequireRoles";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { uiTheme } from "@/app/lib/uiConfig";

export default function ShiftCoverDetailPage() {
  useRequireRoles(["Admin"]);
  const { id } = useParams();
  const [request, setRequest] = useState<ShiftCoverResponseDto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchRequest = async () => {
      const res = await handleGetById<ShiftCoverResponseDto>(
        `/cover-requests/${id}`,
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
      <PageHeader
        title="Review Shift Cover Request"
        actions={
          <Link href="/features/admin/shift-cover">
            <Button size="sm" className={uiTheme.buttons.back}>
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
          </Link>
        }
      />
      <ShiftCoverForm request={request} />
    </PageContainer>
  );
}
