import { createContext, useState } from "react";

import { CommandActions, History, TerminalContextType, TerminalOutputType } from "../types/terminal";

export const TerminalContext = createContext<TerminalContextType | undefined>(undefined);

export const TerminalProvider = <T extends string>(props: {
  children: React.ReactNode;
  commandActions: CommandActions<T>;
}) => {
  const { children, commandActions } = props;
  const [username, setUsername] = useState<string>("sanjay");
  const [hostname, setHostname] = useState<string>("retro.ai");
  const [command, setCommand] = useState<string>("");
  const [history, setHistory] = useState<History[]>([]);

  const handleCommand = (newCommand: string) => {
    setCommand(newCommand);

    let historyEntry: History = {
      command: newCommand,
      output: `Command changed to: ${newCommand}`,
      type: TerminalOutputType.INFO,
    };

    // Execute the action if it exists
    if (commandActions[newCommand]) {
      historyEntry = commandActions[newCommand](newCommand.split(" ") as T[]);
    }

    setHistory((prev) => [...prev, historyEntry]);
  };

  return (
    <TerminalContext.Provider
      value={{
        command,
        setCommand,
        history,
        setHistory,
        username,
        setUsername,
        hostname,
        setHostname,
        handleCommand,
      }}
    >
      {children}
    </TerminalContext.Provider>
  );
};
