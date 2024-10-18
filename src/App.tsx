import Terminal from "./components/Terminal/Terminal";
import { GameProvider } from "./context/GameContext";
import { PlayerProvider } from "./context/PlayerContext";
import { TerminalProvider } from "./context/TerminalContext";
import { useGame } from "./hooks/useGame";
import { usePlayer } from "./hooks/usePlayer";
import { GameHelpCommands } from "./types/game";
import { PlayerHelpCommands } from "./types/player";

function App() {
  return (
    <GameProvider>
      <PlayerProvider>
        <div className="h-screen overflow-y-auto overflow-x-hidden bg-black p-2 md:p-4">
          <div className="mb-4 flex-grow rounded-lg">
            <GameTerminal />
          </div>
        </div>
      </PlayerProvider>
    </GameProvider>
  );
}

const GameTerminal = () => {
  const { gameState, gameActions, gameAction } = useGame();
  const { playerActions } = usePlayer();
 
  return (
    <TerminalProvider
      commandActions={gameAction ? gameActions : playerActions}
      username="sanjay"
      hostname="retro.ai"
      history={gameState.gameHistory}
      extentCommand={gameAction ? Object.values(GameHelpCommands) : Object.values(PlayerHelpCommands)}
    >
      <Terminal />
    </TerminalProvider>
  );
};

export default App;
