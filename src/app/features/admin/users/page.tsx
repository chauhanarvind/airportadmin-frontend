"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useForm, FormProvider } from "react-hook-form";

import PageContainer from "@/app/components/layout/PageContainer";
import PageHeader from "@/app/components/ui/PageHeader";
import { Button } from "@/components/ui/button";
import { useRequireRoles } from "@/app/lib/useRequireRoles";
import { uiTheme } from "@/app/lib/uiConfig";
import { handleFetchPaged } from "@/app/lib/crudService";

import UserTable from "./UserTable";
import { UserResponse } from "./UserTypes";
import PaginatedResponse from "../../common/interface";
import UserFilterBar from "./UserFilterBar";

export default function UsersPage() {
  useRequireRoles(["Admin", "Supervisor", "Manager"]);

  const methods = useForm({
    defaultValues: {
      userId: "",
      name: "",
      email: "",
    },
  });

  const { watch } = methods;
  const filters = watch();

  const [users, setUsers] = useState<UserResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const query = new URLSearchParams();

    if (filters.userId) query.append("userId", filters.userId);
    if (filters.name) query.append("name", filters.name);
    if (filters.email) query.append("email", filters.email);
    query.append("page", page.toString());
    query.append("size", "10");

    const result = await handleFetchPaged<PaginatedResponse<UserResponse>>(
      `/users/?${query.toString()}`,
      "Users"
    );

    if (result) {
      setUsers(result.content);
      setTotalPages(result.totalPages);
    }

    setLoading(false);
  }, [filters.userId, filters.name, filters.email, page]);

  useEffect(() => {
    setPage(0); // reset page when filters change
  }, [filters.userId, filters.name, filters.email]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <PageContainer>
      <PageHeader
        title="User Management"
        actions={
          <Link href="/features/admin/users/new">
            <Button className="bg-blue-600 text-white hover:bg-blue-700">
              Add New User
            </Button>
          </Link>
        }
      />

      <FormProvider {...methods}>
        <div
          className={`${uiTheme.colors.card} ${uiTheme.spacing.cardPadding} mb-6`}
        >
          <UserFilterBar />
        </div>
        <div
          className={`${uiTheme.colors.card} ${uiTheme.spacing.cardPadding}`}
        >
          <UserTable
            data={users}
            loading={loading}
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      </FormProvider>
    </PageContainer>
  );
}
