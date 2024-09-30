import { useState } from "react";

import { useTerminal } from "../../hooks/useTerminal";
import Input from "./Input";
import { TerminalHistory } from "./TerminalHistory";

const Terminal = () => {
  const [isFocused, setIsFocused] = useState(false);

  const { handleCommand } = useTerminal();

  return (
    <div
      className="w-full bg-black font-mono text-green-500"
      onClick={() => setIsFocused(true)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      <div className="mb-4 mt-4 flex-grow overflow-y-auto"></div>
      <TerminalHistory />
      <Input onSubmit={handleCommand} isFocused={isFocused} />
    </div>
  );
};

export default Terminal;
