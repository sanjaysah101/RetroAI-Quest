import React, { FC, createContext, useState } from "react";

import {
  generateAsciiArt,
  generateGo,
  generateNPCInteraction,
  generateNewStoryline,
  generateTreasureDiscovery,
} from "../services/geminiAI";
import {
  PlayerActionsOnCommand,
  PlayerCommands,
  PlayerContextType,
  PlayerDecision,
  PlayerState,
} from "../types/player";
import { History, TerminalOutputType } from "../types/terminal";

export const PlayerContext = createContext<PlayerContextType | null>(null);

// Provide the context to wrap your components
export const PlayerProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [playerState, setPlayerState] = useState<PlayerState>({
    location: "starting point",
    inventory: [] as string[],
    decisions: [] as PlayerDecision[],
    playerActions: {} as PlayerActionsOnCommand,
    hasSword: false,
  });

  const updatePlayerState = (newState: PlayerState[]) => {
    setPlayerState((prevState) => ({
      ...prevState,
      ...newState,
    }));
  };

  const makeDecision = (decision: PlayerDecision) => {
    setPlayerState((prevDecision) => ({
      ...prevDecision,
      decisions: [...(prevDecision.decisions || []), decision],
    }));
  };

  const addItemToInventory = (item: string) => {
    setPlayerState((prevState) => ({
      ...prevState,
      inventory: [...(prevState.inventory || []), item],
    }));
  };

  const look = async (): Promise<History> => {
    const response = await generateNewStoryline(playerState);
    const asciiArt = await generateAsciiArt("player location");

    return {
      command: "look",
      output: response + "\n\n" + asciiArt,
      type: TerminalOutputType.INFO,
    };
  };

  const go = async (direction: string[]): Promise<History> => {
    const response = await generateGo(playerState);
    return {
      command: `go ${direction}`,
      output: response,
      type: TerminalOutputType.INFO,
    };
  };

  const inventory = async (): Promise<History> => {
    const response = await generateTreasureDiscovery(playerState, "sword");
    const asciiArt = await generateAsciiArt("player inventory");

    return {
      command: "inventory",
      output: response + "\n\n" + asciiArt + `\nCurrent inventory: ${playerState.inventory?.join(", ") || "None"}`,
      type: TerminalOutputType.INFO,
    };
  };

  const pickup = async (item: string[]): Promise<History> => {
    updatePlayerState([{ hasSword: true }]);

    return {
      command: "pickup",
      output: `You picked up ${item}`,
      type: TerminalOutputType.INFO,
    };
  };

  const drop = async (item: string[]): Promise<History> => {
    return {
      command: "drop",
      output: `You dropped ${item}`,
      type: TerminalOutputType.INFO,
    };
  };

  const use = async (item: string[]): Promise<History> => {
    console.log(item);
    return {
      command: "use",
      output: `You used ${item}`,
      type: TerminalOutputType.INFO,
    };
  };

  const help = async (): Promise<History> => {
    const response = await generateNPCInteraction("retro", "knight");
    return {
      command: "user --help",
      output: response,
      type: TerminalOutputType.INFO,
    };
  };

  const playerActions: PlayerActionsOnCommand = {
    [PlayerCommands.LOOK]: look,
    [PlayerCommands.INVENTORY]: inventory,
    [PlayerCommands.GO]: go,
    [PlayerCommands.PICKUP]: pickup,
    [PlayerCommands.DROP]: drop,
    [PlayerCommands.USE]: use,
    [PlayerCommands.HELP]: help,
  };

  const value = {
    playerState,
    updatePlayerState,
    makeDecision,
    addItemToInventory,
    playerActions,
  };

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
};
