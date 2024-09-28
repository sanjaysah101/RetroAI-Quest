import { retroAIArt } from "../assets/asciiArt";
import { History, TerminalOutputType } from "./terminal";

export type GameLogType = {
  message: string;
  type: "error" | "info" | "initial";
  command: string;
};

export type GameContextType = {
  gameState: GameState;
  log: GameLogType[];
  addToLog: (message: string, type: "error" | "info", command: string) => void;
  changeScene: (newScene: GameScene) => void;
  clearLog: () => void;
  // handleTerminalInput: (input: string) => void;
};

export type GameState = {
  currentScene: GameScene;
};

export enum GameScene {
  INTRO = "intro",
  GAME = "game",
  END = "end",
}

export enum TerminalActions {
  HELP = "help",
  CLEAR = "clear",
  NEW = "new",
}

export const GameSceneMap: Record<GameScene, { description: string; commands: string[] }> = {
  [GameScene.INTRO]: {
    description: "Welcome to the game",
    commands: [TerminalActions.NEW, TerminalActions.HELP, TerminalActions.CLEAR],
  },
  [GameScene.GAME]: {
    description: "Game scene",
    commands: [TerminalActions.NEW, TerminalActions.HELP, TerminalActions.CLEAR],
  },
  [GameScene.END]: {
    description: "End scene",
    commands: [TerminalActions.NEW, TerminalActions.HELP, TerminalActions.CLEAR],
  },
};

export const IntroScene: History[] = [
  {
    command: "IntroScene",
    output: [
      "Welcome to the game<span>${retroAIArt}<span><br/>",
      "<span class='text-[#B89076]'>Hostname set to </span>" + "<span class='text-blue-300'>retro.ai</span>",
      "<span class='text-[#B89076]'>Username set to </span>" + "<span class='text-blue-300'>sanjay</span>",
      "<span class='text-[#B89076]'>New game started </span>",
      `<span class="text-[#B89076]">For a list of available commands, type </span> - <span class="text-blue-300">help</span>`,
    ].join("\n\n"),
    type: TerminalOutputType.INITIAL,
  },
];

// "<span class='text-blue-300'>help</span>.",
