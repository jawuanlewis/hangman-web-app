const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const container = document.getElementById("keyboard-container");

// Create the keyboard of letters
letters.forEach(letter => {
    const button = document.createElement("button");
    button.textContent = letter;
    button.dataset.letter = letter;
    button.onclick = () => handleGuess(letter);
    container.appendChild(button);
});

async function handleGuess(letter) 
{
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

        document.getElementById("game-status").textContent = data.statusMessage;
        document.getElementById("game-word").textContent = data.currentProgress;
        if (data.gameOver) {
            document.getElementById("game-message").textContent = '';
        }
    } catch (error) {
        console.error(error);
        alert('An error occurred: ' + error.message);
    }

    // Letters cannot be guessed again
    const button = document.querySelector(`[data-letter="${letter}"]`);
    button.disabled = true;
}
