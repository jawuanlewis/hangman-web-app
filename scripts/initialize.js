const levels = document.querySelectorAll(".level-frame");

levels.forEach((level) => {
    level.addEventListener("click", () => {
        window.location.href = `/game?level=${level.id}`;
    });
});
