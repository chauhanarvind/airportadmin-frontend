"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import ConstraintProfileTable from "./ConstraintProfileTable";
import { useRequireRoles } from "@/app/lib/useRequireRoles";
import { uiTheme } from "@/app/lib/uiConfig";

export default function ConstraintProfilesPage() {
  useRequireRoles(["Admin"]);

  return (
    <div className={uiTheme.layout.container}>
      <div className="flex justify-between items-center">
        <h1 className={uiTheme.text.heading}>Constraint Profiles</h1>
        <Link href="/dashboard/constraints/new">
          <Button className={uiTheme.colors.primary}>Add New Profile</Button>
        </Link>
      </div>

      <div className={`${uiTheme.colors.card} ${uiTheme.spacing.cardPadding}`}>
        <ConstraintProfileTable />
      </div>
    </div>
  );
}
