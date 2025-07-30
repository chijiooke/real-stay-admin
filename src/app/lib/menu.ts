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
        label: "Notifications and Email",
        icon: "solar:notification-unread-lines-linear",
        path: "/notifications",
      },
      {
        label: "Reports and Analytics",
        icon: "mage:dashboard-bar-notification",
        path: "/reports",
      },
      {
        label: "Settings",
        icon: "hugeicons:settings-03",
        path: "/settings",
      },
    ],
  },
  {
    heading: "Admin Utility",
    menus: [
      { label: "Audit logs", icon: "hugeicons:task-01", path: "/audit-log" },
      {
        label: "Roles and Permissions",
        icon: "solar:shield-user-linear",
        path: "/roles-and-permissions",
      },
    ],
  },
];
export const userItems: MenuItem[] = [
  {
    label: "Account",
    icon: "iconoir:user",
    path: "/users",
  },
  {
    label: "Log out",
    icon: "akar-icons:door",
    color:"error.light",
    func: () => {
      if (typeof window !== "undefined") {
        localStorage.removeItem("user_id");
        localStorage.removeItem("token");
        window.location.href = "/";
      }
    },
  },
];
