const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const container = document.getElementById("keyboard-container");

letters.forEach(letter => {
    const button = document.createElement("button");
    button.textContent = letter;
    button.dataset.letter = letter;
    button.onclick = () => handleGuess(letter);
    container.appendChild(button);
});

// Disable button if clicked
function handleGuess(letter) {
    const button = document.querySelector(`[data-letter="${letter}"]`);
    button.disabled = true;
}
