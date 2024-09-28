import { useGame } from "../hooks/useGame";
import TypingEffect from "./TypingEffect";

const GameLog = () => {
  const { log } = useGame();

  return log.map(({ message, type }, index) => (
    <div key={index}>
      <div>
        <span className="pr-2">{">"}</span>
        <span className="text-custom-green">sanjay@retro.ai:~$ </span>
      </div>
      <div className={`whitespace-pre-wrap ${type === "error" ? "text-red-500" : ""}`}>
        <TypingEffect text={message} />
      </div>
    </div>
  ));
};

export default GameLog;
