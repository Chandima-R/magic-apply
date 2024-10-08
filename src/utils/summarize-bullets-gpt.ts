export async function summarizAndBulletGPT(promptType: string, message: any) {
  const OPENAI_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

  const promptMap: any = {
    summarizeAndBulletPoints: `Summarize the following content in a meaninful way and provide it as to five bullet points.here dont use any special characters between words. Ensure the summary is concise and each bullet point highlights a key aspect. Content: ${message.content}`,
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
