import { FC, memo } from "react";

import { useTerminal } from "../hooks/useTerminal";

const CommandPrompt: FC<{ directory: string }> = ({ directory }) => {
  const { username, hostname } = useTerminal();

  return (
    <>
      <span className="pr-2">{">"}</span>
      <span className="text-custom-green">{`${username}@${hostname}`}</span>
      <span className="text-white">:</span>
      <span className="text-blue-300">{directory}</span>
      <span className="text-white">$ </span>
    </>
  );
};

export default memo(CommandPrompt);
