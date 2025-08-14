const circle = document.getElementById("circle");
const gameContainer = document.getElementById("game-container");
const scoreSpan = document.getElementById("score");
const popup = document.getElementById("popup");
const startBtn = document.getElementById("start-btn");
const playerNameInput = document.getElementById("player-name");
const congratsPopup = document.getElementById("congrats-popup");
const finalMessage = document.getElementById("final-message");
const closeBtn = document.getElementById("close-btn");
const replayBtn = document.getElementById("replay-btn");
const allScores = document.getElementById("all-scores");

let score = 0;
let playerName = "";
let timeLeft = 35;
let gameInterval;
let countdownInterval;
let fireworksInterval;

// Afficher popup au départ
popup.style.display = "flex";

// Fonction pour générer un cercle à une position aléatoire
function moveCircle() {
    const maxX = gameContainer.clientWidth - 50;
    const maxY = gameContainer.clientHeight - 50;
    circle.style.left = Math.random() * maxX + "px";
    circle.style.top = Math.random() * maxY + "px";
    circle.style.backgroundColor = randomColor();
}

function randomColor() {
    const colors = ["#6a1b9a", "#9b59b6", "#8e44ad", "#4b0082"];
    return colors[Math.floor(Math.random() * colors.length)];
}

function startGame() {
    playerName = playerNameInput.value.trim() || "Joueur";
    popup.style.display = "none";
    score = 0;
    scoreSpan.textContent = score;
    circle.style.display = "block";

    gameInterval = setInterval(moveCircle, 800);
    countdownInterval = setTimeout(endGame, timeLeft * 1000);
}

function endGame() {
    clearInterval(gameInterval);
    circle.style.display = "none";
    congratsPopup.style.display = "flex";
    displayFinalMessage();
    showFireworks();
    saveScore();
    displayScores();
}

function displayFinalMessage() {
    if (score === 0) {
        finalMessage.textContent = "😿 You Lose !";
    } else if (score > 15) {
        finalMessage.textContent = `🎆 Félicitations ! Tu es mieux que Litia ! 🎆`;
    } else {
        finalMessage.textContent = `👍 Bien joué ! Score : ${score}`;
    }
}

function showFireworks() {
    fireworksInterval = setInterval(() => {
        for (let i = 0; i < 30; i++) {
            const firework = document.createElement("div");
            firework.classList.add("firework");
            firework.style.left = Math.random() * window.innerWidth + "px";
            firework.style.top = Math.random() * window.innerHeight + "px";
            document.body.appendChild(firework);
            setTimeout(() => document.body.removeChild(firework), 1000);
        }
    }, 500);
}

function saveScore() {
    let bestScores = JSON.parse(localStorage.getItem("bestScores")) || [];
    bestScores.push({ name: playerName, score: score });
    localStorage.setItem("bestScores", JSON.stringify(bestScores));
}

function displayScores() {
    allScores.innerHTML = "";
    const scores = JSON.parse(localStorage.getItem("bestScores")) || [];
    scores.forEach(entry => {
        allScores.innerHTML += `<li>${entry.name} : ${entry.score} points 😺</li>`;
    });
}

// Cliquer sur cercle
circle.addEventListener("click", () => {
    score++;
    scoreSpan.textContent = score;
});

// Fermer popup
closeBtn.addEventListener("click", () => {
    congratsPopup.style.display = "none";
    clearInterval(fireworksInterval);
});

// Rejouer
replayBtn.addEventListener("click", () => {
    congratsPopup.style.display = "none";
    clearInterval(fireworksInterval);
    timeLeft = 35;
    startGame();
});

// Démarrer le jeu
startBtn.addEventListener("click", startGame);
