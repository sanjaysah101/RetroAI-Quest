export type GameContextType = {
  gameState: GameState;
  log: {
    message: string;
    type: "error" | "info";
  }[];
  addToLog: (message: string) => void;
  changeScene: (newScene: GameScene) => void;
  clearLog: () => void;
  handleTerminalInput: (input: string) => void;
};

export type GameState = {
  currentScene: string;
};

export type GameAction = {
  type: GameActionType;
  payload: string | GameScene;
};

export type GameActionType = "ADD_TO_LOG" | "CHANGE_SCENE";

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

export enum GameActions {
  LOOK = "look",
  INVENTORY = "inventory",
  GO = "go",
  PICKUP = "pickup",
  DROP = "drop",
  USE = "use",
  HELP = "help",
  CLEAR = "clear",
  PLAY = "play",
}
