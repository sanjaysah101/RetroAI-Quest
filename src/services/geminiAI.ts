import { GoogleGenerativeAI } from "@google/generative-ai";

import { PlayerState } from "../types/player";

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

export async function generateDynamicStory(playerState: PlayerState): Promise<string> {
  const prompt = `The player is at ${playerState.location}. They have ${playerState?.inventory?.join(
    ", "
  )} in their inventory. Describe what happens next in the adventure.`;

  const response = await getResponseForGivenPrompt(prompt);
  return response || "No response";
}

export const generateGameIntro = async (): Promise<string> => {
  const prompt = `Generate a short intro for the game.`;
  const response = await getResponseForGivenPrompt(prompt);
  console.log(response);
  return response || "No response";
};
