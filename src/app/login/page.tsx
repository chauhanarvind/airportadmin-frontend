"use client";

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import api from "../lib/api";
import { useAuth } from "../components/AuthProvider";

type LoginFormInputs = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const { user, loading, fetchUser } = useAuth();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  // If already logged in, redirect to /features
  useEffect(() => {
    if (!loading && user) {
      router.push("/features");
    }
  }, [user, loading, router]);

  const onSubmit = async (data: LoginFormInputs) => {
    setSubmitting(true);

    try {
      await api.post("/api/auth/login", data);
      toast.success("Login successful");

      // Manually refresh user context
      await fetchUser();

      router.push("/features");
    } catch (err) {
      toast.error("Invalid email or password");
      console.error("Login error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white p-6 rounded-xl shadow space-y-4"
      >
        <h1 className="text-2xl font-semibold text-center">Admin Login</h1>

        <div className="space-y-1">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={submitting}>
          {submitting ? "Logging in..." : "Login"}
        </Button>
      </form>
    </div>
  );
}
