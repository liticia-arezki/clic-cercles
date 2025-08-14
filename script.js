// === VARIABLES ===
let playerName = "";
let score = 0;
let timeLeft = 20;
let gameInterval, countdown;

const circle = document.getElementById("circle");
const scoreDisplay = document.getElementById("score");
const popup = document.getElementById("popup");
const popupContent = document.getElementById("popup-content");
const playerInput = document.getElementById("player-name");

const congratsPopup = document.createElement("div");
congratsPopup.id = "congrats-popup";
congratsPopup.style.cssText = "display:none; position:fixed; top:0; left:0; width:100vw; height:100vh; background: rgba(0,0,0,0.7); justify-content:center; align-items:center; flex-direction:column; z-index:1000;";
document.body.appendChild(congratsPopup);

const allScores = document.getElementById("all-scores") || document.getElementById("scoreList");

// === START GAME ===
function startGame() {
    playerName = playerInput.value.trim() || "Anonyme";
    popup.style.display = "none";
    score = 0;
    timeLeft = 20;
    scoreDisplay.textContent = score;

    moveCircle();
    gameInterval = setInterval(moveCircle, 1000);
    countdown = setTimeout(endGame, timeLeft * 1000);

    circle.addEventListener("click", incrementScore);
}

// === MOVE CIRCLE ===
function moveCircle() {
    const container = document.getElementById("game-container");
    const maxX = container.clientWidth - 50;
    const maxY = container.clientHeight - 50;

    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    // couleurs foncées
    const colors = ["#8B008B", "#4B0082", "#800080", "#483D8B", "#2F4F4F"];
    const color = colors[Math.floor(Math.random() * colors.length)];

    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;
    circle.style.backgroundColor = color;
}

// === INCREMENT SCORE ===
function incrementScore() {
    score++;
    scoreDisplay.textContent = score;
}

// === END GAME ===
function endGame() {
    clearInterval(gameInterval);
    circle.removeEventListener("click", incrementScore);

    saveScore();

    showCongrats();
}

// === SAVE SCORE ===
function saveScore() {
    let scores = JSON.parse(localStorage.getItem("bestScores")) || [];
    scores.push({name: playerName, score: score});
    localStorage.setItem("bestScores", JSON.stringify(scores));
}

// === SHOW CONGRATS ===
function showCongrats() {
    allScores.innerHTML = "";

    const scores = JSON.parse(localStorage.getItem("bestScores")) || [];
    scores.forEach(s => {
        const li = document.createElement("li");
        li.textContent = `${s.name} : ${s.score} points 😺`;
        allScores.appendChild(li);
    });

    congratsPopup.innerHTML = "";
    const text = document.createElement("p");
    text.style.color = "#4B0082"; // couleur foncée
    text.style.fontSize = "24px";
    text.style.marginBottom = "20px";
    text.style.textAlign = "center";

    if(score > 20){
        text.textContent = `🎆 Félicitations ${playerName} ! Tu es mieux que Litia ! 🎆`;
        createFireworks(20); // 20 feux
    } else if(score === 0){
        text.textContent = `You lose 😿`;
    } else {
        text.textContent = `Bien joué ${playerName} ! Score : ${score}`;
    }

    congratsPopup.appendChild(text);

    // BOUTON REJOUER sous les scores
    const replayBtn = document.createElement("button");
    replayBtn.textContent = "Rejouer";
    replayBtn.style.marginTop = "20px";
    replayBtn.onclick = replayGame;
    allScores.appendChild(replayBtn);

    // BOUTON FERMER
    const closeBtn = document.createElement("button");
    closeBtn.textContent = "Fermer";
    closeBtn.style.marginTop = "10px";
    closeBtn.onclick = () => congratsPopup.style.display = "none";
    congratsPopup.appendChild(closeBtn);

    congratsPopup.style.display = "flex";
}

// === REPLAY GAME ===
function replayGame() {
    congratsPopup.style.display = "none";
    score = 0;
    scoreDisplay.textContent = score;
    timeLeft = 20;

    moveCircle();
    gameInterval = setInterval(moveCircle, 1000);
    countdown = setTimeout(endGame, timeLeft * 1000);

    circle.addEventListener("click", incrementScore);
}

// === FIREWORKS ===
function createFireworks(n) {
    const container = document.getElementById("game-container");
    for(let i=0; i<n; i++){
        const firework = document.createElement("div");
        firework.className = "firework";
        firework.style.left = Math.random()*container.clientWidth + "px";
        firework.style.top = Math.random()*container.clientHeight + "px";
        container.appendChild(firework);
        setTimeout(() => firework.remove(), 1000);
    }
}
