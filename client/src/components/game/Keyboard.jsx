import PropTypes from 'prop-types';

const Keyboard = ({ onGuess }) => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  
  return (
    <div id="keyboard-container">
      {letters.map((letter) => (
        <button
          key={letter}
          onClick={() => onGuess(letter)}
          data-letter={letter}
        >
          {letter}
        </button>
      ))}
    </div>
  );
};

Keyboard.propTypes = {
  onGuess: PropTypes.func.isRequired
};

export default Keyboard;
