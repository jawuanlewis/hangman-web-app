const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const container = document.getElementById("keyboard-container");

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
        
        const data = await response.json();

        // Update the status message
        const gameStatus = document.getElementById('game-status');
        const gameMessage = document.getElementById('game-message');
        if (data.error) {
            gameStatus.textContent = `Error: ${data.error}`;
        } else {
            gameStatus.textContent = data.status;
            if (data.attempts === 0) {
                gameMessage.textContent = data.message;
            }
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while submitting your guess.');
    }

    // Letters cannot be guessed again
    const button = document.querySelector(`[data-letter="${letter}"]`);
    button.disabled = true;
}
