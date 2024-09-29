import { retroAIArt } from "../assets/asciiArt";
import { History, TerminalCommandHelp, TerminalOutputType } from "./terminal";

export type GameContextType = {
  gameState: GameState;
  changeScene: (newScene: GameCommands) => void;
  gameActions: GameActionsOnCommand;
};

export interface GameActionsOnCommand {
  "game --start": () => History;
  "game --end": () => History;
  "game --help": () => History;
  intro: () => Promise<History>;
  game: () => History;
}

export type GameState = {
  currentScene: GameCommands;
  gameHistory: History[];
};

export enum GameCommands {
  INTRO = "intro",
  GAME = "game",
  START = "game --start",
  END = "game --end",
  HELP = "game --help",
}

export const GameHelpCommands: Record<GameCommands, TerminalCommandHelp> = {
  [GameCommands.INTRO]: {
    command: "intro",
    description: "Show the intro scene",
  },
  [GameCommands.GAME]: {
    command: "game",
    description: "Show the game scene",
  },
  [GameCommands.START]: {
    command: "game --start",
    description: "Start the game",
  },
  [GameCommands.END]: {
    command: "game --end",
    description: "End the game",
  },
  [GameCommands.HELP]: {
    command: "game --help",
    description: "Show the game help menu",
  },
};

export const GameScenes: Record<GameCommands, History[]> = {
  [GameCommands.INTRO]: [
    {
      command: "IntroScene",
      output: [
        `Welcome to the game`,
        retroAIArt,
        "<span class='text-[#B89076]'>Hostname set to </span>" + "<span class='text-blue-300'>retro.ai</span>",
        "<span class='text-[#B89076]'>Username seat to </span>" + "<span class='text-blue-300'>sanjay</span>",
        `<span class="text-[#B89076]">For a list of available commands, type </span> - <span class="text-blue-300">help</span>`,
      ].join("\n\n"),
      type: TerminalOutputType.INITIAL,
    },
  ],
  [GameCommands.GAME]: [
    {
      command: GameCommands.GAME,
      output: ["You are in the game"].join("\n\n"),
      type: TerminalOutputType.INITIAL,
    },
  ],
  [GameCommands.START]: [
    {
      command: GameCommands.START,
      output: ["You have started the game"].join("\n\n"),
      type: TerminalOutputType.INITIAL,
    },
  ],
  [GameCommands.END]: [
    {
      command: GameCommands.END,
      output: ["You have reached the end of the game"].join("\n\n"),
      type: TerminalOutputType.INITIAL,
    },
  ],
  [GameCommands.HELP]: [
    {
      command: GameCommands.HELP,
      output: ["You have reached the end of the game"].join("\n\n"),
      type: TerminalOutputType.INITIAL,
    },
  ],
};
