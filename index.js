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
    timeLeft = Math.max(8, 20 - level * 3);
    // console.log(timeLeft);

    timer = setInterval(() => {
        timeLeft--;
        btn.innerHTML = `Guess (${timeLeft}s)`;

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

        clearInterval(timer);
        startTimer();
    } else {
        let tempWord = guess.value;

        if (tempWord.toLocaleLowerCase() === newWords.toLocaleLowerCase()) {
            // console.log("correct");
            clearInterval(timer);
            correctSound.play();

            score++;
            if (score % 3 === 0) level++;

            play = false;
            msg.innerHTML = `✅ Correct! Level: ${level} | Score: ${score}`;
            msg.innerHTML = "🎉 Correct!";
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

            
             msg.innerHTML = `❌ Wrong! Try again ${randWords}`;
             guess.value = "";  
        }

    }
})