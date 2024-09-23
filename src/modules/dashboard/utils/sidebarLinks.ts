import {
  LayoutDashboard,
  AppWindow,
  ScrollText,
  FileText,
  FolderCog,
} from "lucide-react";

export const sidebarLinks = (userPlan: string) => {
  const freeLinks = [
    {
      href: "/",
      label: "my dashboard",
      icon: LayoutDashboard,
    },
    {
      href: "/master-resume",
      label: "master resume",
      icon: ScrollText,
    },
  ];

  const basicLinks = [
    ...freeLinks,

    {
      href: "/apply-jobs",
      label: "apply jobs",
      icon: AppWindow,
    },
  ];

  const premiumLinks = [
    ...basicLinks,
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

  switch (userPlan) {
    case "premium":
      return premiumLinks;
    case "basic":
      return basicLinks;
    case "free":
    default:
      return freeLinks;
  }
};
