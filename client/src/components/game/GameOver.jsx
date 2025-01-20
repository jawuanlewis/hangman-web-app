const GameOver = () => {
  return (
    <div id="game-end-container">
      <button
        className="item-hover"
        style={{backgroundColor: '#7AC860'}}
      >
        Play Again
      </button>
      <button
        className="item-hover"
        style={{backgroundColor: '#E74747'}}
      >
        Main Menu
      </button>
    </div>
  );
};

export default GameOver;
