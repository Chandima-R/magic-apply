export async function generateResponse(promptType: any, message: any) {
  const OPENAI_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

  // Define prompt templates
  const promptMap: any = {
    initialMatch: `Provide an initial percentage match between the job description and the resume. This should be a clear numerical value. Example Structure: "The initial match between the job description and your resume is approximately X%." Job Description: ${message.jobDescription} Resume: ${message.masterResume}`,
    resumeEnhancement: `Rewrite the experience sections of the resume to achieve a match percentage of over 90%. Use data to describe outcomes wherever possible. If there is insufficient data/numbers, then try to rephrase the sentence to increase the match %. Do not invent data here. Make sure to follow the chronological order used in the existing resume. Ensure that the descriptions are Applicant Tracking System optimized. Resume: ${message.masterResume} Job Description: ${message.jobDescription}`,
    coverLetter: `Compose a cover letter in a straightforward, no-nonsense style. The cover letter should not exceed 300 words. Ensure it is highly readable and not merely a paraphrasing of the resume. Include the candidate's first name, last name, email, and city. Job Description: ${message.jobDescription} Company Description: ${message.companyDescription} Resume: ${message.masterResume} Name: ${message.name}  Email: ${message.email} City: ${message.city}`,
  };

  // Fetch the completion from OpenAI API
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

  // Parse and return the response
  const data = await response.json();
  const generatedResponse = data.choices[0].message.content;

  return generatedResponse;
}
