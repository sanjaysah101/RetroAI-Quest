import { useTerminal } from "../../hooks/useTerminal";
import { TerminalOutputType } from "../../types/terminal";
import CommandPrompt from "../CommandPrompt";
import TypingEffect from "../TypingEffect";

const terminalTypeStyle = {
  [TerminalOutputType.INFO]: "text-green-200",
  [TerminalOutputType.ERROR]: "text-red-500",
  [TerminalOutputType.INITIAL]: "text-white",
};

const TerminalHistory = () => {
  const { history } = useTerminal();

  return history.map(({ output, type, command }, index) => (
    <div key={index}>
      {type !== "initial" && <CommandPrompt />}
      {type !== "initial" && <span className="text-custom-green">{command}</span>}
      <div className={`whitespace-pre-wrap p-2 ${terminalTypeStyle[type]}`}>
        <TypingEffect text={output} />
      </div>
    </div>
  ));
};

export default TerminalHistory;
