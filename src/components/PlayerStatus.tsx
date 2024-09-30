import { usePlayer } from "../hooks/usePlayer";

export const PlayerStatus = () => {
  const { playerState } = usePlayer();

  return (
    <div>
      <h2>Player Location: {playerState?.location}</h2>
    </div>
  );
};
