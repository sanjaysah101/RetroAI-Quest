import Terminal from "./components/Terminal";
import TypingEffect from "./components/TypingEffect";
import { GameProvider } from "./context/GameContext";
import { PlayerProvider } from "./context/PlayerContext";

function App() {
  return (
    <GameProvider>
      <PlayerProvider>
        <div className="h-screen overflow-auto bg-black p-2 md:p-4">
          <div className="mb-4 flex-grow rounded-lg">
            <TypingEffect text="RetroAI Quest Hackathon Create AI-Powered Text Adventures" className="text-white" />
            <Terminal />
          </div>
        </div>
      </PlayerProvider>
    </GameProvider>
  );
}

export default App;
