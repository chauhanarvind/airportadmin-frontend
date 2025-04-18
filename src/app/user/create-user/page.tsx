"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import RoleSelector from "@/app/components/forms/RoleSelector";

export default function CreateUserForm() {
  return (
    <div className="max-w-xl mx-auto mt-12 p-6 bg-white rounded-2xl shadow space-y-6 ">
      <h2 className="text-2xl font-semibold text-gray-800">Create New User</h2>
      <form className="space-y-4">
        {/* First Name  */}
        <div className="space-y-1">
          <Label htmlFor="name">First Name</Label>
          <Input id="name" placeholder="John" />
        </div>

        {/* Last Name */}
        <div className="space-y-1">
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" placeholder="Doe" />
        </div>

        {/* Email  */}
        <div className="space-y-1">
          <Label htmlFor="email">Email</Label>
          <Input id="email" placeholder="example@example.com" />
        </div>

        {/* Role Drop Down */}
        <RoleSelector
          label="User Role"
          apiUrl="http://localhost:8080/api/roles/"
          optionKey="name"
        />

        {/* Job Role Drop Down  */}
        <RoleSelector
          label="Job Role"
          apiUrl="http://localhost:8080/api/job-roles/"
          optionKey="roleName"
        />

        {/* password */}
        <div className="space-y-1">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" placeholder="Password" />
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
