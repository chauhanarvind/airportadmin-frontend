"use client";

import { useRouter } from "next/navigation";
import { uiTheme } from "@/app/lib/uiConfig";
import { LeaveRequestCreate } from "@/app/dashboard/common/leave/LeaveTypes";
import { handleCreate } from "@/app/lib/crudService";
import { useAuth } from "@/app/components/AuthProvider";
import { MyLeaveForm } from "../MyLeaveForm";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ApplyLeavePage() {
  const { user } = useAuth();
  const router = useRouter();

  const handleSubmit = async (data: LeaveRequestCreate) => {
    if (!user?.id) return;

    const payload = { ...data, userId: user.id };

    await handleCreate(
      "/api/leave-requests/apply",
      payload,
      "Leave request",
      () => {
        router.push("/dashboard/my-leave");
      }
    );
  };

  return (
    <div className={uiTheme.layout.container}>
      {/* Back Button + Heading */}
      <div className="flex items-center gap-3">
        <Link href="/dashboard/my-leave">
          <Button size="sm" className={uiTheme.buttons.card}>
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
        </Link>
        <h1 className={uiTheme.text.heading}>Apply for Leave</h1>
      </div>

      <div
        className={`${uiTheme.colors.card} ${uiTheme.spacing.cardPadding} mt-4`}
      >
        <MyLeaveForm mode="apply" onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
