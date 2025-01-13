import Hangman from "@/components/game/Hangman";
import Keyboard from "@/components/game/Keyboard";
import "@/styles/gamepage.css";

const GamePage = () => {
  const handleGuess = (letter) => {
    console.log("Letter Guessed: ", letter);
  };

  return (
    <main className="game-layout">
      <section className="left-section">
        <Hangman />
      </section>
      <section className="right-section">
        <Keyboard onGuess={handleGuess} />
      </section>
    </main>
  );
};

export default GamePage;
