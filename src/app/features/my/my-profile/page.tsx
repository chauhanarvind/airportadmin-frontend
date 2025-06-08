"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/app/components/AuthProvider";
import { uiTheme } from "@/app/lib/uiConfig";
import PageContainer from "@/app/components/layout/PageContainer";
import PageHeader from "@/app/components/ui/PageHeader";
import PageLoader from "@/app/components/ui/PageLoader";
import { handleGetById } from "@/app/lib/crudService";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRequireRoles } from "@/app/lib/useRequireRoles";
import { UserResponse } from "../../admin/users/UserTypes";

export default function ProfilePage() {
  useRequireRoles(["Admin", "Manager", "Supervisor", "Crew"]);
  const { user } = useAuth();
  const [userData, setUserData] = useState<UserResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.id) return;
      const data = await handleGetById<UserResponse>(
        `/api/users/${user.id}`,
        "User"
      );
      if (data) setUserData(data);
    };

    fetchData();
  }, [user]);

  if (!userData) return <PageLoader />;

  return (
    <PageContainer>
      <PageHeader title="My Profile" />
      <div
        className={`${uiTheme.colors.card} ${uiTheme.spacing.cardPadding} space-y-6`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className={uiTheme.text.label}>First Name</Label>
            <Input value={userData.firstName} disabled />
          </div>
          <div className="space-y-2">
            <Label className={uiTheme.text.label}>Last Name</Label>
            <Input value={userData.lastName} disabled />
          </div>
          <div className="space-y-2">
            <Label className={uiTheme.text.label}>Email</Label>
            <Input value={userData.email} disabled />
          </div>
          <div className="space-y-2">
            <Label className={uiTheme.text.label}>Role</Label>
            <Input value={userData.roleName} disabled />
          </div>
          <div className="space-y-2">
            <Label className={uiTheme.text.label}>Job Role</Label>
            <Input value={userData.jobRoleName} disabled />
          </div>
          <div className="space-y-2">
            <Label className={uiTheme.text.label}>Job Level</Label>
            <Input value={userData.jobLevelName} disabled />
          </div>
          <div className="space-y-2">
            <Label className={uiTheme.text.label}>Constraint Profile</Label>
            <Input value={userData.constraintProfileName} disabled />
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
