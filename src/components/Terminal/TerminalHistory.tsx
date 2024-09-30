import { useTerminal } from "../../hooks/useTerminal";
import { TerminalOutputType } from "../../types/terminal";
import CommandPrompt from "../CommandPrompt";
import TypingEffect from "../TypingEffect";

const terminalTypeStyle = {
  [TerminalOutputType.INFO]: "text-green-200",
  [TerminalOutputType.ERROR]: "text-red-500",
  [TerminalOutputType.INITIAL]: "text-white",
};

export const TerminalHistory = () => {
  const { history } = useTerminal();

  return history.map(({ output, type, command, directory }, index) => (
    <div key={index}>
      {type !== TerminalOutputType.INITIAL && <CommandPrompt directory={directory} />}
      {type !== TerminalOutputType.INITIAL && <span className="text-custom-green">{command}</span>}
      <div className={`whitespace-pre-wrap p-2 ${terminalTypeStyle[type]}`}>
        <TypingEffect text={output} />
      </div>
    </div>
  ));
};
