"use client";

import { GET_USER_BY_CLERK_ID, SET_USER_PLAN } from "@/graphql/user";
import { PriceCard } from "./price-card";
import { useMutation, useSubscription } from "@apollo/client";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";

export const Pricing = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();

  const [updateUserPlan] = useMutation(SET_USER_PLAN);

  const handlePlanClick = async (planName: string) => {
    setIsLoading(true);

    try {
      const { data } = await updateUserPlan({
        variables: {
          _eq: user?.id,
          user_plan: planName,
        },
      });

      console.log(`${planName} Plan selected`, data);
    } catch (error) {
      console.error("Error updating plan:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFreePlanClick = () => handlePlanClick("Free");
  const handleBasicPlanClick = () => handlePlanClick("Basic");
  const handlePremiumPlanClick = () => handlePlanClick("Premium");
  return (
    <div className="py-14">
      <div className="flex items-center justify-center flex-wrap gap-4 mb-2">
        <h1 className="text-6xl font-normal text-center">Pay only for </h1>
        <p className="text-center capitalize font-semibold text-6xl text-transparent bg-clip-text bg-gradient-to-r from-nonPhotoBlue to-federalBlue">
          what you need
        </p>
      </div>
      <div className="text-center mb-4">
        <p className="text-md text-slate-600">
          Simple, transparent pricing that grows with you. Try any plan free for
          30 days.
        </p>
      </div>

      <div className="bg-gray-100 py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mt-10">
            <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-10 lg:grid-cols-3">
              <PriceCard
                title="Free"
                price={0}
                customButtonFn={handleFreePlanClick}
              />
              <PriceCard
                title="Basic"
                price={9.99}
                customButtonFn={handleBasicPlanClick}
              />
              <PriceCard
                title="Premium"
                price={99.9}
                customButtonFn={handlePremiumPlanClick}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
