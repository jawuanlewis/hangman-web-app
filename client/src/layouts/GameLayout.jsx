import Messages from "@/components/game/Messages";
import CurrentProgress from "@/components/game/CurrentProgress";
import Keyboard from "@/components/game/Keyboard";
import GameOver from "@/components/game/GameOver";
import useGame from "@/context/useGame";

const GameLayout = () => {
  const { attempts } = useGame();

  const handleGuess = (letter) => {
    console.log("Letter Guessed: ", letter);
  };

  return (
    <section className="right-section">
      <Messages />
      <br></br><br></br><br></br><br></br>
      <CurrentProgress progress="________" />
      <br></br><br></br><br></br>
      
      {attempts > 0 ? (
        <Keyboard onGuess={handleGuess} />
      ) : (
        <GameOver />
      )}
    </section>
  );
};

export default GameLayout;
