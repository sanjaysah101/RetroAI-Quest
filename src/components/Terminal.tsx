import { useState } from "react";

import { useGame } from "../hooks/useGame";
import GameLog from "./GameLog";
import Input from "./Terminal/Input";

const Terminal = () => {
  const [isFocused, setIsFocused] = useState(false);

  // const [log, setLog] = useState<string[]>([]); // Log for storing output.

  // const handleCommand = (command: string) => {
  //   if (command.trim() === '') return;

  //   let response = `> ${command}\n`;

  //   if (command.toLowerCase() === 'look sword') {
  //     response += `You found a sword!\n${swordArt}`;
  //   } else if (command.toLowerCase() === 'help') {
  //     response += helpArt + '\n';
  //     response += 'Available commands: [help, inventory, go north]';
  //   } else if (command.toLowerCase() === 'inventory') {
  //     response += 'You have a sword, a shield, and a potion.';
  //   } else if (command.toLowerCase() === 'look enemy') {
  //     response += `You encountered a fierce enemy!\n${enemyArt}`;
  //   } else {
  //     response += `Unknown command: ${command}. For a list of commands, type 'help':`;
  //   }

  //   // Update the game log with the response
  //   setLog((prevLog) => [...prevLog, response]);
  // };

  const { handleTerminalInput } = useGame();

  return (
    <div
      className="w-full bg-black font-mono text-green-500"
      onClick={() => setIsFocused(true)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      <div className="mb-4 mt-4 flex-grow overflow-y-auto"></div>
      <GameLog />
      <Input onSubmit={handleTerminalInput} isFocused={isFocused} />
    </div>
  );
};

export default Terminal;
