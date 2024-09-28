import React, { FC, createContext, useState } from "react";

import { PlayerActions, PlayerContextType, PlayerDecision, PlayerState } from "../types/player";

export const PlayerContext = createContext<PlayerContextType | null>(null);

// Provide the context to wrap your components
export const PlayerProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [playerState, setPlayerState] = useState<PlayerState>({
    location: "starting point",
    inventory: [] as string[],
    decisions: [] as PlayerDecision[],
    playerActions: {} as PlayerActions,
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
      decisions: [...prevDecision.decisions, decision],
    }));
  };

  const addItemToInventory = (item: string) => {
    setPlayerState((prevState) => ({
      ...prevState,
      inventory: [...prevState.inventory, item],
    }));
  };

  const look = (item: string) => {
    console.log(item);
  };

  const inventory = () => {
    console.log(playerState.inventory);
  };

  const go = (direction: string) => {
    console.log(direction);
  };

  const pickup = (item: string) => {
    console.log(item);
  };

  const drop = (item: string) => {
    console.log(item);
  };

  const use = (item: string) => {
    console.log(item);
  };

  const clear = () => {
    console.log("cleared");
  };

  const help = () => {
    console.log("help");
  };

  const playerActions = {
    look,
    inventory,
    go,
    pickup,
    drop,
    use,
    clear,
    help,
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
