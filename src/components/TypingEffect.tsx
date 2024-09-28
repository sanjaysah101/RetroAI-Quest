const TypingEffect: React.FC<{ text: string; className?: string }> = ({
  text,
  className,
}) => {
  return (
    <p
      className={`relative w-[max-content] font-mono
before:absolute before:inset-0 before:bg-black text-green-500
before:animate-typewriter before:w-full before:h-full before:content-[''] ${className}`}
    >
      {text}
    </p>
  );
};

export default TypingEffect;
