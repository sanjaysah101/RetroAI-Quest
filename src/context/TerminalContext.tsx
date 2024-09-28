import { createContext, useState } from "react";

import { helpArt } from "../assets/asciiArt";
import {
  CommandActions,
  History,
  TerminalActions,
  TerminalCommandHelp,
  TerminalContextType,
  TerminalOutputType,
} from "../types/terminal";

export const TerminalContext = createContext<TerminalContextType | undefined>(undefined);

export const TerminalProvider = <T extends string>(props: {
  children: React.ReactNode;
  commandActions: CommandActions<T>;
  username: string;
  hostname: string;
  command?: string;
  history?: History[];
}) => {
  const { children, commandActions } = props;
  const [username, setUsername] = useState<string>(props.username);
  const [hostname, setHostname] = useState<string>(props.hostname);
  const [command, setCommand] = useState<string>(props.command || "");
  const [history, setHistory] = useState<History[]>(props.history || []);

  const handleCommand = (newCommand: string) => {
    let historyEntry: History = {
      command: newCommand,
      output: `Command changed to: ${newCommand}`,
      type: TerminalOutputType.INFO,
    };

    if (newCommand === TerminalActions.CLEAR) {
      setHistory([]);
      return;
    }

    if (newCommand.startsWith(TerminalActions.SET_USERNAME)) {
      const username = newCommand.split(" ")[2];

      if (!username) {
        historyEntry = {
          command: newCommand,
          output: "Username not provided",
          type: TerminalOutputType.ERROR,
        };
        setHistory((prev) => [...prev, historyEntry]);
        return;
      }

      if (newCommand.split(" ").length > 3) {
        historyEntry = {
          command: newCommand,
          output: "Invalid command",
          type: TerminalOutputType.ERROR,
        };
        setHistory((prev) => [...prev, historyEntry]);
        return;
      }

      setUsername(username);
      return;
    }

    if (newCommand.startsWith(TerminalActions.SET_HOSTNAME)) {
      const hostname = newCommand.split(" ")[2];

      if (!hostname) {
        historyEntry = {
          command: newCommand,
          output: "Hostname not provided",
          type: TerminalOutputType.ERROR,
        };
        setHistory((prev) => [...prev, historyEntry]);
        return;
      }

      if (newCommand.split(" ").length > 3) {
        historyEntry = {
          command: newCommand,
          output: "Invalid command",
          type: TerminalOutputType.ERROR,
        };
        setHistory((prev) => [...prev, historyEntry]);
        return;
      }

      setHostname(hostname);
      return;
    }

    if (newCommand === TerminalActions.HELP) {
      const historyEntry = {
        command: newCommand,
        output:
          helpArt +
          "\n\n" +
          "\nAvailable commands\n\n" +
          Object.values(TerminalCommandHelp)
            .map(({ command, description }) => `<span class="text-blue-300">${command}</span> - <span class="text-[#B89076]">${description}</span>`)
            .join("\n"),
        type: TerminalOutputType.INFO,
      };
      setHistory((prev) => [...prev, historyEntry]);
      return;
    }

    // Execute the action if it exists
    if (commandActions[newCommand]) {
      historyEntry = commandActions[newCommand](newCommand.split(" ") as T[]);
    } else {
      historyEntry = {
        command: newCommand,
        output: `Unknown command: ${newCommand}. For a list of commands, type <span class="text-blue-300">"help"</span></span>`,
        type: TerminalOutputType.ERROR,
      };
    }

    setHistory((prev) => [...prev, historyEntry]);
    setCommand(newCommand);
  };

  return (
    <TerminalContext.Provider
      value={{
        command,
        history,
        username,
        hostname,
        handleCommand,
      }}
    >
      {children}
    </TerminalContext.Provider>
  );
};
