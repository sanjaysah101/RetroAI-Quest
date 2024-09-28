import { FC, useEffect, useRef, useState } from 'react';

interface InputProps {
  onSubmit: (command: string) => void;
}

const Input: FC<InputProps> = ({ onSubmit }) => {
  const textRef = useRef<HTMLTextAreaElement>(null);
  const [command, setCommand] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    textRef.current?.focus();
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent new line
      onSubmit(command); // Submit the command as a string
      setCommand('');
    } else if (e.key === 'Backspace') {
      e.preventDefault(); // Prevent default backspace behavior
      setCommand((prev) => prev.slice(0, -1)); // Remove last character
    } else if (e.key.length === 1) {
      setCommand((prev) => prev + e.key);
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="flex items-center">
      <span className="pr-2">{'>'}</span>
      <div
        onClick={() => textRef.current?.focus()}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      >
        <textarea
          className="input-terminal"
          onKeyDown={handleKeyDown}
          ref={textRef}
          autoFocus
          placeholder="Type a command..."
        />
        <div className="liner">
          <span className="text-custom-green">sanjay@retro.ai:~$ </span>
          <span>{command}</span>
          {isFocused && <b className="animate-blink opacity-0">█</b>}
        </div>
      </div>
    </form>
  );
};

export default Input;
