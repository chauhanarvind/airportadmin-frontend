"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { uiTheme } from "@/app/lib/uiConfig";
import { useAuth } from "@/app/components/AuthProvider";
import { handleCreate } from "@/app/lib/crudService";
import { LeaveRequestCreate } from "@/app/dashboard/common/leave/LeaveTypes";

import PageContainer from "@/app/components/layout/PageContainer";
import PageHeader from "@/app/components/ui/PageHeader";
import { Button } from "@/components/ui/button";
import { MyLeaveForm } from "../MyLeaveForm";

export default function ApplyLeavePage() {
  const { user } = useAuth();
  const router = useRouter();

  const handleSubmit = async (data: LeaveRequestCreate) => {
    if (!user?.id) return;

    const payload = { ...data, userId: user.id };

    await handleCreate("/api/leaves/apply", payload, "Leave request", () =>
      router.push("/dashboard/my-leave")
    );
  };

  return (
    <PageContainer>
      <PageHeader
        title="Apply for Leave"
        actions={
          <Link href="/dashboard/my-leave">
            <Button size="sm" className={uiTheme.buttons.back}>
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
          </Link>
        }
      />

      <div
        className={`${uiTheme.colors.card} ${uiTheme.spacing.cardPadding} mt-4`}
      >
        <MyLeaveForm mode="apply" onSubmit={handleSubmit} />
      </div>
    </PageContainer>
  );
}
