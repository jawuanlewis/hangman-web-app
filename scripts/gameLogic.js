const keyboardContainer = document.getElementById("keyboard-container");
const gameEndContainer = document.getElementById("game-end-container");

// Safeguards for when a player tries to reload page during the game
if (!keyboardContainer.style.display) {
  createKeyboard(keyboardContainer);
  loadKeyboardState();
}
if (!gameEndContainer.style.display) {
  handleGameEnd(gameEndContainer, keyboardContainer);
}
loadHangmanState();

document.querySelector(".nav-option").addEventListener("click", () => {
  resetHangmanState();
  resetKeyboardState();
});

function createKeyboard(container) {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  letters.forEach((letter) => {
    const button = document.createElement("button");
    button.textContent = letter;
    button.dataset.letter = letter;
    button.onclick = () => handleGuess(letter);
    container.appendChild(button);
  });
}

async function handleGuess(letter) {
  try {
    const response = await fetch("/game/guess", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ letter }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    // Update hangman display accordingly
    if (data.attempts < 6) {
      const bodyParts = [
        "left-leg",
        "right-leg",
        "left-arm",
        "right-arm",
        "torso",
        "head",
      ];
      document.getElementById(bodyParts[data.attempts]).style.visibility =
        "visible";
    }
    document.getElementById("status-message").textContent = data.statusMessage;
    document.getElementById("extra-message").textContent = data.extraMessage;
    document.getElementById("current-progress").textContent =
      data.currentProgress;
    if (data.gameOver) {
      // Safeguard so the player can't guess again unless starting new level
      const buttons = document.querySelectorAll("#keyboard-container button");
      buttons.forEach((button) => {
        button.disabled = true;
      });
      handleGameEnd(gameEndContainer, keyboardContainer);
    }
  } catch (error) {
    console.error(error);
    alert("An error occurred: " + error.message);
  }

  // Letters cannot be guessed again
  const button = document.querySelector(`[data-letter="${letter}"]`);
  button.disabled = true;

  saveHangmanState();
  saveKeyboardState();
}

function handleGameEnd(container, keyboard) {
  const level = document.getElementById("level-title").textContent;

  const playAgain = document.createElement("button");
  playAgain.classList.add("item-hover");
  playAgain.textContent = "Play Again";
  playAgain.style.backgroundColor = "#7AC860";
  playAgain.onclick = () => {
    resetHangmanState();
    resetKeyboardState();
    window.location.href = `/game/init?level=${level}`;
  };

  const mainMenu = document.createElement("button");
  mainMenu.classList.add("item-hover");
  mainMenu.textContent = "Main Menu";
  mainMenu.style.backgroundColor = "#E74747";
  mainMenu.onclick = () => {
    resetHangmanState();
    resetKeyboardState();
    window.location.href = "/";
  };

  keyboard.style.display = "none";
  container.removeAttribute("style");
  container.append(playAgain, mainMenu);
}

/**** Hangman State Functions ****/

function saveHangmanState() {
  const parts = [
    "left-leg",
    "right-leg",
    "left-arm",
    "right-arm",
    "torso",
    "head",
  ];
  const state = {};
  parts.forEach((part) => {
    state[part] = document.getElementById(part).style.visibility === "visible";
  });
  sessionStorage.setItem("hangmanState", JSON.stringify(state));
}

function loadHangmanState() {
  const state = JSON.parse(sessionStorage.getItem("hangmanState")) || {};
  const parts = [
    "left-leg",
    "right-leg",
    "left-arm",
    "right-arm",
    "torso",
    "head",
  ];
  if (Object.keys(state).length !== 0) {
    parts.forEach((part) => {
      if (state[part])
        document.getElementById(part).style.visibility = "visible";
    });
  }
}

function resetHangmanState() {
  sessionStorage.removeItem("hangmanState");
}

/**** Keyboard State Functions ****/

function saveKeyboardState() {
  const buttons = document.querySelectorAll("#keyboard-container button");
  const state = {};
  buttons.forEach((button) => {
    state[button.dataset.letter] = button.disabled;
  });
  sessionStorage.setItem("keyboardState", JSON.stringify(state));
}

function loadKeyboardState() {
  const state = JSON.parse(sessionStorage.getItem("keyboardState")) || {};
  const buttons = document.querySelectorAll("#keyboard-container button");
  if (Object.keys(state).length !== 0) {
    buttons.forEach((button) => {
      if (state[button.dataset.letter]) button.disabled = true;
    });
  }
}

function resetKeyboardState() {
  sessionStorage.removeItem("keyboardState");
}
