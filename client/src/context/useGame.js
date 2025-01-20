import { useContext } from 'react';
import GameContext from './GameContext';

const useGame = () => useContext(GameContext);

export default useGame;
