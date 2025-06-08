import { Briefcase, Settings, Users, User, ClipboardList } from "lucide-react";

export const navItems = [
  // UNIVERSAL ACCESS: My Profile + My Dashboard
  {
    label: "My Profile",
    icon: User,
    href: "/features/my/my-profile",
    roles: ["Admin", "Manager", "Supervisor", "Crew"],
  },
  {
    label: "My Dashboard",
    icon: ClipboardList,
    roles: ["Admin", "Manager", "Supervisor", "Crew"],
    children: [
      {
        label: "My Leave",
        href: "/features/my/my-leave",
        roles: ["Admin", "Manager", "Supervisor", "Crew"],
      },
      {
        label: "My Availability",
        href: "/features/my/my-staff-availability",
        roles: ["Admin", "Manager", "Supervisor", "Crew"],
      },

      {
        label: "My Shifts",
        href: "/features/my/my-shift",
        roles: ["Admin", "Manager", "Supervisor", "Crew"],
      },
      {
        label: "My Shift Cover",
        href: "/features/my/my-shift-cover",
        roles: ["Admin", "Manager", "Supervisor", "Crew"],
      },
    ],
  },

  // STAFF SECTION (NO Crew)
  {
    label: "Team Tools",
    icon: Settings,
    roles: ["Admin", "Manager", "Supervisor"],
    children: [
      {
        label: "Staff Availability",
        href: "/features/staff/staff-availability",
        roles: ["Admin", "Manager", "Supervisor"],
      },
      {
        label: "Staffing Requests",
        href: "/features/staff/staffing-requests",
        roles: ["Admin", "Manager", "Supervisor"],
      },
      {
        label: "Staff Leave Applications",
        href: "/features/staff/leave",
        roles: ["Admin", "Manager", "Supervisor"],
      },
    ],
  },

  //ADMIN SECTION
  {
    label: "Users",
    icon: Users,
    href: "/features/admin/users",
    roles: ["Admin"],
  },
  {
    label: "Job Settings",
    icon: Briefcase,
    roles: ["Admin"],
    children: [
      {
        label: "Job Roles",
        href: "/features/admin/job-roles",
        roles: ["Admin"],
      },
      {
        label: "Job Categories",
        href: "/features/admin/job-categories",
        roles: ["Admin"],
      },
      {
        label: "Job Levels",
        href: "/features/admin/job-levels",
        roles: ["Admin"],
      },
      {
        label: "Constraint Profiles",
        href: "/features/admin/constraints",
        roles: ["Admin"],
      },
    ],
  },
  {
    label: "Admin Tools",
    icon: Settings,
    roles: ["Admin"],
    children: [
      {
        label: "Locations",
        href: "/features/admin/locations",
        roles: ["Admin"],
      },
      {
        label: "Leave Requests",
        href: "/features/admin/leave",
        roles: ["Admin"],
      },
      {
        label: "Approved Leaves",
        href: "/features/admin/leave/approved",
        roles: ["Admin"],
      },
      {
        label: "Shift Cover",
        href: "/features/admin/shift-cover",
        roles: ["Admin"],
      },
    ],
  },
];
