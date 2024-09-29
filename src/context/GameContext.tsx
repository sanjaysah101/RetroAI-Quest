import { FC, createContext, useState } from "react";

import { generateGameCredits, generateGameEnd, generateGameIntro, generateStartGame } from "../services/geminiAI";
import { GameCommands, GameContextType, GameHelpCommands, GameScenes, GameState } from "../types/game";
import { History, TerminalOutputType } from "../types/terminal";
import { formatHelpCommands } from "../utils";

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

  const startGame = async (): Promise<History> => {
    const story = await generateStartGame();
    setGameState((prevState) => ({
      ...prevState,
      currentScene: GameCommands.GAME,
    }));
    return {
      command: "game --start",
      output: story.split(".").join(".\n"),
      type: TerminalOutputType.INFO,
    };
  };

  const endGame = async (): Promise<History> => {
    const story = await generateGameEnd();

    setGameState((prevState) => ({
      ...prevState,
      currentScene: GameCommands.END,
    }));
    return {
      command: "game --end",
      output: story.split(".").join(".\n"),
      type: TerminalOutputType.INFO,
    };
  };

  const help = async (): Promise<History> => {
    return {
      command: "game --help",
      output: formatHelpCommands(Object.values(GameHelpCommands)),
      type: TerminalOutputType.INFO,
    };
  };

  const intro = async (): Promise<History> => {
    const story = await generateGameIntro();
    return {
      command: "intro",
      output: story.split(".").join(".\n"),
      type: TerminalOutputType.INFO,
    };
  };

  const game = async (): Promise<History> => {
    return {
      command: "game",
      output: "You enter the game. Please make a decision.",
      type: TerminalOutputType.INFO,
    };
  };

  const credits = async (): Promise<History> => {
    const story = await generateGameCredits();
    return {
      command: "credits",
      output: story.split(".").join(".\n"),
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
      [GameCommands.CREDITS]: credits,
    },
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
