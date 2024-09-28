import { createContext, FC, useState } from 'react';
import { GameContextType, GameScene, GameState } from '../types/game';

// Create GameContext
export const GameContext = createContext<GameContextType | undefined>(
  undefined
);

// GameProvider component
export const GameProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [gameState, setGameState] = useState<GameState>({
    currentScene: GameScene.INTRO,
    log: [],
  });

  // Add a new entry to the game log
  const addToLog = (message: string) => {
    setGameState((prevState) => ({
      ...prevState,
      log: [...prevState.log, message],
    }));
  };

  // Function to change scenes
  const changeScene = (newScene: GameScene) => {
    setGameState((prevState) => ({
      ...prevState,
      currentScene: newScene,
    }));
  };

  const value = {
    gameState,
    addToLog,
    changeScene,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
