import { History, TerminalCommandHelp } from "./terminal";

export type PlayerState = {
  location?: string;
  inventory?: string[];
  decisions?: PlayerDecision[];
  hasSword?: boolean;
  playerActions?: PlayerActionsOnCommand;
  goal?: string;
};

export type PlayerContextType = {
  playerState: PlayerState;
  updatePlayerState: (newState: PlayerState[]) => void;
  makeDecision: (decision: PlayerDecision) => void;
  addItemToInventory: (item: string) => void;
  playerActions: PlayerActionsOnCommand;
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

export enum PlayerCommands {
  LOOK = "look",
  GO = "go",
  PICKUP = "pickup",
  DROP = "drop",
  USE = "use",
  HELP = "user --help",
  INVENTORY = "inventory",
}

export interface PlayerActionsOnCommand {
  look: (item: string[]) => Promise<History>;
  go: (direction: string[]) => Promise<History>;
  pickup: (item: string[]) => Promise<History>;
  drop: (item: string[]) => Promise<History>;
  use: (item: string[]) => Promise<History>;
  "user --help": () => Promise<History>;
  inventory: () => Promise<History>;
}

export const PlayerHelpCommands: Record<PlayerCommands, TerminalCommandHelp> = {
  [PlayerCommands.LOOK]: {
    command: "look",
    description: "Look at the item",
  },
  [PlayerCommands.INVENTORY]: {
    command: "inventory",
    description: "Show the inventory",
  },
  [PlayerCommands.GO]: {
    command: "go",
    description: "Go to the direction",
  },
  [PlayerCommands.PICKUP]: {
    command: "pickup",
    description: "Pickup the item",
  },
  [PlayerCommands.DROP]: {
    command: "drop",
    description: "Drop the item",
  },
  [PlayerCommands.USE]: {
    command: "use",
    description: "Use the item",
  },
  [PlayerCommands.HELP]: {
    command: "user --help",
    description: "Show the User Help",
  },
};
