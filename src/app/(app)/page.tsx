'use client'
import { Dashboard } from "@/modules/dashboard/components/dashboard";

export default function page() {
    return (
        <main className={'max-w-[1440px] w-full mx-auto p-8'}>
            <Dashboard />
        </main>
    )
}
