import { Briefcase, Settings, Users } from "lucide-react";

export const navItems = [
  {
    label: "Users",
    icon: Users,
    href: "/dashboard/users",
    roles: ["Admin"],
  },
  {
    label: "Job Settings",
    icon: Briefcase,
    children: [
      { label: "Job Roles", href: "/dashboard/job-roles", roles: ["Admin"] },
      {
        label: "Job Categories",
        href: "/dashboard/job-categories",
        roles: ["Admin"],
      },
      { label: "Job Levels", href: "/dashboard/job-levels", roles: ["Admin"] },
      {
        label: "Constraint Profiles",
        href: "/dashboard/constraints",
        roles: ["Admin"],
      },
      {
        label: "My Leave",
        href: "/dashboard/my-leave",
        roles: ["Admin", "Crew"],
      },
      {
        label: "My Availability",
        href: "/dashboard/my-staff-availability",
        roles: ["Admin", "Crew"],
      },
    ],
  },
  {
    label: "Admin Settings",
    icon: Settings,
    children: [
      { label: "User Roles", href: "/dashboard/roles", roles: ["Admin"] },
      {
        label: "Locations",
        href: "/dashboard/locations",
        roles: ["Admin", "Manager"],
      },
      {
        label: "Leave Requests",
        href: "/dashboard/leave",
        roles: ["Admin"],
      },
      {
        label: "Staff Availability",
        href: "/dashboard/staff-availability",
        roles: ["Admin"],
      },
    ],
  },
];
