import { FileCheck2, FileText, FolderCog, LayoutDashboard, AppWindow } from "lucide-react";

export const sidebarLinks = [
    {
        href: '/',
        label: 'my dashboard',
        icon: LayoutDashboard
    },
    {
        href: '/apply-jobs',
        label: 'apply jobs',
        icon: AppWindow
    },
    {
        href: '/sample-library',
        label: 'sample library',
        icon: FileText
    },
    {
        href: '/review-my-resume',
        label: 'review my resume',
        icon: FileCheck2
    },
    {
        href: '/ai-interview',
        label: 'ai interview',
        icon: FolderCog
    }
]
