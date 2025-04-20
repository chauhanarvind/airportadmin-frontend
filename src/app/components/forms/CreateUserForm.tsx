import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import RoleSelector from "./RoleSelector";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import api from "@/app/lib/api";
import { toast } from "sonner";
import { AxiosError } from "axios";

export default function CreateUserForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roleId, setRoleId] = useState(""); // user role
  const [jobRoleId, setJobRoleId] = useState("");
  const [jobLevelId, setJobLevelId] = useState("");

  const payLoad = {
    firstName,
    lastName,
    password,
    email,
    roleId,
    jobLevelId,
    jobRoleId,
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      console.log(payLoad);
      const res = await api.post("/api/users/create", payLoad);
      console.log(res.data);
      if (res.status == 200) {
        toast.success("User created successfully");
      } else {
        toast.error("Failed to create user");
      }

      console.log(res.data);

      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setJobLevelId("");
      setJobRoleId("");
      setRoleId("");
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;
      let errorMessage = error.message;

      if (error.response?.data.message) {
        errorMessage += `:${error.response.data.message}`;
      }

      console.log("Error creating user : ", error);
      toast.error(errorMessage);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-12 p-6 bg-white rounded-2xl shadow space-y-6 ">
      <h2 className="text-2xl font-semibold text-gray-800">Create New User</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* First Name  */}
        <div className="space-y-1">
          <Label htmlFor="name">First Name</Label>
          <Input
            id="name"
            placeholder="John"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        {/* Last Name */}
        <div className="space-y-1">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            placeholder="Doe"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        {/* Email  */}
        <div className="space-y-1">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            placeholder="example@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Role Drop Down */}
        <RoleSelector
          label="User Role"
          apiUrl="/api/roles/"
          optionKey="name"
          onChange={(value) => setRoleId(value)}
        />

        {/* Job Role Drop Down  */}
        <RoleSelector
          label="Job Role"
          apiUrl="/api/job-roles/"
          optionKey="roleName"
          onChange={(value) => setJobRoleId(value)}
        />

        {/* Job level drop down */}
        <RoleSelector
          label="Job Level"
          apiUrl="/api/job-levels/"
          optionKey="levelName"
          onChange={(value) => setJobLevelId(value)}
        />

        {/* password */}
        <div className="space-y-1">
          <Label htmlFor="password">Set Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Submit Button  */}
        <div>
          <Button type="submit" className="w-full">
            Create User
          </Button>
        </div>
      </form>
    </div>
  );
}
