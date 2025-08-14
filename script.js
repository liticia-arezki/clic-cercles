let score = 0;
let timeLeft = 30;
let timer;
let gameInterval;

const startBtn = document.getElementById("startBtn");
const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("time");
const gameArea = document.getElementById("gameArea");

if (startBtn) {
    startBtn.addEventListener("click", startGame);
}

function startGame() {
    score = 0;
    timeLeft = 30;
    scoreDisplay.textContent = `Score : ${score}`;
    timeDisplay.textContent = `Temps : ${timeLeft}s`;

    clearInterval(timer);
    clearInterval(gameInterval);

    timer = setInterval(() => {
        timeLeft--;
        timeDisplay.textContent = `Temps : ${timeLeft}s`;
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);

    gameInterval = setInterval(spawnCircle, 800);
}

function spawnCircle() {
    const circle = document.createElement("div");
    circle.classList.add("circle");
    const size = Math.floor(Math.random() * 40) + 30;
    const maxX = gameArea.clientWidth - size;
    const maxY = gameArea.clientHeight - size;
    const x = Math.floor(Math.random() * maxX);
    const y = Math.floor(Math.random() * maxY);

    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;

    circle.addEventListener("click", () => {
        score++;
        scoreDisplay.textContent = `Score : ${score}`;
        circle.remove();
    });

    gameArea.appendChild(circle);

    setTimeout(() => {
        circle.remove();
    }, 1000);
}

function endGame() {
    clearInterval(timer);
    clearInterval(gameInterval);
    alert(`Temps écoulé ! Ton score : ${score}`);

    let scores = JSON.parse(localStorage.getItem("bestScores")) || [];
    scores.push(score);
    scores.sort((a, b) => b - a);
    scores = scores.slice(0, 5); // garder les 5 meilleurs
    localStorage.setItem("bestScores", JSON.stringify(scores));
}
