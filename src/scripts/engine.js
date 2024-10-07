const emojis = [
    "💵", "💵", "😂", "😂", "😍", "😍", "🤡", "🤡",
    "💀", "💀", "👻", "👻", "👽", "👽", "😈", "😈"
];

let openCards = [];
let matchedCards = [];
let attempts = 0;
let timeLeft = 60;
let timer;
let shuffleEmojis = emojis.sort(() => Math.random() - 0.5);

// Setup the game
function setupGame() {
    const gameContainer = document.querySelector(".game");
    gameContainer.innerHTML = ""; // Clear previous game
    shuffleEmojis.forEach((emoji, index) => {
        const box = document.createElement("div");
        box.classList.add("item");
        box.dataset.emoji = emoji;
        box.dataset.index = index;
        box.innerHTML = emoji;
        box.onclick = handleClick;
        gameContainer.appendChild(box);
    });
}

// Handle card click
function handleClick() {
    if (openCards.length < 2 && !this.classList.contains('boxOpen')) {
        this.classList.add('boxOpen');
        openCards.push(this);
    }

    if (openCards.length === 2) {
        attempts++;
        document.getElementById("attempts").innerText = attempts;
        setTimeout(checkMatch, 500);
    }
}

// Check if two cards match
function checkMatch() {
    const [card1, card2] = openCards;
    if (card1.dataset.emoji === card2.dataset.emoji) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedCards.push(card1, card2);
        if (matchedCards.length === emojis.length) {
            clearInterval(timer);
            setTimeout(() => alert("Congratulations! You've won!"), 500);
        }
    } else {
        card1.classList.remove('boxOpen');
        card2.classList.remove('boxOpen');
    }
    openCards = [];
}

// Start the timer
function startTimer() {
    timer = setInterval(function() {
        document.getElementById("time").innerHTML = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            alert("Game Over! Time's up!");
            resetGame();
        }
        timeLeft--;
    }, 1000);
}

// Reset the game
function resetGame() {
    timeLeft = 60;
    attempts = 0;
    openCards = [];
    matchedCards = [];
    document.getElementById("time").innerText = timeLeft;
    document.getElementById("attempts").innerText = attempts;
    clearInterval(timer);
    shuffleEmojis = emojis.sort(() => Math.random() - 0.5);
    setupGame();
    startTimer();
}

// Start the game on load
window.onload = () => {
    setupGame();
    startTimer();
};
