import { Link } from "react-router-dom";
import { sessionService } from "@/services/sessionService";
import PropTypes from 'prop-types';

const GameOver = ({ level, replay }) => {
  const handleReplay = (e) => {
    e.preventDefault();
    replay(level);
  };

  const handleReset = async () => {
    try {
      await sessionService.resetSession();
    } catch (error) {
      console.error('Error resetting game session:', error);
    }
  };

  return (
    <div id="game-end-container">
      <Link 
        to={`/game?level=${level}`}
        className="item-hover"
        style={{backgroundColor: '#7AC860'}}
        onClick={handleReplay}
      >
        Play Again
      </Link>
      <Link 
        to="/"
        className="item-hover"
        style={{backgroundColor: '#E74747'}}
        onClick={handleReset}
      >
        Main Menu
      </Link>
    </div>
  );
};

GameOver.propTypes = {
  level: PropTypes.string,
  replay: PropTypes.func
};

export default GameOver;
