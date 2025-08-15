let playerName = '';
let score = 0;
let gameInterval;
let circleInterval;
let fireworksInterval;
let gameTime = 35; // secondes
let remainingTime = gameTime;

const popup = document.getElementById("popup");
const startBtn = document.getElementById("start-btn");
const playerInput = document.getElementById("player-name");
const gameContainer = document.getElementById("game-container");
const scoreDisplay = document.getElementById("score-display");
const endPopup = document.getElementById("end-popup");
const endMessage = document.getElementById("end-message");
const allScoresList = document.getElementById("all-scores");
const closeBtn = document.getElementById("close-btn");
const replayBtn = document.getElementById("replay-btn");

startBtn.onclick = () => {
    if (!playerInput.value.trim()) {
        alert("Veuillez entrer votre nom !");
        return;
    }
    playerName = playerInput.value.trim();
    popup.style.display = "none";
    startGame();
};

function startGame() {
    score = 0;
    remainingTime = gameTime;
    scoreDisplay.textContent = `Score : ${score}`;
    gameContainer.innerHTML = '';
    endPopup.style.display = "none";

    gameInterval = setInterval(() => {
        remainingTime--;
        if (remainingTime <= 0) {
            endGame();
        }
    }, 1000);

    spawnCircle();
    circleInterval = setInterval(spawnCircle, 1000);
}

function spawnCircle() {
    const circle = document.createElement("div");
    circle.classList.add("circle");
    circle.style.background = randomColor();
    circle.style.top = Math.random() * (gameContainer.clientHeight - 50) + "px";
    circle.style.left = Math.random() * (gameContainer.clientWidth - 50) + "px";
    gameContainer.appendChild(circle);

    circle.onclick = () => {
        score++;
        scoreDisplay.textContent = `Score : ${score}`;
        circle.remove();
    };

    setTimeout(() => { circle.remove(); }, 1000);
}

function randomColor() {
    const colors = ["#ff66b2", "#cc33ff", "#6600cc", "#9933ff", "#ff99ff"];
    return colors[Math.floor(Math.random() * colors.length)];
}

function endGame() {
    clearInterval(gameInterval);
    clearInterval(circleInterval);

    if (score > 15) {
        startFireworks();
        endMessage.innerHTML = `🎆 Félicitations ${playerName} ! Tu es mieux que Liticia 🎆`;
    } else if (score === 0) {
        endMessage.innerHTML = "You lose 😿";
    } else {
        endMessage.innerHTML = `Score : ${score}`;
    }

    saveScore();
    displayScores();
    endPopup.style.display = "flex";
}

function saveScore() {
    const scores = JSON.parse(localStorage.getItem("bestScores")) || [];
    scores.push({name: playerName, score: score});
    localStorage.setItem("bestScores", JSON.stringify(scores));
}

function displayScores() {
    allScoresList.innerHTML = '';
    const scores = JSON.parse(localStorage.getItem("bestScores")) || [];
    scores.forEach(s => {
        const li = document.createElement("li");
        li.textContent = `${s.name} : ${s.score} points 😺`;
        allScoresList.appendChild(li);
    });
}

closeBtn.onclick = () => {
    endPopup.style.display = "none";
    stopFireworks();
};

replayBtn.onclick = () => {
    popup.style.display = "none";
    startGame();
};

// Fireworks
function startFireworks() {
    fireworksInterval = setInterval(() => {
        const firework = document.createElement("div");
        firework.classList.add("firework");
        firework.style.top = Math.random() * window.innerHeight + "px";
        firework.style.left = Math.random() * window.innerWidth + "px";
        document.body.appendChild(firework);
        setTimeout(() => firework.remove(), 1000);
    }, 200);
}

function stopFireworks() {
    clearInterval(fireworksInterval);
}
