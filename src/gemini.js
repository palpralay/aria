import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY; // use .env
const genAI = new GoogleGenerativeAI(apiKey);

async function run(prompt) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 50,
    };

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig,
    });

    let response = result.response.text().replace(/\*\*/g, ""); // cleaned response
    return response;
  } catch (error) {
    console.error("Error:", error);
    return "Sorry, I couldn't process that request.";
  }
}

export default run;
