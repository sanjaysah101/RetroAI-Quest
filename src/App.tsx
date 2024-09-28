import Terminal from './components/Terminal';
import TypingEffect from './components/TypingEffect';
import { GameProvider } from './context/GameContext';
import { PlayerProvider } from './context/PlayerContext';

function App() {
  return (
    <GameProvider>
      <PlayerProvider>
        <div className="h-screen w-full p-2 md:p-4 bg-black">
          <div className="flex-grow overflow-y-auto mb-4 rounded-lg">
            <TypingEffect
              text="RetroAI Quest Hackathon Create AI-Powered Text Adventures"
              className="text-white"
            />
            <Terminal />
          </div>
        </div>
      </PlayerProvider>
    </GameProvider>
  );
}

export default App;
