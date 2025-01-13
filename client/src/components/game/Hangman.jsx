const Hangman = () => {
  return (
    <div id="hangman-background">
      <svg id="hangman-display"
        viewBox="0 0 400 400" 
        preserveAspectRatio="xMidYMid meet">

        <line x1="50" y1="350" x2="350" y2="350" stroke="#B87844" strokeWidth="10" /> {/* Base */}
        <line x1="70" y1="350" x2="70" y2="50" stroke="#B87844" strokeWidth="10" /> {/* Pole */}
        <line x1="50" y1="50" x2="250" y2="50" stroke="#B87844" strokeWidth="10" /> {/* Top Beam */}
        <line x1="70" y1="100" x2="120" y2="50" stroke="#B87844" strokeWidth="8" /> {/* Support Beam */}
        <line x1="200" y1="50" x2="200" y2="100" stroke="#B87844" strokeWidth="6" /> {/* Rope */}

        {/* Stick Figure Parts */}
        <circle id="head" cx="200" cy="130" r="30" stroke="white" fill="none" strokeWidth="3" visibility="hidden" />
        <line id="torso" x1="200" y1="160" x2="200" y2="250" stroke="white" strokeWidth="3" visibility="hidden" />
        <line id="right-arm" x1="200" y1="180" x2="160" y2="220" stroke="white" strokeWidth="3" visibility="hidden" />
        <line id="left-arm" x1="200" y1="180" x2="240" y2="220" stroke="white" strokeWidth="3" visibility="hidden" />
        <line id="right-leg" x1="200" y1="250" x2="170" y2="320" stroke="white" strokeWidth="3" visibility="hidden" />
        <line id="left-leg" x1="200" y1="250" x2="230" y2="320" stroke="white" strokeWidth="3" visibility="hidden" />
      </svg>
    </div>
  );
};

export default Hangman;
