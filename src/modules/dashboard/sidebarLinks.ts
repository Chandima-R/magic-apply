import {FileCheck2, FileText, FolderCog, LayoutDashboard} from "lucide-react";

export const sidebarLinks = [
    {
        href: '/',
        label: 'my dashboard',
        icon: LayoutDashboard
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
