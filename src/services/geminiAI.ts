import { GoogleGenerativeAI } from "@google/generative-ai";

import { History } from "../types/terminal";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const getResponseForGivenPrompt = async (inputValue: string) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(inputValue);
    const response = result.response;
    const text = response.text();
    return text;
  } catch (error) {
    console.log("Something Went Wrong", error);
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
