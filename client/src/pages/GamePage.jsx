import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { gameService } from "@/services/gameService";
import HangmanLayout from "@/layouts/HangmanLayout";
import GameLayout from "@/layouts/GameLayout";
import "@/styles/gamepage.css";

const GamePage = () => {
  const [searchParams] = useSearchParams();
  const [gameState, setGameState] = useState({
    level: '',
    attempts: 6,
    currentProgress: '',
    gameOver: false
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeGame = async () => {
      try {
        const currentGame = await gameService.getCurrGame();
        if (Object.keys(currentGame).length !== 0) {
          setGameState(currentGame);
        } else {
          const level = searchParams.get('level') || 'Sports';
          const gameData = await gameService.initGame(level);
          setGameState(gameData);
        }
        setLoading(false);
      } catch (err) {
        console.error('Failed to initialize game:', err);
        setLoading(false);
      }
    };

    initializeGame();
  }, [searchParams]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="game-layout">
      <HangmanLayout 
        gameState={gameState} 
        setGameState={setGameState} 
      />
      <GameLayout
        gameState={gameState} 
        setGameState={setGameState} 
      />
    </main>
  );
};

export default GamePage;
