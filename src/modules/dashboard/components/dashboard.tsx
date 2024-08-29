"use client";

import Image from "next/image";
import { CustomButtonCard } from "@/modules/shared/components/custom-button-card";
import { useUser } from "@clerk/nextjs";
import { Aperture, CircleUser, Link } from "lucide-react";
import { useMutation, useSubscription } from "@apollo/client";
import { ADD_USER_BY_CLERK_ID, GET_USER } from "@/graphql/user";
import { useEffect } from "react";

export const Dashboard = () => {
  const { user } = useUser();
  const { data: userData, loading: userLoading } = useSubscription(GET_USER);
  const [addUser] = useMutation(ADD_USER_BY_CLERK_ID);

  useEffect(() => {
    if (user && !userLoading && userData) {
      const userExists = userData?.user?.some(
        (existingUser: any) => existingUser.user_clerk_id === user.id
      );

      if (!userExists) {
        addUser({
          variables: {
            user_clerk_id: user.id,
            user_email: user.emailAddresses[0]?.emailAddress,
            user_firstname: user.firstName,
            user_lastname: user.lastName,
            user_image_url: user.imageUrl,
          },
        });
      }
    }
  }, [user, userData, userLoading, addUser]);

  return (
    <div>
      <div className="mb-8">
        <p className="capitalize text-2xl font-semibold">
          hello, {user && user?.fullName + "👋"}
        </p>
        <p className="text-lg font-semibold">Welcome back!</p>
        <hr />
      </div>

      <div className="flex items-center gap-8 lg:gap-16 flex-col lg:flex-row">
        <CustomButtonCard
          icon={CircleUser}
          title="your profile"
          link="profile/contact"
        />
        <CustomButtonCard
          icon={Aperture}
          title="your master resume"
          link="master-resume"
        />
        <CustomButtonCard icon={Link} title="apply jobs" link="apply-jobs" />
      </div>

      <div>
        <Image
          src={"/images/dashboard-banner.png"}
          alt="dashboard-banner"
          width={1920}
          height={1080}
          className="mt-8 lg:mt-16 w-full h-auto object-cover"
        />
      </div>
    </div>
  );
};
