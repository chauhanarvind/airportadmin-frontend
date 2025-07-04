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
      const token = res.data?.token;

      if (token) {
        localStorage.setItem("token", token);
        await fetchUser();
        toast.success("Login successful");
        router.push("/features");
      } else {
        throw new Error("Token missing from response");
      }
    } catch {
      toast.error("Invalid email or password");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center px-4 py-12 ${uiTheme.colors.contentBg}`}
    >
      <div className="w-full max-w-2xl space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-4xl font-bold text-blue-700">Airport Admin</h1>
          <p className="text-gray-600 text-sm">
            Staff & Operations Management Portal
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow space-y-5">
          {/* Warning Message */}
          <div className="text-sm text-yellow-800 bg-yellow-100 p-3 rounded-md border border-yellow-300">
            ⚠️ <span className="font-semibold">Note:</span> Due to backend cold
            starts (free-tier hosting), the app may take a few seconds to load
            initially. If you see an “Invalid email or password” error on your
            first attempt, please wait a moment and try again.
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                {...register("password", {
                  required: "Password is required",
                })}
              />
              {errors.password && (
                <p className={uiTheme.form.errorText}>
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={submitting}
              className="w-full bg-blue-600 text-white hover:bg-blue-700 transition font-medium py-2 rounded-md"
            >
              {submitting ? "Logging in..." : "Login"}
            </Button>
          </form>

          {/* Demo Credentials */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              🔐 Demo Login Credentials
            </h2>
            <div className="grid gap-3 text-sm text-gray-700">
              <div className="bg-gray-50 p-3 rounded-md border">
                <span className="font-medium block mb-1">Admin</span>
                <p>
                  Email:{" "}
                  <code className="bg-gray-100 px-1 rounded">
                    systemadmin@airport.com
                  </code>
                </p>
                <p>
                  Password:{" "}
                  <code className="bg-gray-100 px-1 rounded">admin123</code>
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded-md border">
                <span className="font-medium block mb-1">Supervisor</span>
                <p>
                  Email:{" "}
                  <code className="bg-gray-100 px-1 rounded">
                    supervisor@airport.com
                  </code>
                </p>
                <p>
                  Password:{" "}
                  <code className="bg-gray-100 px-1 rounded">
                    supervisor123
                  </code>
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded-md border">
                <span className="font-medium block mb-1">Manager</span>
                <p>
                  Email:{" "}
                  <code className="bg-gray-100 px-1 rounded">
                    manager@airport.com
                  </code>
                </p>
                <p>
                  Password:{" "}
                  <code className="bg-gray-100 px-1 rounded">manager123</code>
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded-md border">
                <span className="font-medium block mb-1">Crew Member</span>
                <p>
                  Email:{" "}
                  <code className="bg-gray-100 px-1 rounded">
                    crew@airport.com
                  </code>
                </p>
                <p>
                  Password:{" "}
                  <code className="bg-gray-100 px-1 rounded">crew123</code>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
