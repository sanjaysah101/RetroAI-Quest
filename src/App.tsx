import Terminal from "./components/Terminal/Terminal";
import { GameProvider } from "./context/GameContext";
import { PlayerProvider } from "./context/PlayerContext";
import { TerminalProvider } from "./context/TerminalContext";
import { useGame } from "./hooks/useGame";
import { usePlayer } from "./hooks/usePlayer";
import { GameHelpCommands } from "./types/game";
import { PlayerHelpCommands } from "./types/player";
import { CommandActions } from "./types/terminal";

function App() {
  return (
    <GameProvider>
      <PlayerProvider>
        <div className="h-screen overflow-auto bg-black p-2 md:p-4">
          <div className="mb-4 flex-grow rounded-lg">
            <GameTerminal />
          </div>
        </div>
      </PlayerProvider>
    </GameProvider>
  );
}

const GameTerminal = () => {
  const { playerActions } = usePlayer();
  const { gameState, gameActions } = useGame();

  return (
    <TerminalProvider
      commandActions={{
        ...(playerActions as unknown as CommandActions<string>),
        ...(gameActions as unknown as CommandActions<string>),
      }}
      username="sanjay"
      hostname="retro.ai"
      history={gameState.gameHistory}
      helpCommand={[...Object.values(PlayerHelpCommands), ...Object.values(GameHelpCommands)]}
    >
      <Terminal />
    </TerminalProvider>
  );
};

export default App;
