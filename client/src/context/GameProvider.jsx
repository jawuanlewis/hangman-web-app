import PropTypes from 'prop-types';
import { useState } from 'react';
import GameContext from './GameContext';

const GameProvider = ({ children }) => {
  const [attempts, setAttempts] = useState(6);

  return (
    <GameContext.Provider value={{ attempts, setAttempts }}>
      {children}
    </GameContext.Provider>
  );
};

GameProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default GameProvider;
