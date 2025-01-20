import GameProvider from "@/context/GameProvider";
import HangmanLayout from "@/layouts/HangmanLayout";
import GameLayout from "@/layouts/GameLayout";
import "@/styles/gamepage.css";

const GamePage = () => {
  return (
    <GameProvider>
      <main className="game-layout">
        <HangmanLayout />
        <GameLayout />
      </main>
    </GameProvider>
  );
};

export default GamePage;
