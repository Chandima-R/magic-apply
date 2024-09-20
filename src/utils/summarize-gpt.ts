export async function summarizeGPT(promptType: string, message: string) {
  const OPENAI_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

  const promptMap: any = {
    summarizeDesc: `Summarize the following paragraph to be under 200 characters while retaining its essential meaning: ${message}`,
  };

  try {
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

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (!data.choices || data.choices.length === 0) {
      throw new Error("No choices found in the response");
    }

    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error during API request:", error);
    throw error;
  }
}
