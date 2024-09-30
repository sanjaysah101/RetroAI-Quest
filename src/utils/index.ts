import { Command } from "../types/terminal";

export const formatHelpCommands = (commands: Command[]) =>
  commands
    .map(
      ({ command, description }) =>
        `<span class="text-blue-300">${command}</span> - <span class="text-[#B89076]">${description}</span>`
    )
    .join("\n\n");

export const checkTerminalCommand = (commandToCheck: string, terminalCommand: string[], exactMatch = false) => {
  return terminalCommand.find((command) => {
    const terminalCommandParts = command.split(" ");

    if (exactMatch) {
      return command === commandToCheck;
    }

    return (
      terminalCommandParts[0] === commandToCheck.split(" ")[0] &&
      terminalCommandParts.length === commandToCheck.split(" ").length
    );
  });
};

export const generateRandomChoices = (choices: string[]) => {
  return choices[Math.floor(Math.random() * choices.length)];
};
