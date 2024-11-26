const levels = document.querySelectorAll(".level-frame");

levels.forEach((level, index) => {
    level.addEventListener("click", () => {
        window.location.href = `/game?level=${index + 1}`;
    });
});
