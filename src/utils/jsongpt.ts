export async function generateJsonResponse(promptType: any, message: any) {
  const OPENAI_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

  const promptMap: any = {
    resumeEnhancement: (data: any) => `
      Act as a resume optimization assistant. Use the following user-provided data to create an enhanced and detailed resume suitable for the current year and optimized for ATS. Each section has data relevant to that part of the resume.

      Contact Information:
      ${data.contact ? JSON.stringify(data.contact) : "N/A"}

      Education Information:
      ${data.education ? JSON.stringify(data.education) : "N/A"}

      Certification Information:
      ${data.certification ? JSON.stringify(data.certification) : "N/A"}

      Experience Information:
      ${data.experience ? JSON.stringify(data.experience) : "N/A"}

      Involvement Information:
      ${data.involvement ? JSON.stringify(data.involvement) : "N/A"}

      Project Information:
      ${data.project ? JSON.stringify(data.project) : "N/A"}

      Skills Information:
      ${data.skills ? JSON.stringify(data.skills) : "N/A"}

      Summary Information:
      ${data.summary ? JSON.stringify(data.summary) : "N/A"}

      Please rewrite each section using the user-provided information. Ensure that:
      - Descriptions are specific, quantify achievements where possible.
      - Language is professional, consistent, and ATS-optimized.
      - Each section is represented as a JSON object for easy integration.

      The output should be a single JSON object representing the full enhanced resume.
    `,
  };

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a professional resume assistant." },
        {
          role: "user",
          content: promptMap[promptType](message),
        },
      ],
    }),
  });

  const data = await response.json();
  const generatedJsonResponse = data.choices[0].message.content;

  try {
    return JSON.parse(generatedJsonResponse);
  } catch (error) {
    console.error("Error parsing the JSON response:", error);
    throw new Error("Invalid JSON response format");
  }
}
