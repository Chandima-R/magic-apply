// pages/api/enhanceEducation.js

import { generateResponse } from "./chatgpt";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { educationData } = req.body;

    if (!educationData) {
      return res.status(400).json({ error: "Education data is required" });
    }

    try {
      // Prepare the message for the ChatGPT API
      const message = {
        jobDescription: "Senior ", // Customize as needed
        masterResume: JSON.stringify(educationData), // Convert education array to string
      };

      // Call the existing generateResponse function with the prompt type for enhancement
      const enhancedData = await generateResponse("resumeEnhancement", message);

      console.log(enhancedData);
      res.status(200).json({ enhancedData });
    } catch (error) {
      console.error("Error contacting ChatGPT:", error);
      res.status(500).json({ error: "Failed to enhance education data" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
