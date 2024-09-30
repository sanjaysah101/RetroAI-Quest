import { retroAIArt } from "../assets/asciiArt";
import { Command, CommandActionCallback, History, TerminalOutputType } from "./terminal";

export type GameContextType = {
  gameState: GameState;
  changeScene: (newScene: GameCommands) => void;
  gameActions: GameActionsOnCommand;
};

export interface GameActionsOnCommand {
  "game --start": (args: CommandActionCallback) => Promise<History>;
  "game --end": (args: CommandActionCallback) => Promise<History>;
  "game --help": (args: CommandActionCallback) => Promise<History>;
  "game --credits": (args: CommandActionCallback) => Promise<History>;
  intro: (args: CommandActionCallback) => Promise<History>;
  game: (arg: CommandActionCallback) => Promise<History>;
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
  CREDITS = "game --credits",
}

export const GameHelpCommands: Record<GameCommands, Command> = {
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
  [GameCommands.CREDITS]: {
    command: "game --credits",
    description: "Show the game credits",
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
      directory: "/",
    },
  ],
  [GameCommands.GAME]: [
    {
      command: GameCommands.GAME,
      output: ["You are in the game"].join("\n\n"),
      type: TerminalOutputType.INITIAL,
      directory: "/",
    },
  ],
  [GameCommands.START]: [
    {
      command: GameCommands.START,
      output: ["You have started the game"].join("\n\n"),
      type: TerminalOutputType.INITIAL,
      directory: "/",
    },
  ],
  [GameCommands.END]: [
    {
      command: GameCommands.END,
      output: ["You have reached the end of the game"].join("\n\n"),
      type: TerminalOutputType.INITIAL,
      directory: "/",
    },
  ],
  [GameCommands.HELP]: [
    {
      command: GameCommands.HELP,
      output: ["You have reached the end of the game"].join("\n\n"),
      type: TerminalOutputType.INITIAL,
      directory: "/",
    },
  ],
  [GameCommands.CREDITS]: [
    {
      command: GameCommands.CREDITS,
      output: ["You have reached the end of the game"].join("\n\n"),
      type: TerminalOutputType.INITIAL,
      directory: "/",
    },
  ],
};
