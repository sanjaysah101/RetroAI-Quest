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

export type CommandActions<T> = { [key: string]: (arg: T[]) => History };

export interface History {
  command: string;
  output: string;
  type: TerminalOutputType;
}

export interface TerminalContextType {
  command: string;
  history: History[];
  setHistory: (fn: (prev: History[]) => History[]) => void;
  username: string;
  hostname: string;
  setCommand: (command: string) => void;
  setUsername: (user: string) => void;
  setHostname: (hostname: string) => void;
  handleCommand: (command: string) => void;
}
