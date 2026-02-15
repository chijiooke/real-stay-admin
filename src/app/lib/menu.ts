export type MenuItem = {
  label: string;
  icon: string;
  path?: string;
  color?: string;
  func?: () => void;
};

export const menuItems: { heading: string; menus: MenuItem[] }[] = [
  {
    heading: "General",
    menus: [
      { label: "Dashboard", icon: "hugeicons:dashboard-square-01", path: "/" },
      {
        label: "Users",
        icon: "hugeicons:user-multiple-02",
        path: "/users",
      },
      {
        label: "Properties",
        icon: "lucide-lab:house-roof",
        path: "/properties",
      },
      {
        label: "Bookings",
        icon: "lucide-lab:house-roof",
        path: "/bookings",
      },
      {
        label: "Notifications and Email",
        icon: "solar:notification-unread-lines-linear",
        path: "/notifications",
      },
      {
        label: "Transaction Monitoring",
        icon: "mage:dashboard-bar-notification",
        path: "/transactions",
      },
    ],
  },
  {
    heading: "Admin Utility",
    menus: [
      // {
      //   label: "Roles & Permissions",
      //   icon: "hugeicons:settings-03",
      //   path: "/audit-log",
      // },
      {
        label: "Admin User Mgt.",
        icon: "hugeicons:settings-03",
        path: "/admin-management",
      },
      { label: "Audit logs", icon: "hugeicons:task-01", path: "/audit-logs" },
 
      // {
      //   label: "Roles and Permissions",
      //   icon: "solar:shield-user-linear",
      //   path: "/roles-and-permissions",
      // },
    ],
  },
];
export const userItems: MenuItem[] = [
  {
    label: "My Profile",
    icon: "iconoir:user",
    path: "/profile",
  },
  {
    label: "Log out",
    icon: "akar-icons:door",
    color: "error.light",
    func: () => {
      if (typeof window !== "undefined") {
        localStorage.removeItem("user_id");
        localStorage.removeItem("token");
        window.location.href = "/";
      }
    },
  },
];
