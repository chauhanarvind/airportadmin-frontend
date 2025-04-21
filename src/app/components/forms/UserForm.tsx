import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import RoleSelector from "./RoleSelector";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export type UserFormData = {
  id?: number; //used only for edit
  firstName: string;
  lastName: string;
  email: string;
  roleId: number | null;
  jobLevelId: number | null;
  jobRoleId: number | null;
  password?: string; // only used for create
};

interface UserFormProps {
  initialData?: Partial<Omit<UserFormData, "password">>; //data passed when in edit mode
  onSubmit: (data: UserFormData) => void;
  isEditMode?: boolean;
  submitText?: string;
}

export default function UserForm({
  initialData = {},
  onSubmit,
  isEditMode = false,
  submitText = "Submit",
}: UserFormProps) {
  const [firstName, setFirstName] = useState(initialData.firstName || "");
  const [lastName, setLastName] = useState(initialData.lastName || "");
  const [email, setEmail] = useState(initialData.email || "");
  const [password, setPassword] = useState("");
  const [roleId, setRoleId] = useState<number | null>(
    initialData.roleId || null
  ); // user role
  const [jobRoleId, setJobRoleId] = useState<number | null>(
    initialData.jobRoleId || null
  );
  const [jobLevelId, setJobLevelId] = useState<number | null>(
    initialData.jobLevelId || null
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !firstName ||
      !lastName ||
      !email ||
      !roleId ||
      jobLevelId ||
      jobRoleId
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    if (!isEditMode && !!password) {
      toast.error("Please set a password");
      return;
    }

    const payLoad: UserFormData = {
      firstName,
      lastName,
      password,
      email,
      roleId,
      jobLevelId,
      jobRoleId,
      ...(isEditMode ? {} : { password }),
      ...(initialData?.id ? { id: initialData.id } : {}), // pass id during edit
    };

    onSubmit(payLoad);
  };

  useEffect(() => {
    setFirstName(initialData.firstName || "");
    setLastName(initialData.lastName || "");
    setEmail(initialData.email || "");
    setRoleId(initialData.roleId || null);
    setJobRoleId(initialData.jobRoleId || null);
    setJobLevelId(initialData.jobLevelId || null);
    setPassword("");

    console.log(initialData.jobRoleId);
  }, [initialData]);

  return (
    <div className="w-full p-4 bg-white rounded-2xl shadow space-y-6 ">
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
          onChange={(value) => setRoleId(Number(value))}
          value={roleId?.toString()}
        />

        {/* Job Role Drop Down  */}
        <RoleSelector
          label="Job Role"
          apiUrl="/api/job-roles/"
          optionKey="roleName"
          onChange={(value) => setJobRoleId(Number(value))}
          value={jobRoleId?.toString()}
        />

        {/* Job level drop down */}
        <RoleSelector
          label="Job Level"
          apiUrl="/api/job-levels/"
          optionKey="levelName"
          onChange={(value) => setJobLevelId(Number(value))}
          value={jobRoleId?.toString()}
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
            {submitText}
          </Button>
        </div>
      </form>
    </div>
  );
}
