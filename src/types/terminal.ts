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

export type CommandActions<T> = { [key: string]: (arg: T[]) => Promise<History> };

export interface History {
  command: string;
  output: string;
  type: TerminalOutputType;
}

export interface TerminalContextType {
  command: string;
  history: History[];
  username: string;
  hostname: string;
  handleCommand: (command: string) => void;
}

export enum TerminalCommand {
  SET_USERNAME = "set username",
  SET_HOSTNAME = "set hostname",
  CLEAR = "clear",
  HELP = "help",
}

export type TerminalCommandHelp = {
  command: string;
  description: string;
};

export const TerminalCommandHelp: Record<keyof typeof TerminalCommand, TerminalCommandHelp> = {
  SET_USERNAME: {
    command: "set username &lt;username&gt;",
    description: "Set the username",
  },
  SET_HOSTNAME: {
    command: "set hostname &lt;hostname&gt;",
    description: "Set the hostname",
  },
  CLEAR: {
    command: "clear",
    description: "Clear the terminal",
  },
  HELP: {
    command: "help",
    description: "Show the help menu",
  },
};
