export type GameContextType = {
  gameState: GameState;
  addToLog: (message: string) => void;
  changeScene: (newScene: GameScene) => void;
};

export type GameState = {
  currentScene: string;
  log: string[];
};

export type GameAction = {
  type: GameActionType;
  payload: string | GameScene;
};

export type GameActionType = 'ADD_TO_LOG' | 'CHANGE_SCENE';

export enum GameScene {
  INTRO = 'intro',
  GAME = 'game',
  END = 'end',
}

export enum BasicActions {
  LOOK = 'look',
  INVENTORY = 'inventory',
  GO = 'go',
  PICKUP = 'pickup',
  DROP = 'drop',
  USE = 'use',
  HELP = 'help',
}
