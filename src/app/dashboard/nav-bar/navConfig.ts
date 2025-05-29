import { Briefcase, Settings, Users, User } from "lucide-react";

export const navItems = [
  {
    label: "My Profile",
    icon: User,
    roles: ["Admin", "Crew"],
    href: "/dashboard/my-profile",
  },
  {
    label: "Users",
    icon: Users,
    href: "/dashboard/users",
    roles: ["Admin"],
  },
  {
    label: "My Profile",
    icon: Briefcase,
    children: [
      {
        label: "My Leave",
        href: "/dashboard'/my-leave",
        roles: ["Admin", "Manager", "Supervisor", "Crew"],
      },
      {
        label: "My Availability",
        href: "/dashboard/my-staff-availability",

        roles: ["Admin", "Manager", "Supervisor", "Crew"],
      },
      {
        label: "My Staffing Requests",
        href: "/dashboard/my-staffing-requests",

        roles: ["Admin", "Manager", "Supervisor", "Crew"],
      },
      {
        label: "My Shifts",
        href: "/dashboard/my-shift",

        roles: ["Admin", "Manager", "Supervisor", "Crew"],
      },
    ],
  },
  {
    label: "Job Settings",
    icon: Briefcase,
    children: [
      {
        label: "Job Roles",
        href: "/dashboard/job-roles",

        roles: ["Admin", "Manager", "Supervisor"],
      },
      {
        label: "Job Categories",
        href: "/dashboard/job-categories",

        roles: ["Admin", "Manager", "Supervisor"],
      },
      {
        label: "Job Levels",
        href: "/dashboard/job-levels",

        roles: ["Admin", "Manager", "Supervisor"],
      },
      {
        label: "Constraint Profiles",
        href: "/dashboard/constraints",

        roles: ["Admin", "Manager", "Supervisor"],
      },
    ],
  },
  {
    label: "Admin Settings",
    icon: Settings,
    children: [
      {
        label: "Locations",
        href: "/dashboard/locations",

        roles: ["Admin", "Manager", "Supervisor"],
      },
      {
        label: "Leave Requests",
        href: "/dashboard/leave",

        roles: ["Admin", "Manager", "Supervisor"],
      },
      {
        label: "Staff Availability",
        href: "/dashboard/staff-availability",

        roles: ["Admin", "Manager", "Supervisor"],
      },
      {
        label: "Staffing Requests",
        href: "/dashboard/staffing-requests",

        roles: ["Admin", "Manager", "Supervisor"],
      },
    ],
  },
];
