import PropTypes from 'prop-types';
import Hangman from "@/components/game/Hangman";

const HangmanLayout = ({ gameState, setGameState }) => {
  return (
    <section className="left-section">
      <Hangman />
    </section>
  );
};

HangmanLayout.propTypes = {
  gameState: PropTypes.shape({
    level: PropTypes.string,
    attempts: PropTypes.number,
    currentProgress: PropTypes.string,
    gameOver: PropTypes.bool
  }).isRequired,
  setGameState: PropTypes.func.isRequired
};

export default HangmanLayout;
