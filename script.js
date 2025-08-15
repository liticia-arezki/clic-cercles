let playerName = "";
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
const replayBtn = document.getElementById("replay-btn");
const closeBtn = document.getElementById("close-btn");
const fireworksContainer = document.getElementById("fireworks-container");

// cacher le popup de fin au départ
endPopup.style.display = "none";

// démarrer le jeu
startBtn.addEventListener("click", () => {
    const name = playerInput.value.trim();
    if (!name) {
        alert("Veuillez entrer votre nom !");
        return;
    }
    playerName = name;
    popup.style.display = "none";
    startGame();
});

function startGame() {
    score = 0;
    remainingTime = gameTime;
    scoreDisplay.textContent = score;
    gameContainer.innerHTML = "";
    endPopup.style.display = "none";

    // faire apparaître le cercle toutes les 800ms
    circleInterval = setInterval(createCircle, 800);

    // compteur de temps
    gameInterval = setInterval(() => {
        remainingTime--;
        if (remainingTime <= 0) {
            endGame();
        }
    }, 1000);
}

function createCircle() {
    const circle = document.createElement("div");
    circle.classList.add("circle");
    // couleurs plus foncées
    const colors = ["#D6336C", "#6F42C1", "#0D6EFD"];
    circle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    const size = Math.floor(Math.random() * 50) + 30;
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${Math.random() * (gameContainer.clientHeight - size)}px`;
    circle.style.left = `${Math.random() * (gameContainer.clientWidth - size)}px`;

    circle.addEventListener("click", () => {
        score++;
        scoreDisplay.textContent = score;
        circle.remove();
    });

    gameContainer.appendChild(circle);

    // cercle disparaît après 1.2 secondes
    setTimeout(() => {
        if (circle.parentNode) circle.remove();
    }, 1200);
}

function endGame() {
    clearInterval(gameInterval);
    clearInterval(circleInterval);
    gameContainer.innerHTML = "";

    // afficher le message de fin
    endPopup.style.display = "flex";
    if (score > 15) {
        endMessage.textContent = `🎆 Félicitations ${playerName} ! Tu es mieux que Litia 🎆`;
        endMessage.style.color = "#6F42C1"; // foncé
        startFireworks();
    } else {
        endMessage.textContent = `You lose 😿 ${playerName}`;
        endMessage.style.color = "#D6336C"; // rouge foncé
    }

    saveScore();
    displayAllScores();
}

// boutons fin
replayBtn.addEventListener("click", () => {
    stopFireworks();
    startGame();
});

closeBtn.addEventListener("click", () => {
    endPopup.style.display = "none";
    stopFireworks();
});

// gestion des feux d'artifice
function startFireworks() {
    fireworksContainer.innerHTML = "";
    fireworksInterval = setInterval(() => {
        const firework = document.createElement("div");
        firework.classList.add("firework");
        firework.style.top = `${Math.random() * window.innerHeight}px`;
        firework.style.left = `${Math.random() * window.innerWidth}px`;
        fireworksContainer.appendChild(firework);

        setTimeout(() => {
            firework.remove();
        }, 1000);
    }, 200);
}

function stopFireworks() {
    clearInterval(fireworksInterval);
    fireworksContainer.innerHTML = "";
}

// scores dans localStorage
function saveScore() {
    let bestScores = JSON.parse(localStorage.getItem("bestScores")) || [];
    bestScores.push({ name: playerName, score: score });
    localStorage.setItem("bestScores", JSON.stringify(bestScores));
}

function displayAllScores() {
    const allScoresList = document.getElementById("all-scores");
    allScoresList.innerHTML = "";
    const bestScores = JSON.parse(localStorage.getItem("bestScores")) || [];
    bestScores.forEach(s => {
        const li = document.createElement("li");
        li.textContent = `${s.name} : ${s.score} points 😺`;
        allScoresList.appendChild(li);
    });
}
