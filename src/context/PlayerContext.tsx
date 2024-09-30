import React, { FC, createContext, useState } from "react";

import { forestArt } from "../assets/asciiArt";
import { GameStory } from "../constants/game";
import { useGame } from "../hooks/useGame";
import { generateAsciiArt, generateNewStoryline } from "../services/geminiAI";
import {
  DragonLairStory,
  EldoriaStory,
  ForestStory,
  PlayerActionsOnCommand,
  PlayerCommands,
  PlayerContextType,
  PlayerGoCommands,
  PlayerState,
} from "../types/player";
import { CommandActionCallback, History, TerminalOutputType } from "../types/terminal";
import { checkTerminalCommand, generateRandomChoices } from "../utils";

export const PlayerContext = createContext<PlayerContextType | null>(null);

export const PlayerProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [playerState, setPlayerState] = useState<PlayerState>({
    location: "starting point",
    playerActions: {} as PlayerActionsOnCommand,
  });

  const { updateGameState, gameState } = useGame();

  const updatePlayerState = (newState: PlayerState[]) => {
    setPlayerState((prevState) => ({
      ...prevState,
      ...newState,
    }));
  };

  const go = async (args: CommandActionCallback): Promise<History> => {
    const {
      directoryInfo: { currentDirectory },
      command,
      terminalActions,
    } = args;

    const path = command.split(" ").pop();
    let output = "";

    if (currentDirectory !== "~/game") {
      return {
        command,
        output: `To run <span class="text-blue-300">"${command}"</span>, you must be in the game.`,
        type: TerminalOutputType.ERROR,
        directory: currentDirectory,
      };
    }

    if (path === PlayerGoCommands.DRAGON_LAIR) {
      const dragonLairStory = generateRandomChoices(Object.values(DragonLairStory));
      const asciiArt = await generateAsciiArt(dragonLairStory);

      terminalActions.changeDirectory(`cd ${PlayerGoCommands.DRAGON_LAIR}`);
      output = GameStory[dragonLairStory as keyof typeof GameStory]?.join("\n") + "\n\n" + asciiArt;
    }

    if (path === PlayerGoCommands.ELDORIA) {
      const eldoriaStory = generateRandomChoices(Object.values(EldoriaStory));
      const asciiArt = await generateAsciiArt(eldoriaStory);

      terminalActions.changeDirectory(`cd ${PlayerGoCommands.ELDORIA}`);
      output = GameStory[eldoriaStory as keyof typeof GameStory]?.join("\n") + "\n\n" + asciiArt;
    }

    if (path === PlayerGoCommands.FOREST) {
      const forestStory = generateRandomChoices(Object.values(ForestStory));

      terminalActions.changeDirectory(`cd ${PlayerGoCommands.FOREST}`);
      output = GameStory[forestStory as keyof typeof GameStory]?.join("\n") + "\n\n" + forestArt;
    }

    if (output === "") {
      return {
        command,
        output: `You must be in the game to perform this action.`,
        type: TerminalOutputType.ERROR,
        directory: currentDirectory,
      };
    }

    setPlayerState((prev) => ({
      ...prev,
      location: `${args.directoryInfo.currentDirectory}/${path}`,
    }));

    const historyEntry = {
      command,
      output,
      type: TerminalOutputType.INFO,
      directory: `${args.directoryInfo.currentDirectory}/${path}`,
    };

    updateGameState({
      gameHistory: [historyEntry],
    });

    return historyEntry;
  };

  const help = async (): Promise<History> => {
    return {
      command: "user --help",
      output: "response",
      type: TerminalOutputType.INFO,
      directory: playerState.location || "",
    };
  };

  const playerActionMapper = async (args: CommandActionCallback): Promise<History> => {
    const {
      directoryInfo: { currentDirectory },
    } = args;

    if (checkTerminalCommand(args.command, [PlayerCommands.GO])) {
      return go(args);
    }

    if (checkTerminalCommand(args.command, [PlayerCommands.HELP], true)) {
      return help();
    }

    console.log({ currentDirectory, l: playerState.location });

    if (currentDirectory !== playerState.location) {
      return {
        command: args.command,
        output: "You must be in the game to perform this action.",
        type: TerminalOutputType.ERROR,
        directory: args.directoryInfo.currentDirectory,
      };
    }

    const newStoryline = await generateNewStoryline(gameState.gameHistory, args.command);
    const asciiArt = await generateAsciiArt(newStoryline.join("\n"));

    return {
      command: args.command,
      output: newStoryline.join("\n") + "\n\n" + asciiArt,
      type: TerminalOutputType.INFO,
      directory: args.directoryInfo.currentDirectory,
    };
  };

  const value = {
    playerState,
    updatePlayerState,
    playerActions: playerActionMapper,
  };

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
};
