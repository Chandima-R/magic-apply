"use client";

import { Button } from "@/components/ui/button";
import { EDUCATION_INFORMATION_BY_USER_ID } from "@/graphql/education";
import { generateResponse } from "@/utils/chatgpt";
import { useSubscription } from "@apollo/client";
import { useUser } from "@clerk/nextjs";

export default function Page() {
  const { user } = useUser();

  const { data: educationData } = useSubscription(
    EDUCATION_INFORMATION_BY_USER_ID,
    {
      variables: { _eq: user?.id },
    }
  );

  const education = educationData?.education;
  console.log(123, education);

  const enhanceEducationData = async () => {
    if (!education) return;

    // Prepare the message to send to generateResponse
    const message = {
      jobDescription: "Your job description here", // Customize as needed
      masterResume: JSON.stringify(education), // Convert education array to string
    };

    try {
      // Call the generateResponse function with the appropriate prompt type
      const enhancedData = await generateResponse("resumeEnhancement", message);
      console.log("Enhanced Education Data:", enhancedData);

      console.log(421, education);

      // You can now use the enhancedData as needed
    } catch (error) {
      console.error("Error enhancing education data:", error);
    }
  };

  return (
    <div>
      <Button onClick={enhanceEducationData}>Enhance Education Data</Button>
    </div>
  );
}
