import { FileText, FolderCog, LayoutDashboard, AppWindow } from "lucide-react";

export const sidebarLinks = [
  {
    href: "/",
    label: "my dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/apply-jobs",
    label: "apply jobs",
    icon: AppWindow,
  },
  {
    href: "/sample-library",
    label: "sample library",
    icon: FileText,
  },
  {
    href: "/ai-interview",
    label: "AI interview",
    icon: FolderCog,
  },
];
