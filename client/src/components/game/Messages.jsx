import useGame from "@/context/useGame";

const Messages = () => {
  const { attempts } = useGame();

  return (
    <div className="head-text">
      <label id="status-message">
        {attempts > 0 ? (
          `You have ${attempts} attempt(s) remaining.`
        ) : (
          "Sorry! You have run out of guesses. The word is:"
        )}
      </label>
      <br></br><br></br>
      <label id="extra-message">
        {attempts > 0 ? (
          "Guess a letter below:"
        ) : (
          ""
        )}
      </label>
    </div>
  );
};

export default Messages;
