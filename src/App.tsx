import Terminal from './components/Terminal';
import TypingEffect from './components/TypingEffect';

function App() {
  return (
    <div className="h-screen w-full p-2 md:p-4 bg-black">
      <div className="flex-grow overflow-y-auto mb-4 rounded-lg">
        <TypingEffect
          text="RetroAI Quest Hackathon Create AI-Powered Text Adventures"
          className="text-white"
        />
        <Terminal />
      </div>
    </div>
  );
}

export default App;
