"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import PageContainer from "@/app/components/layout/PageContainer";
import PageHeader from "@/app/components/ui/PageHeader";
import PageLoader from "@/app/components/ui/PageLoader";
import { Button } from "@/components/ui/button";
import { uiTheme } from "@/app/lib/uiConfig";

import { handleGetById } from "@/app/lib/crudService";
import { Assignment, GroupedDay } from "@/app/features/common/Assignment/Types";
import RosterTable from "./RosterTable";
import { useRequireRoles } from "@/app/lib/useRequireRoles";

export default function ViewGeneratedRosterPage() {
  useRequireRoles(["Admin", "Manager", "Supervisor"]);
  const { id } = useParams();
  const requestId = id as string;

  const [rosterDays, setRosterDays] = useState<GroupedDay[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoster = async () => {
      const response = await handleGetById<Assignment[]>(
        `/api/roster/view/${requestId}`,
        "Roster"
      );

      if (!response || response.length === 0) {
        setRosterDays([]);
        setLoading(false);
        return;
      }

      const groupedMap = response.reduce((acc, assignment) => {
        if (!acc[assignment.date]) acc[assignment.date] = [];
        acc[assignment.date].push(assignment);
        return acc;
      }, {} as Record<string, Assignment[]>);

      const grouped: GroupedDay[] = Object.entries(groupedMap).map(
        ([date, assignments]) => ({
          date,
          assignments,
        })
      );

      setRosterDays(grouped);
      setLoading(false);
    };

    fetchRoster();
  }, [requestId]);

  if (loading) return <PageLoader />;

  return (
    <PageContainer>
      <PageHeader
        title="Generated Roster"
        actions={
          <Link href="/features/admin/staffing-requests">
            <Button size="sm" className={uiTheme.buttons.back}>
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
          </Link>
        }
      />

      {!rosterDays || rosterDays.length === 0 ? (
        <p className="text-muted-foreground mt-4">
          No roster found for this request.
        </p>
      ) : (
        <div className="mt-4">
          <RosterTable days={rosterDays} />
        </div>
      )}
    </PageContainer>
  );
}
