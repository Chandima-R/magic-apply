"use client";

import { Dashboard } from "@/modules/dashboard/components/dashboard";

export default function page() {
  return (
    <main className={"max-w-[1280px] w-full mx-auto p-8 lg:px-0"}>
      <Dashboard />
    </main>
  );
}
