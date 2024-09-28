import { useState } from 'react';
import { enemyArt, helpArt, swordArt } from '../assets/asciiArt';
import Input from './Terminal/Input';

const Terminal = () => {
  const [log, setLog] = useState<string[]>([]); // Log for storing output

  const handleCommand = (command: string) => {
    if (command.trim() === '') return;

    let response = `> ${command}\n`;

    if (command.toLowerCase() === 'look sword') {
      response += `You found a sword!\n${swordArt}`;
    } else if (command.toLowerCase() === 'help') {
      response += helpArt + '\n';
      response += 'Available commands: [help, inventory, go north]';
    } else if (command.toLowerCase() === 'inventory') {
      response += 'You have a sword, a shield, and a potion.';
    } else if (command.toLowerCase() === 'look enemy') {
      response += `You encountered a fierce enemy!\n${enemyArt}`;
    } else {
      response += `Command "${command}" not found. For a list of commands, type 'help':`;
    }

    setLog([...log, response]);
  };

  return (
    <div className="h-screen w-full bg-black text-green-500 font-mono">
      <div className="flex-grow overflow-y-auto mb-4 mt-4">
        {log.map((entry, index) => (
          <pre
            key={index}
            className={`whitespace-pre-wrap ${
              entry.includes('error') ? 'text-red-500' : ''
            }`}
          >
            {entry}
          </pre>
        ))}
      </div>

      <Input onSubmit={handleCommand} />
    </div>
  );
};

export default Terminal;
