"use client";

import { CustomButtonCard } from "@/modules/shared/components/custom-button-card";
import { useUser } from "@clerk/nextjs";
import { Aperture, CircleUser, Link } from "lucide-react";

export const Dashboard = () => {
  const { user } = useUser();
  return (
    <div>
      <div className="mb-8">
        <p className="capitalize text-2xl font-semibold">
          hello, {user?.fullName} 👋
        </p>
        <p className="text-lg font-semibold">Welcome back!</p>
        <hr />
      </div>

      <div className="flex items-center gap-8 lg:gap-16 flex-col lg:flex-row">
        <CustomButtonCard
          icon={CircleUser}
          title="your profile"
          link="profile"
        />
        <CustomButtonCard
          icon={Aperture}
          title="your master resume"
          link="master-resume"
        />
        <CustomButtonCard icon={Link} title="apply jobs" link="apply-jobs" />
      </div>
    </div>
  );
};
