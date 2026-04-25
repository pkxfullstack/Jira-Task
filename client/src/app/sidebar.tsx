import DashboardIcon from "@mui/icons-material/Dashboard";
import InsightsIcon from "@mui/icons-material/Insights";
import TaskIcon from "@mui/icons-material/Task";
import type { ElementType } from "react";

export type SidebarItem = {
    label: string;
    path: string;
    icon: ElementType;
};

export const sidebarItems: SidebarItem[] = [
    {
        label: "Dashboard",
        path: "/admin",
        icon: DashboardIcon,
    },
    {
        label: "Tasks",
        path: "/tasks",
        icon: TaskIcon,
    },
    {
        label: "ProcessLog",
        path: "/admin/process",
        icon: InsightsIcon,
    },
];
