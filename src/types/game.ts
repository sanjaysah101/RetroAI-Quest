import { retroAIArt } from "../assets/asciiArt";
import { Command, CommandActionCallback, History, TerminalOutputType } from "./terminal";

export type GameContextType = {
  gameState: GameState;
  gameAction: boolean;
  updateGameState: (args: GameState) => void;
  gameActions: (args: CommandActionCallback) => Promise<History>;
};

export interface GameActionsOnCommand {
  intro: (args: CommandActionCallback) => Promise<History>;
  game: (arg: CommandActionCallback) => Promise<History>;
}

export type GameState = {
  currentScene?: GameCommands;
  gameHistory: History[];
};

export enum GameCommands {
  INTRO = "intro",
  GAME = "game",
  HELP = "game --help",
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
        `<span class='text-sm'> ${retroAIArt} </span>`,
        "<span class='text-[#B89076]'>Hostname set to </span>" + "<span class='text-blue-300'>retro.ai</span>",
        "<span class='text-[#B89076]'>Username seat to </span>" + "<span class='text-blue-300'>sanjay</span>",
        `<span class="text-[#B89076]">To Play game, type </span> - <span class="text-blue-300">game</span>`,
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
  [GameCommands.HELP]: [
    {
      command: GameCommands.HELP,
      output: ["You have reached the end of the game"].join("\n\n"),
      type: TerminalOutputType.INITIAL,
      directory: "/",
    },
  ],
};
