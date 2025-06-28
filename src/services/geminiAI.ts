import { GenerateContentResponse, GoogleGenAI } from "@google/genai";

import { History } from "../types/terminal";

// const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export function ensureApiKey(): string {
  if (!API_KEY) {
    console.error("CRITICAL: API_KEY is not configured. This must be set in the environment variables.");
    throw new Error("API_KEY is not configured. Please set the process.env.API_KEY environment variable.");
  }
  return API_KEY;
}

export const getResponseForGivenPrompt = async (prompt: string) => {
  try {
    const currentApiKey = ensureApiKey();
    const ai = new GoogleGenAI({ apiKey: currentApiKey });

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-04-17",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    // Convert markdown to HTML using a simple regex replacement
    let textResponse = response.text;
    if (!textResponse) return "";
    textResponse = textResponse
      .replace(/```[\s\S]*?```/g, (match) => `<pre><code>${match.slice(3, -3)}</code></pre>`) // Code blocks
      .replace(/`([^`]+)`/g, "<code>$1</code>") // Inline code
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>") // Bold
      .replace(/\*([^*]+)\*/g, "<em>$1</em>") // Italic
      .replace(/\n/g, "<br>"); // Line breaks

    return textResponse;
  } catch (error) {
    console.log("Something Went Wrong", error);
    return "<p>An error occurred while processing your request.</p>";
  }
};

export const generateAsciiArt = async (artName: string): Promise<string> => {
  const prompt = `Generate a ASCII art for the ${artName}.`;
  const response = await getResponseForGivenPrompt(prompt);
  return response || "No response";
};

export const generateNewStoryline = async (gameHistory: History[], userCommand: string): Promise<string[]> => {
  const prompt = `You are a creative game master. Given the following context, generate the next part of the story in 5-10 short sentences. Each sentence should be a separate array element.

currentGameHistory: ${gameHistory}
Last action: ${userCommand}

Continue the story based on this information. Introduce a new challenge, discovery, or interaction. Offer 2-3 clear options for the player's next move. Format your response as a JSON array of strings.`;

  const response = await getResponseForGivenPrompt(prompt);

  try {
    const parsedResponse = JSON.parse(response || "[]");
    return Array.isArray(parsedResponse) ? parsedResponse : [];
  } catch (error) {
    console.error("Failed to parse AI response:", error);
    return ["An unexpected error occurred in your journey."];
  }
};

// ... rest of the existing code ...
