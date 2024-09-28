import { FC, createContext, useState } from "react";

import { helpArt } from "../assets/asciiArt";
import { GameContextType, GameScene, GameState, TerminalActions } from "../types/game";

// Create GameContext
export const GameContext = createContext<GameContextType | undefined>(undefined);

// GameProvider component
export const GameProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gameState, setGameState] = useState<GameState>({
    currentScene: GameScene.INTRO,
  });

  const [log, setLog] = useState<
    {
      message: string;
      type: "error" | "info";
    }[]
  >([]);

  // Add a new entry to the game log
  const addToLog = (message: string, type: "error" | "info" = "info") => {
    setLog((prevState) => [...prevState, { message, type }]);
  };

  const clearLog = () => {
    setLog([]);
  };

  // Function to change scenes
  const changeScene = (newScene: GameScene) => {
    setGameState((prevState) => ({
      ...prevState,
      currentScene: newScene,
    }));
  };

  const handleTerminalInput = (input: string) => {
    if (Object.values(TerminalActions).includes(input as TerminalActions)) {
      if (input.toLowerCase() === TerminalActions.HELP) {
        addToLog(`${helpArt}\nAvailable commands: ${Object.values(TerminalActions).join(", ")}`);
      } else if (input.toLowerCase() === TerminalActions.CLEAR) {
        clearLog();
      } else if (input.toLowerCase() === TerminalActions.NEW) {
        addToLog("New game started");
      }
    } else {
      addToLog(
        `<span class="text-red-500">Unknown command: ${input}. For a list of commands, type <span class="text-blue-300">"help"</span></span>`,
        "error"
      );
    }
  };

  const value = {
    gameState,
    log,
    addToLog,
    changeScene,
    clearLog,
    handleTerminalInput,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
