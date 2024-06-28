"use client";
import { Dashboard } from "@/modules/dashboard/components/dashboard";
import { CustomButtonCard } from "@/modules/shared/components/custom-button-card";
import { Aperture, CircleUser, Link, Magnet } from "lucide-react";

export default function page() {
  return (
    <main className={"max-w-[1440px] w-full mx-auto p-8"}>
      <div className="flex items-center gap-8">
        <CustomButtonCard
          icon={CircleUser}
          title="your profile"
          link="master-resume"
        />
        <CustomButtonCard
          icon={Aperture}
          title="your master resume"
          link="profile"
        />
        <CustomButtonCard icon={Link} title="apply jobs" link="apply-jobs" />
      </div>
      {/* <Dashboard /> */}
    </main>
  );
}
