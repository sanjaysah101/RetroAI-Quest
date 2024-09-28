// import { useGame } from "../hooks/useGame";
import { useTerminal } from "../hooks/useTerminal";
import CommandPrompt from "./ComandPrompt";
import TypingEffect from "./TypingEffect";

const GameLog = () => {
  // const { log } = useGame();
  const { history } = useTerminal();

  return history.map(({ output, type }, index) => (
    <div key={index}>
      {type !== "initial" && <CommandPrompt />}
      <div className={`whitespace-pre-wrap ${type === "error" ? "text-red-500" : ""}`}>
        <TypingEffect text={output} />
      </div>
    </div>
  ));
};

export default GameLog;
