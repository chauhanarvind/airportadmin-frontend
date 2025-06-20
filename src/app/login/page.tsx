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
import { uiTheme } from "@/app/lib/uiConfig";

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

  useEffect(() => {
    if (!loading && user) {
      router.push("/features");
    }
  }, [user, loading, router]);

  const onSubmit = async (data: LoginFormInputs) => {
    setSubmitting(true);
    try {
      const res = await api.post("/auth/login", data);

      // Save JWT to localStorage
      const token = res.data?.token;
      if (token) {
        localStorage.setItem("token", token);

        await fetchUser();
        toast.success("Login successful");
        router.push("/features");
      } else {
        throw new Error("Token missing from response");
      }
    } catch (err) {
      toast.error("Invalid email or password");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center space-y-8 px-4 ${uiTheme.colors.contentBg}`}
    >
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-700">Airport Admin</h1>
        <p className="text-gray-600 text-sm mt-1">
          Staff & Operations Management Portal
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white p-6 rounded-xl shadow-md space-y-4"
      >
        <h2 className="text-xl font-semibold text-center text-gray-800">
          Login
        </h2>

        <div className="space-y-1">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className={uiTheme.form.errorText}>{errors.email.message}</p>
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
            <p className={uiTheme.form.errorText}>{errors.password.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={submitting}>
          {submitting ? "Logging in..." : "Login"}
        </Button>
      </form>
    </div>
  );
}
