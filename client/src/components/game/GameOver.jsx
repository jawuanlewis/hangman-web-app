import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

const GameOver = ({ level, replay }) => {
  const handleReplay = (e) => {
    e.preventDefault();
    replay(level);
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
