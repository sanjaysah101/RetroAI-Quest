const TypingEffect: React.FC<{ text: string; className?: string }> = ({ text, className }) => {
  return (
    <p
      className={`relative w-[max-content] font-mono before:absolute before:inset-0 before:h-full before:w-full before:animate-typewriter before:bg-black before:content-[''] ${className}`}
      dangerouslySetInnerHTML={{ __html: text }}
    ></p>
  );
};

export default TypingEffect;
