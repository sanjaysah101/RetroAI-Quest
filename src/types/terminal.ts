export interface CommandPromptProps {
  username: string;
  hostname: string;
}

export interface TerminalProviderProps {
  children: React.ReactNode;
}

export const enum TerminalOutputType {
  ERROR = "error",
  INFO = "info",
  INITIAL = "initial",
}

export type DirectoryInfo = {
  isRootDirectory: boolean;
  isHomeDirectory: boolean;
  currentDirectory: string;
};

export type CommandActions<T> = { [key: string]: (arg: T[], directoryInfo: DirectoryInfo) => Promise<History> };

export interface History {
  command: string;
  output: string;
  type: TerminalOutputType;
  directory: string;
}

export interface TerminalContextType {
  command: string;
  history: History[];
  username: string;
  hostname: string;
  directory: string;
  isLoading: boolean;
  changeDirectory: (newDirectory: string) => void;
  handleCommand: (command: string) => void;
}

export enum TerminalCommand {
  SET_USERNAME = "set username &lt;username&gt;",
  SET_HOSTNAME = "set hostname &lt;hostname&gt;",
  CLEAR = "clear",
  HELP = "help",
  CD = "cd directory",
  LS = "ls",
}

export type Command = {
  command: string;
  description: string;
};

export const TerminalCommandHelp: Record<keyof typeof TerminalCommand, Command> = {
  SET_USERNAME: {
    command: TerminalCommand.SET_USERNAME,
    description: "Set the username",
  },
  SET_HOSTNAME: {
    command: TerminalCommand.SET_HOSTNAME,
    description: "Set the hostname",
  },
  CLEAR: {
    command: TerminalCommand.CLEAR,
    description: "Clear the terminal",
  },
  HELP: {
    command: TerminalCommand.HELP,
    description: "Show the help menu",
  },
  CD: {
    command: TerminalCommand.CD,
    description: "Change the current directory",
  },
  LS: {
    command: TerminalCommand.LS,
    description: "List the files in the current directory",
  },
};
