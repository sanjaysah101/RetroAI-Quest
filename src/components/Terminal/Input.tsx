import { FC, useEffect, useRef, useState } from "react";

import CommandPrompt from "../CommandPrompt";

interface InputProps {
  onSubmit: (command: string) => void;
  isFocused: boolean;
}

const Input: FC<InputProps> = ({ onSubmit, isFocused }) => {
  const textRef = useRef<HTMLTextAreaElement>(null);
  const [command, setCommand] = useState("");

  useEffect(() => {
    if (!isFocused) {
      textRef.current?.focus();
    }
  }, [isFocused]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent new line
      onSubmit(command); // Submit the command as a string
      setCommand("");
    } else if (e.key === "Backspace") {
      e.preventDefault(); // Prevent default backspace behavior
      setCommand((prev) => prev.slice(0, -1)); // Remove last character
    } else if (e.key.length === 1) {
      setCommand((prev) => prev + e.key);
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="flex items-center">
      <>
        <textarea
          className="input-terminal"
          onKeyDown={handleKeyDown}
          ref={textRef}
          autoFocus={isFocused}
          placeholder="Type a command..."
        />
        <div className="liner">
          <CommandPrompt />
          <span>{command}</span>
          {isFocused && <b className="animate-blink opacity-0">█</b>}
        </div>
      </>
    </form>
  );
};

export default Input;
