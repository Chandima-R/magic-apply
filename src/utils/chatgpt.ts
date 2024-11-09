export async function generateResponse(promptType: any, message: any) {
  const OPENAI_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

  const promptMap: any = {
    // initialMatch: `Provide an initial percentage match between the job description and the resume. This should be a clear numerical value. Example Structure: "The initial match between the job description and your resume is approximately X%." Job Description: ${message.jobDescription} Resume: ${message.masterResume}`,
    resumeEnhancement: `Rewrite the data to achive a enhanced resume which suitable for the current years format. upsacle the data where it needs and Ensure that the descriptions are Applicant Tracking System optimized. Output should be a javascript object.`,
    // coverLetter: `Compose a cover letter in a straightforward, no-nonsense style. The cover letter should not exceed 300 words. Ensure it is highly readable and not merely a paraphrasing of the resume. Include the candidate's first name, last name, email, and city. Job Description: ${message.jobDescription} Company Description: ${message.companyDescription} Resume: ${message.masterResume} Name: ${message.name}  Email: ${message.email} City: ${message.city}`,
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
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: promptMap[promptType] },
      ],
    }),
  });

  const data = await response.json();
  const generatedResponse = data.choices[0].message.content;

  return generatedResponse;
}
