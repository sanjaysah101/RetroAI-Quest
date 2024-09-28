import { History } from "./terminal";

export type PlayerState = {
  location: string;
  inventory: string[];
  decisions: PlayerDecision[];
  hasSword: boolean;
  playerActions: PlayerActions;
};

export type PlayerContextType = {
  playerState: PlayerState;
  updatePlayerState: (newState: PlayerState[]) => void;
  makeDecision: (decision: PlayerDecision) => void;
  addItemToInventory: (item: string) => void;
  playerActions: PlayerActions;
};

export type PlayerDecision = {
  type: string;
  description: string;
  consequences: string[];
};

export const PlayerDecisions: Record<string, PlayerDecision> = {
  PLAY: {
    type: "PLAY",
    description: "Start the game",
    consequences: ["Begin adventure", "Initialize player state"],
  },
  EXPLORE: {
    type: "EXPLORE",
    description: "Explore the current location",
    consequences: ["Discover new items", "Encounter challenges"],
  },
  REST: {
    type: "REST",
    description: "Take a rest to recover",
    consequences: ["Restore health", "Pass time"],
  },
};

export interface PlayerActions {
  // [key: string]: (arg: string[]) => History;
  look: (item: string[]) => History;
  go: (direction: string[]) => History;
  pickup: (item: string[]) => History;
  drop: (item: string[]) => History;
  use: (item: string[]) => History;
  clear: () => History;
  help: () => History;
  inventory: () => History;
}
