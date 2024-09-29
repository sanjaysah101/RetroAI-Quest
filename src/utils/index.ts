import { TerminalCommandHelp } from "../types/terminal";

export const formatHelpCommands = (commands: TerminalCommandHelp[]) =>
  commands
    .map(
      ({ command, description }) =>
        `<span class="text-blue-300">${command}</span> - <span class="text-[#B89076]">${description}</span>`
    )
    .join("\n\n");
