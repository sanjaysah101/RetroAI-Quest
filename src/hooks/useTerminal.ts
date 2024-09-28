import { useContext } from "react";

import { TerminalContext } from "../context/TerminalContext";

export const useTerminal = () => {
  const terminalContext = useContext(TerminalContext);
  if (!terminalContext) {
    throw new Error("useTerminal must be used within a TerminalProvider");
  }
  return terminalContext;
};
