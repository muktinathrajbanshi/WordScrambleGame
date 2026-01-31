const timeBar = document.querySelector(".timeBar span");
let totalTime;

const levelEl = document.querySelector(".level span");
const scoreEl = document.querySelector(".score span");

const msg = document.querySelector(".msg");
const guess = document.querySelector("input");
const btn = document.querySelector(".btn");
let play = false;
let newWords = "";
let randWords = "";
let level = 1;
let score = 0;
let timeLeft = 20;
let timer;
let maxLives = 3;
let lives = maxLives;
const livesEl = document.querySelector(".lives span");

let highScore = localStorage.getItem("highScore") || 0;


const correctSound = new Audio("./sounds/congratulations.mp3");

const wrongSound = new Audio("./sounds/sorry.mp3");

correctSound.volume = 0.8;
wrongSound.volume = 0.8;

let audioUnlocked = false;


const unlockAudio = () => {
    if (!audioUnlocked) {
        correctSound.play().then(() => {
            correctSound.pause();
            correctSound.currentTime = 0;
        });
        wrongSound.play().then(() => {
            wrongSound.pause();
            wrongSound.currentTime = 0;
        });
        audioUnlocked = true;
    }
};

const applyTheme = () => {
    const themes = {
        1: "#00f2ff",
        2: "#7c7cff",
        3: "#ff4ecd",
        4: "#00ff9c"
    };

    document.documentElement.style.setProperty("--accent", themes[level] || "#ff9f43");
};

const wordsByLevel = {
  1: ["cat", "sun", "pen", "tree", "milk"],
  2: ["planet", "friend", "window", "garden", "mirror"],
  3: ["developer", "scramble", "javascript", "frontend"],
  4: ["asynchronous", "authentication", "optimization"]
};


const createNewWords = () => {
    const levelWords = wordsByLevel[level] || wordsByLevel[4];
    // console.log(levelWords);
    const randomNum = Math.floor(Math.random() * levelWords.length);
    // console.log(levelWords[randomNum]);
    return levelWords[randomNum];
}

const startTimer = () => {
    totalTime = Math.max(8, 20 - level * 3);
    timeLeft = totalTime;

    if (timeBar) timeBar.style.width = "100%";

    timer = setInterval(() => {
        timeLeft--;
        btn.innerHTML = `Guess (${timeLeft}s)`;

        if (timeBar) {
            timeBar.style.width = `${(timeLeft / totalTime) * 100}%`;
        }

         if (timeLeft <= 0) {
            clearInterval(timer);
            msg.innerHTML = "⏰ Time's up!";
            btn.innerHTML = "Start Again";
            play = false;
            guess.classList.add("hidden");
        }
    }, 1000);
};

const scrambleWords = (arr) => {
    for (let i = arr.length - 1; i>0; i--) {
        let temp = arr[i];
        // console.log(temp);
        let j = Math.floor(Math.random()*(i+1));
        // console.log(i);
        // console.log(j);

        arr[i] = arr[j];
        arr[j] = temp;          
    }

    return arr;
}


btn.addEventListener("click", function(){

    unlockAudio();

    if(!play) {
        play = true;
        btn.innerHTML = "Guess";
        guess.classList.remove("hidden");

        newWords = createNewWords();
        randWords = scrambleWords(newWords.split("")).join("");
        msg.innerHTML = randWords;

        lives = maxLives;
        livesEl.textContent = lives;

        clearInterval(timer);
        startTimer();
    } else {
        let tempWord = guess.value;

        if (tempWord.toLocaleLowerCase() === newWords.toLocaleLowerCase()) {
            // console.log("correct");
            clearInterval(timer);
            correctSound.play();

            score++;
            if (score > highScore) {
                highScore = score;
                localStorage.setItem("highScore", highScore);
            }

            if (score % 3 === 0) level++;
            applyTheme();

            play = false;
            msg.innerHTML = `🎉 Correct! High Score: ${highScore}`;
            levelEl.textContent = level;
            scoreEl.textContent = score;
            btn.innerHTML = "Start Again";
            guess.classList.add("hidden");
            guess.value = "";

        } else {
            // console.log("incorrect");
            wrongSound.play();
            document.querySelector(".gameArea").classList.add("wrong");
            setTimeout(() => {
            document.querySelector(".gameArea").classList.remove("wrong");
            }, 400);

            lives--;
            livesEl.textContent = lives;

             msg.innerHTML = `❌ Wrong! ${randWords} | Lives left: ${lives}`;

             if (lives <= 0) {
                clearInterval(timer);
                msg.innerHTML =`💀 Game Over! Final Score: ${score}`;
                btn.innerHTML = "Restart Game";
                play = false;
                guess.classList.add("hidden");
                lives = maxLives; 
                livesEl.textContent = lives;
                guess.value = "";
             } else {
                guess.value = "";  
             }
        }

    }
})

guess.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && play) {
        btn.click();
    }
});