import { FC, createContext, useState } from "react";

// import { helpArt } from "../assets/asciiArt";
import { GameContextType, GameLogType, GameScene, GameState } from "../types/game";

// Create GameContext
export const GameContext = createContext<GameContextType | undefined>(undefined);

// GameProvider component
export const GameProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gameState, setGameState] = useState<GameState>({
    currentScene: GameScene.INTRO,
  });

  const [log, setLog] = useState<GameLogType[]>([
    {
      message: "<span class='text-white'>Welcome to the game</span><br/><br/>",
      type: "initial",
      command: "",
    },
  ]);

  // Add a new entry to the game log
  const addToLog = (message: string, type: "error" | "info" = "info", command: string) => {
    setLog((prevState) => [...prevState, { message, type, command }]);
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

  // const handleTerminalInput = (input: string) => {
  //   if (Object.values(TerminalActions).includes(input as TerminalActions)) {
  //     if (input.toLowerCase() === TerminalActions.HELP) {
  //       setHistory((prev) => [
  //         ...prev,
  //         { command: input, output: `${helpArt}\nAvailable commands: ${Object.values(TerminalActions).join(", ")}` },
  //       ]);
  //       addToLog(`${helpArt}\nAvailable commands: ${Object.values(TerminalActions).join(", ")}`, "info", input);
  //     } else if (input.toLowerCase() === TerminalActions.CLEAR) {
  //       clearLog();
  //     } else if (input.toLowerCase() === TerminalActions.NEW) {
  //       addToLog("New game started", "info", input);
  //     }
  //   } else {
  //     addToLog(
  //       `<span class="text-red-500">Unknown command: ${input}. For a list of commands, type <span class="text-blue-300">"help"</span></span>`,
  //       "error",
  //       input
  //     );
  //   }
  // };

  const value = {
    gameState,
    log,
    addToLog,
    changeScene,
    clearLog,
    // handleTerminalInput,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
