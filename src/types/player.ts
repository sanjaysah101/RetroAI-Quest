import { Command, CommandActionCallback, History } from "./terminal";

export type PlayerState = {
  location?: string;
  playerActions: PlayerActionsOnCommand;
};

export type PlayerContextType = {
  playerState: PlayerState;
  updatePlayerState: (newState: PlayerState[]) => void;
  playerActions: (args: CommandActionCallback) => Promise<History>;
};

export enum PlayerGoCommands {
  ELDORIA = "eldoria",
  DRAGON_LAIR = "dragon-lair",
  FOREST = "forest",
}

export enum EldoriaStory {
  ELDORIA_A = "eldoria-a",
  ELDORIA_B = "eldoria-b",
}

export enum DragonLairStory {
  DRAGON_LAIR_A = "dragon-lair-a",
  DRAGON_LAIR_B = "dragon-lair-b",
}

export enum ForestStory {
  FOREST_A = "forest-a",
  FOREST_B = "forest-b",
}

export enum Inventory {
  HEALING_HERB = "healing-herb",
  DRAGON_SCALES = "dragon-scales",
  DRAGON_TREASURE = "dragon-treasure",
  DRAGON_VICTORY = "dragon-victory",
}

export enum PlayerCommands {
  GO = "go <path>",
  HELP = "help",
}

export interface PlayerActionsOnCommand {
  [PlayerCommands.GO]: (args: CommandActionCallback) => Promise<History>;
  [PlayerCommands.HELP]: (args: CommandActionCallback) => Promise<History>;
}

export const PlayerHelpCommands: Record<PlayerCommands, Command> = {
  [PlayerCommands.GO]: {
    command: PlayerCommands.GO,
    description: "Go to the direction",
  },
  [PlayerCommands.HELP]: {
    command: PlayerCommands.HELP,
    description: "Help",
  },
};
