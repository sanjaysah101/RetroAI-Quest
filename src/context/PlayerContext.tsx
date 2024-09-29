import React, { FC, createContext, useState } from "react";

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

  const look = (item: string[]): History => {
    return {
      command: "look",
      output: `You look at the ${item}`,
      type: TerminalOutputType.INFO,
    };
  };

  const go = (direction: string[]): History => {
    console.log(direction)
    return {
      command: `go ${direction}`,
      output: `You go to the ${direction}`,
      type: TerminalOutputType.INFO,
    };
  };

  const inventory = (): History => {
    return {
      command: "inventory",
      output: `Current inventory: ${playerState.inventory?.join(", ") || "None"}`,
      type: TerminalOutputType.INFO,
    };
  };
  const pickup = (item: string[]): History => {
    if (item[0] === "sword") {
      updatePlayerState([{ hasSword: true }]);
    }
    return {
      command: "pickup",
      output: `You picked up ${item}`,
      type: TerminalOutputType.INFO,
    };
  };

  const drop = (item: string[]): History => {
    return {
      command: "drop",
      output: `You dropped ${item}`,
      type: TerminalOutputType.INFO,
    };
  };

  const use = (item: string[]): History => {
    console.log(item);
    return {
      command: "use",
      output: `You used ${item}`,
      type: TerminalOutputType.INFO,
    };
  };

  const help = (): History => {
    console.log("help");
    return {
      command: "user --help",
      output: "You get help",
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
