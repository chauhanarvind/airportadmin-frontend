import { Briefcase, Settings, Users, User } from "lucide-react";

export const navItems = [
  {
    label: "My Profile",
    icon: User,
    roles: ["Admin", "Crew"],
    href: "/features/staff/my-profile",
  },
  {
    label: "Users",
    icon: Users,
    href: "/features/admin/users",
    roles: ["Admin"],
  },
  {
    label: "My Profile",
    icon: Briefcase,
    children: [
      {
        label: "My Leave",
        href: "/features/staff/my-leave",
        roles: ["Admin", "Manager", "Supervisor", "Crew"],
      },
      {
        label: "My Availability",
        href: "/features/staff/my-staff-availability",

        roles: ["Admin", "Manager", "Supervisor", "Crew"],
      },
      {
        label: "My Staffing Requests",
        href: "/features/staff/my-staffing-requests",

        roles: ["Admin", "Manager", "Supervisor", "Crew"],
      },
      {
        label: "My Shifts",
        href: "/features/staff/my-shift",

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
        href: "/features/admin/job-roles",

        roles: ["Admin", "Manager", "Supervisor"],
      },
      {
        label: "Job Categories",
        href: "/features/admin/job-categories",

        roles: ["Admin", "Manager", "Supervisor"],
      },
      {
        label: "Job Levels",
        href: "/features/admin/job-levels",

        roles: ["Admin", "Manager", "Supervisor"],
      },
      {
        label: "Constraint Profiles",
        href: "/features/admin/constraints",

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
        href: "/features/locations",

        roles: ["Admin", "Manager", "Supervisor"],
      },
      {
        label: "Leave Requests",
        href: "/features/leave",

        roles: ["Admin", "Manager", "Supervisor"],
      },
      {
        label: "Staff Availability",
        href: "/features/staff-availability",

        roles: ["Admin", "Manager", "Supervisor"],
      },
      {
        label: "Staffing Requests",
        href: "/features/staffing-requests",

        roles: ["Admin", "Manager", "Supervisor"],
      },
    ],
  },
];
