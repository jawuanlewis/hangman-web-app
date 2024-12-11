const keyboardContainer = document.getElementById("keyboard-container");
const gameEndContainer = document.getElementById("game-end-container");

// If these elements don't have "display" set to "none",
// they can be initialized and displayed
if (!keyboardContainer.style.display) {
    createKeyboard(keyboardContainer);
}
if (!gameEndContainer.style.display) {
    handleGameEnd(gameEndContainer, keyboardContainer);
}


function createKeyboard(container) {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    letters.forEach(letter => {
        const button = document.createElement("button");
        button.textContent = letter;
        button.dataset.letter = letter;
        button.onclick = () => handleGuess(letter);
        container.appendChild(button);
    });
    loadKeyboardState();
}

async function handleGuess(letter) {
    try {
        const response = await fetch('/game/guess', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ letter })
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        document.getElementById("status-message").textContent = data.statusMessage;
        document.getElementById("extra-message").textContent = data.extraMessage;
        document.getElementById("game-word").textContent = data.currentProgress;
        if (data.gameOver) {
            // Safeguard so the player can't guess again unless starting new level
            const buttons = document.querySelectorAll("#keyboard-container button");
            buttons.forEach(button => {
                button.disabled = true;
            });
            handleGameEnd(gameEndContainer, keyboardContainer);
        }
    } catch (error) {
        console.error(error);
        alert('An error occurred: ' + error.message);
    }

    // Letters cannot be guessed again
    const button = document.querySelector(`[data-letter="${letter}"]`);
    button.disabled = true;
    saveKeyboardState();
}

function handleGameEnd(container, keyboard) {
    const level = document.getElementById("level-title").textContent;

    const playAgain = document.createElement("button");
    playAgain.classList.add("item-hover");
    playAgain.textContent = "Play Again";
    playAgain.style.backgroundColor = "#7AC860";
    playAgain.onclick = () => {
        resetKeyboardState();
        window.location.href = `/game/init?level=${level}`;
    };

    const mainMenu = document.createElement("button");
    mainMenu.classList.add("item-hover");
    mainMenu.textContent = "Main Menu";
    mainMenu.style.backgroundColor = "#E74747";
    mainMenu.onclick = () => {
        resetKeyboardState();
        window.location.href = "/";
    };

    keyboard.style.display = "none";
    container.removeAttribute("style");
    container.append(playAgain, mainMenu);
}

function saveKeyboardState() {
    const buttons = document.querySelectorAll("#keyboard-container button");
    const state = {};
    buttons.forEach(button => {
        state[button.dataset.letter] = button.disabled;
    });
    sessionStorage.setItem("keyboardState", JSON.stringify(state));
}

function loadKeyboardState() {
    const state = JSON.parse(sessionStorage.getItem("keyboardState")) || {};
    const buttons = document.querySelectorAll("#keyboard-container button");
    if (Object.keys(state).length !== 0) {
        buttons.forEach(button => {
            if (state[button.dataset.letter])
                button.disabled = true;
        });
    }
}

function resetKeyboardState() {
    sessionStorage.removeItem("keyboardState");
    const buttons = document.querySelectorAll("#keyboard-container button");
    buttons.forEach(button => {
        button.disabled = false;
    });
}
