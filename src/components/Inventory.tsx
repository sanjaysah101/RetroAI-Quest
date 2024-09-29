import { usePlayer } from "../hooks/usePlayer";

export const Inventory = () => {
  const { playerState, addItemToInventory } = usePlayer();

  return (
    <div>
      <h2>Inventory</h2>
      <ul>{playerState?.inventory?.map((item, index) => <li key={index}>{item}</li>)}</ul>
      <button onClick={() => addItemToInventory("sword")}>Pick up Sword</button>
    </div>
  );
};
