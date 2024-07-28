const OPENAI_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

export async function generateResponse(message: string) {
    const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${OPENAI_KEY}`,
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "system", content: "You are a helpful assistant." },
                    { role: "user", content: message },
                ],
            }),
        }
    );

    const data = await response.json();
    const generatedResponse = data.choices[0].message.content;
    console.log(65, generatedResponse)
    try {
        const parsedResponse = JSON.parse(generatedResponse);
        return parsedResponse;
    } catch (error) {
        throw new Error("Failed to parse response as JSON");
    }
}
