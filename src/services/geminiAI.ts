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

/** This prompt can be used when the player first starts the game. It sets the tone and introduces the game world. */
export const generateGameIntro = async (): Promise<string> => {
  const prompt = `You are about to enter a world unlike any other. The player stands at the edge of a vast, mysterious land called [GAME_WORLD_NAME]. Describe the beginning of their journey and introduce the key elements of the game world. Explain the player's role and the challenges they will face in this adventure.`;
  const response = await getResponseForGivenPrompt(prompt);
  return response || "No response";
};

export const generateStartGame = async (): Promise<string> => {
  const prompt = `The player starts the game.`;
  const response = await getResponseForGivenPrompt(prompt);
  return response || "No response";
};

export const generateGameCredits = async (): Promise<string> => {
  const prompt = `The player has completed the game.`;
  const response = await getResponseForGivenPrompt(prompt);
  return response || "No response";
};

export const generateGameEnd = async (): Promise<string> => {
  const prompt = `The player has completed the game.`;
  const response = await getResponseForGivenPrompt(prompt);
  return response || "No response";
};

/** This prompt can be used to generate a new storyline for the player based on their current status and inventory. */
export const generateNewStoryline = async (playerState: PlayerState): Promise<string> => {
  const prompt = `The player is at ${playerState.location}, holding the following items: ${playerState?.inventory?.join(", ")}. They are on a quest to ${playerState.goal}. Describe what happens next in their adventure. Introduce a new twist or challenge that they must overcome, based on the items they carry and their location.`;
  const response = await getResponseForGivenPrompt(prompt);
  return response || "No response";
};

export const generateGo = async (playerState: PlayerState): Promise<string> => {
  const prompt = `The player is at ${playerState.location}. They have ${playerState?.inventory?.join(
    ", "
  )} in their inventory. Describe what happens next in the adventure.`;
  const response = await getResponseForGivenPrompt(prompt);
  return response || "No response";
};

/** This prompt can be used when the player explores a new area. */
export const generateExplorationScenario = async (playerState: PlayerState): Promise<string> => {
  const prompt = `The player is exploring the ${playerState.location}. They notice several interesting features around them. Describe the surroundings, including any hidden paths, items, or NPCs they encounter. What unexpected events or discoveries might the player find here?`;
  const response = await getResponseForGivenPrompt(prompt);
  return response || "No response";
};

/** This prompt generates a scenario where the player encounters an enemy. */
export const generateEnemyEncounter = async (playerState: PlayerState, enemyType: string): Promise<string> => {
  const prompt = `The player comes across a fearsome enemy, ${enemyType}, lurking in ${playerState.location}. They must decide whether to fight or flee. Describe the enemy and the battle scenario. How does the player’s inventory and skills affect their chances in the battle? Offer the player a choice or strategy for overcoming the enemy.`;
  const response = await getResponseForGivenPrompt(prompt);
  return response || "No response";
};

/** This prompt generates a new puzzle that the player must solve. */
export const generatePuzzleEncounter = async (playerState: PlayerState): Promise<string> => {
  const prompt = `The player stumbles upon a mysterious puzzle in ${playerState.location}. They must solve it to progress. Describe the puzzle and how it fits into the game's storyline. Offer clues based on the items in the player’s inventory. What happens if the player succeeds or fails?`;
  const response = await getResponseForGivenPrompt(prompt);
  return response || "No response";
};

/** This prompt generates an interaction with a non-player character (NPC). */
export const generateNPCInteraction = async (npcName: string, npcTrait: string): Promise<string> => {
  const prompt = `The player encounters ${npcName}, a character known for ${npcTrait}. The NPC approaches the player with an offer or request. Describe the NPC's appearance, personality, and what they ask of the player. How does the player’s previous actions or inventory influence this interaction?`;
  const response = await getResponseForGivenPrompt(prompt);
  return response || "No response";
};

/** This prompt generates a description when the player finds treasure. */
export const generateTreasureDiscovery = async (playerState: PlayerState, treasureName: string): Promise<string> => {
  const prompt = `The player discovers a hidden chest in ${playerState.location}. Inside, they find a rare treasure: ${treasureName}. Describe the treasure in detail, its history, and how it might help the player in their quest. What dangers might come with this new discovery?`;
  const response = await getResponseForGivenPrompt(prompt);
  return response || "No response";
};

export const generateAsciiArt = async (artName: string): Promise<string> => {
  const prompt = `Generate a ASCII art for the ${artName}.`;
  const response = await getResponseForGivenPrompt(prompt);
  return response || "No response";
};

/** This prompt generates a game over or restart scenario. */
export const generateGameOverScenario = async (playerState: PlayerState, numberOfAttempts: number): Promise<string> => {
  const prompt = `The player has reached the end of their journey in ${playerState.location}. After ${numberOfAttempts} attempts, their quest comes to an end. Reflect on the player’s decisions, the challenges they faced, and what led to their downfall or success. Offer them a chance to restart the game with a fresh perspective.`;
  const response = await getResponseForGivenPrompt(prompt);
  return response || "No response";
};

/** This prompt generates a backstory for the player's character. */
export const generateCharacterBackstory = async (playerState: PlayerState, homeland: string): Promise<string> => {
  const prompt = `The player hails from ${homeland}, a land known for [TRAIT]. Based on the player’s actions so far, craft a unique backstory that explains their motivation, past experiences, and personal challenges. How do these past events affect their current journey in ${playerState.location}?`;
  const response = await getResponseForGivenPrompt(prompt);
  return response || "No response";
};

/** This prompt generates a mystical event or prophecy in the game. */
export const generateMysticalEvent = async (playerState: PlayerState): Promise<string> => {
  const prompt = `A strange and mystical event unfolds in ${playerState.location}. The sky darkens, and a mysterious figure appears, delivering a prophecy that the player must heed. Describe the event in vivid detail, the figure’s message, and how it changes the player’s path moving forward.`;
  const response = await getResponseForGivenPrompt(prompt);
  return response || "No response";
};
