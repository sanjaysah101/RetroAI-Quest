import { FC, memo } from "react";

import { useTerminal } from "../hooks/useTerminal";

const CommandPrompt: FC = () => {
  const { username, hostname } = useTerminal();

  return (
    <>
      <span className="pr-2">{">"}</span>
      <span className="text-custom-green">{`${username}@${hostname}:~$ `}</span>
    </>
  );
};

export default memo(CommandPrompt);
