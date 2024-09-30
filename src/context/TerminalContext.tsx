import { createContext, useState } from "react";

import { helpArt } from "../assets/asciiArt";
import {
  Command,
  CommandActions,
  DirectoryInfo,
  History,
  TerminalCommand,
  TerminalCommandHelp,
  TerminalContextType,
  TerminalOutputType,
} from "../types/terminal";
import { formatHelpCommands } from "../utils";

export const TerminalContext = createContext<TerminalContextType | undefined>(undefined);

const checkTerminalCommand = (commandToCheck: string, terminalCommand: string[]) => {
  return terminalCommand.find((command) => {
    const terminalCommandParts = command.split(" ");

    return (
      terminalCommandParts[0] === commandToCheck.split(" ")[0] &&
      terminalCommandParts.length === commandToCheck.split(" ").length
    );
  });
};

export const TerminalProvider = (props: {
  children: React.ReactNode;
  commandActions: CommandActions;
  username: string;
  hostname: string;
  command?: string;
  extentCommand?: Command[];
  history?: History[];
}) => {
  const {
    children,
    commandActions,
    username: initialUsername,
    hostname: initialHostname,
    command: initialCommand,
    history: initialHistory,
    extentCommand,
  } = props;
  const [username, setUsername] = useState<string>(initialUsername);
  const [hostname, setHostname] = useState<string>(initialHostname);
  const [command, setCommand] = useState<string>(initialCommand || "");
  const [history, setHistory] = useState<History[]>(initialHistory || []);
  const [directory, setDirectory] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const directoryInfo: DirectoryInfo = {
    isRootDirectory: directory === "/",
    isHomeDirectory: directory === "~",
    currentDirectory: directory,
  };

  const changeUsername = (username: string) => {
    let historyEntry: History;

    if (!username) {
      historyEntry = {
        command: command,
        output: "Username not provided",
        type: TerminalOutputType.ERROR,
        directory: directory,
      };
      setHistory((prev) => [...prev, historyEntry]);
      return;
    }

    if (command.split(" ").length > 3) {
      historyEntry = {
        command: command,
        output: "Invalid command",
        type: TerminalOutputType.ERROR,
        directory: directory,
      };
      setHistory((prev) => [...prev, historyEntry]);
      return;
    }

    setUsername(username);
  };

  const changeHostname = (hostname: string) => {
    let historyEntry: History;
    if (!hostname) {
      historyEntry = {
        command: command,
        output: "Hostname not provided",
        type: TerminalOutputType.ERROR,
        directory: directory,
      };
      setHistory((prev) => [...prev, historyEntry]);
      return;
    }

    if (command.split(" ").length > 3) {
      historyEntry = {
        command: command,
        output: "Invalid command",
        type: TerminalOutputType.ERROR,
        directory: directory,
      };
      setHistory((prev) => [...prev, historyEntry]);
      return;
    }

    setHostname(hostname);
  };

  const executeTerminalCommand = async (command: string) => {
    const commandParts = command.split(" ");
    const baseCommand = commandParts[0];

    let historyEntry: History;

    if (baseCommand === TerminalCommand.CLEAR) {
      setHistory([]);
      return;
    }

    if (checkTerminalCommand(command, [TerminalCommand.SET_USERNAME])) {
      changeUsername(command.split(" ")[2]);
      return;
    }

    if (checkTerminalCommand(command, [TerminalCommand.SET_HOSTNAME])) {
      changeHostname(command.split(" ")[2]);
      return;
    }

    if (command === TerminalCommand.HELP) {
      const historyEntry = {
        command: command,
        output:
          helpArt +
          "\n\n" +
          "\nAvailable commands\n\n" +
          formatHelpCommands(Object.values(TerminalCommandHelp)) +
          "\n\n" +
          (extentCommand ? formatHelpCommands(extentCommand) : ""),
        type: TerminalOutputType.INFO,
        directory: directory,
      };
      setHistory((prev) => [...prev, historyEntry]);
      return;
    }

    if (checkTerminalCommand(command, [TerminalCommand.CD])) {
      if (commandParts.length !== 2) {
        historyEntry = {
          command: command,
          output: "Usage: cd <directory>",
          type: TerminalOutputType.ERROR,
          directory: directory,
        };
        setHistory((prev) => [...prev, historyEntry]);
        return;
      }

      // const newDirectory = commandParts[1];
      historyEntry = changeDirectory(command, true);
      setHistory((prev) => [...prev, historyEntry]);
      return;
    }

    if (commandActions[command]) {
      historyEntry = await commandActions[command]({
        command: command.split(" "),
        directoryInfo,
        terminalActions: {
          changeDirectory,
          changeHostname,
          changeUsername,
        },
      });
      setHistory((prev) => [...prev, historyEntry]);
      return;
    }

    historyEntry = {
      command: command,
      output: `Unknown command: ${command}. For a list of commands, type <span class="text-blue-300">"help"</span></span>`,
      type: TerminalOutputType.ERROR,
      directory: directory,
    };
    setHistory((prev) => [...prev, historyEntry]);
    return;
  };

  const handleCommand = async (newCommand: string) => {
    try {
      setIsLoading(true);
      newCommand = newCommand.trim();
      const commandParts = newCommand.split(" ");
      const baseCommand = commandParts[0];

      console.log(newCommand, commandParts, baseCommand);

      const isTerminalCommand = checkTerminalCommand(newCommand, Object.values(TerminalCommand));
      console.log({ isTerminalCommand });

      if (isTerminalCommand) {
        executeTerminalCommand(newCommand);
        return;
      }

      const historyEntry = await commandActions[newCommand]({
        command: commandParts,
        directoryInfo,
        terminalActions: {
          changeDirectory,
          changeHostname,
          changeUsername,
        },
      });
      setHistory((prev) => [...prev, historyEntry]);
      setCommand(newCommand);
    } catch (error) {
      const errorEntry: History = {
        command: newCommand,
        output: `Error while executing command: ${(error as Error).message}`,
        type: TerminalOutputType.ERROR,
        directory: directory,
      };
      setHistory((prev) => [...prev, errorEntry]);
    } finally {
      setIsLoading(false);
    }
  };

  const changeDirectory = (command: string, showCommandExecution: boolean = false): History => {
    const newDirectory = command.split(" ").pop() || "";

    if (newDirectory === "..") {
      if (directory === "/") {
        return {
          command: command,
          output: `Already at root, can't go up`,
          type: TerminalOutputType.INFO,
          directory: directory,
        };
      }
      if (directory === "~") {
        setDirectory("/");
      } else {
        const parts = directory.split("/");
        parts.pop();
        setDirectory(parts.join("/") || "/");
      }
    } else if (newDirectory.startsWith("/")) {
      // Absolute path
      setDirectory(`${username}@${hostname}:${newDirectory}`);
    } else if (directory === "/") {
      setDirectory("/" + newDirectory);
    } else {
      setDirectory(`${directory}/${newDirectory}`);
    }

    const historyEntry: History = {
      command: showCommandExecution ? command : newDirectory,
      output: showCommandExecution ? `Changed directory to: ${newDirectory}` : "",
      type: TerminalOutputType.INFO,
      directory: directory,
    };

    return historyEntry;
  };

  return (
    <TerminalContext.Provider
      value={{
        command,
        history,
        username,
        hostname,
        directory,
        isLoading,
        handleCommand,
        changeDirectory,
      }}
    >
      {children}
    </TerminalContext.Provider>
  );
};
