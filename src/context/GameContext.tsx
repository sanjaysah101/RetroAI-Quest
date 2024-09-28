import { FC, createContext, useState } from "react";

import { GameCommands, GameContextType, GameScenes, GameState } from "../types/game";
import { History, TerminalOutputType } from "../types/terminal";

// Create GameContext
export const GameContext = createContext<GameContextType | undefined>(undefined);

// GameProvider component
export const GameProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gameState, setGameState] = useState<GameState>({
    currentScene: GameCommands.INTRO,
    gameHistory: GameScenes[GameCommands.INTRO],
  });

  // Function to change scenes
  const changeScene = (newScene: GameCommands) => {
    setGameState((prevState) => ({
      ...prevState,
      currentScene: newScene,
    }));
  };

  const startGame = (): History => {
    setGameState((prevState) => ({
      ...prevState,
      currentScene: GameCommands.GAME,
    }));
    return {
      command: "game --start",
      output: "You start the game",
      type: TerminalOutputType.INFO,
    };
  };

  const endGame = () => {
    setGameState((prevState) => ({
      ...prevState,
      currentScene: GameCommands.END,
    }));
    return {
      command: "game --end",
      output: "You end the game",
      type: TerminalOutputType.INFO,
    };
  };

  const help = (): History => {
    console.log("help");
    return {
      command: "game --help",
      output: "You get help",
      type: TerminalOutputType.INFO,
    };
  };

  const intro = (): History => {
    return {
      command: "intro",
      output: "You see the intro",
      type: TerminalOutputType.INFO,
    };
  };

  const game = (): History => {
    return {
      command: "game",
      output: "You see the game",
      type: TerminalOutputType.INFO,
    };
  };

  const value = {
    gameState,
    changeScene,
    gameActions: {
      [GameCommands.HELP]: help,
      [GameCommands.START]: startGame,
      [GameCommands.END]: endGame,
      [GameCommands.INTRO]: intro,
      [GameCommands.GAME]: game,
    },
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
