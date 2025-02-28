import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST() {
  try {
    const prompt =
      "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'.";

    const result = await openai.chat.completions.create({
      model: "gpt-4o", // Change to "gpt-3.5-turbo" if needed
      messages: [{ role: "user", content: prompt }],
      max_tokens: 400,
    });

    return new Response(result.choices[0].message.content);
  } catch (error) {
    console.error("OpenAI API Error:", error);
    return new Response("Error processing request", { status: 500 });
  }
}
