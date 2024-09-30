import { FC, createContext, useState } from "react";

import { GameStory } from "../constants/game";
import { GameCommands, GameContextType, GameHelpCommands, GameScenes, GameState } from "../types/game";
import { CommandActionCallback, History, TerminalOutputType } from "../types/terminal";
import { checkTerminalCommand, formatHelpCommands } from "../utils";

export const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gameState, setGameState] = useState<GameState>({
    currentScene: GameCommands.INTRO,
    gameHistory: GameScenes[GameCommands.INTRO],
  });
  const [gameAction, setGameAction] = useState<boolean>(true);

  const updateGameState = (arg: GameState) => {
    setGameState((prevState) => ({
      ...prevState,
      ...arg,
    }));
  };

  const help = async (args: CommandActionCallback): Promise<History> => {
    console.log(args);
    return {
      command: "game --help",
      output: formatHelpCommands(Object.values(GameHelpCommands)),
      type: TerminalOutputType.INFO,
      directory: "/",
    };
  };

  const game = async (args: CommandActionCallback): Promise<History> => {
    const {
      directoryInfo: { currentDirectory, isRootDirectory, isHomeDirectory },
      terminalActions,
    } = args;

    if (!isRootDirectory && !isHomeDirectory) {
      throw new Error("You are not in the root directory");
    }

    terminalActions.changeDirectory("cd game");
    setGameAction(false);

    return {
      command: "game",
      output: GameStory.intro.join("\n"),
      type: TerminalOutputType.INFO,
      directory: currentDirectory,
    };
  };

  const gameActionMapper = async (args: CommandActionCallback): Promise<History> => {
    if (checkTerminalCommand(args.command, [GameCommands.GAME])) {
      return game(args);
    }

    if (checkTerminalCommand(args.command, [GameCommands.HELP], true)) {
      return help(args);
    }

    return {
      command: args.command,
      output: "Invalid command",
      type: TerminalOutputType.ERROR,
      directory: args.directoryInfo.currentDirectory,
    };
  };

  const value = {
    gameState,
    updateGameState,
    gameActions: gameActionMapper,
    gameAction,
    setGameAction,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
