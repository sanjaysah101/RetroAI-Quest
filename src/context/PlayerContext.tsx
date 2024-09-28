import React, { createContext, FC, useState } from 'react';
import {
  PlayerContextType,
  PlayerDecision,
  PlayerState,
} from '../types/player';
import { BasicActions } from '../types/game';
import { useGame } from '../hooks/useGame';

export const PlayerContext = createContext<PlayerContextType | null>(null);

// Provide the context to wrap your components
export const PlayerProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { addToLog } = useGame();

  const [playerState, setPlayerState] = useState<PlayerState>({
    location: 'starting point',
    inventory: [] as string[],
    decisions: [] as PlayerDecision[],
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

  const actionLogMap: { [key in BasicActions]: string } = {
    [BasicActions.LOOK]: BasicActions.LOOK,
    [BasicActions.INVENTORY]: BasicActions.INVENTORY,
    [BasicActions.GO]: BasicActions.GO,
    [BasicActions.PICKUP]: BasicActions.PICKUP,
    [BasicActions.DROP]: BasicActions.DROP,
    [BasicActions.USE]: BasicActions.USE,
    [BasicActions.HELP]: `Available actions: ${Object.values(BasicActions).join(
      ', '
    )}`,
  };

  const handleAction = (action: string | BasicActions) => {
    const logMessage =
      actionLogMap[action as BasicActions] ||
      `Unknown command: ${action}. For a list of commands, type "help":`;
    addToLog(logMessage);
  };

  const value = {
    playerState,
    updatePlayerState,
    makeDecision,
    addItemToInventory,
    handleAction,
  };

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
};
