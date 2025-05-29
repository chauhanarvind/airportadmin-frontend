"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import UserTable from "./UserTable";
import { useRequireRoles } from "@/app/lib/useRequireRoles";
import PageContainer from "@/app/components/layout/PageContainer";
import PageHeader from "@/app/components/ui/PageHeader";

export default function UsersPage() {
  useRequireRoles(["Admin", "Supervisor", "Manager"]);

  return (
    <PageContainer>
      <PageHeader
        title="User Management"
        actions={
          <Link href="/dashboard/users/new">
            <Button className="bg-blue-600 text-white hover:bg-blue-700">
              Add New User
            </Button>
          </Link>
        }
      />

      <div className="bg-white shadow-md rounded-2xl p-4">
        <UserTable />
      </div>
    </PageContainer>
  );
}
