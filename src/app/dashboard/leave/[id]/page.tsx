"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";

import {
  LeaveRequestResponse,
  LeaveRequestUpdate,
} from "@/app/dashboard/common/leave/LeaveTypes";

import { handleGetById, handleUpdate } from "@/app/lib/crudService";
import { uiTheme } from "@/app/lib/uiConfig";

import LeaveForm from "../LeaveForm";
import PageContainer from "@/app/components/layout/PageContainer";
import PageHeader from "@/app/components/ui/PageHeader";
import PageLoader from "@/app/components/ui/PageLoader";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LeaveRequestByIdPage() {
  const { id } = useParams();
  const router = useRouter();
  const methods = useForm<LeaveRequestResponse>();
  const { reset } = methods;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeave = async () => {
      setLoading(true);
      const data = await handleGetById<LeaveRequestResponse>(
        `/api/leaves/${id}`,
        "Leave Request"
      );
      if (data) reset(data);
      setLoading(false);
    };
    fetchLeave();
  }, [id, reset]);

  const onSubmit = async (data: LeaveRequestResponse) => {
    const payload: LeaveRequestUpdate = { status: data.status };
    const updated = await handleUpdate<
      LeaveRequestResponse,
      LeaveRequestUpdate
    >(`/api/leaves/${id}/status`, "PUT", payload, "Leave request");
    if (updated) router.push("/dashboard/leave");
  };

  return (
    <PageContainer>
      <PageHeader
        title="Leave Request Details"
        actions={
          <Link href="/dashboard/leave">
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
        {loading ? (
          <PageLoader />
        ) : (
          <FormProvider {...methods}>
            <LeaveForm onSubmit={onSubmit} />
          </FormProvider>
        )}
      </div>
    </PageContainer>
  );
}
