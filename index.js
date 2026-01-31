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
    msg.innerHTML = `⏱ Time Left: ${timeLeft}s | Word: ${randWords}`;

    timer = setInterval(() => {
        timeLeft--;
        msg.innerHTML = `⏱ Time Left: ${timeLeft}s | Word: ${randWords}`;

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
    if(!play) {
        play = true;
        btn.innerHTML = "Guess";
        guess.classList.toggle("hidden");

        newWords = createNewWords();
        randWords = scrambleWords(newWords.split("")).join("");
        msg.innerHTML = randWords;

        clearInterval(timer);
        startTimer();
    } else {
        let tempWord = guess.value;
        if(tempWord === newWords) {
            console.log("correct");
            play = false;
            msg.innerHTML = `Awesome It's Correct. it is ${newWords}`;
            btn.innerHTML = "Start Again";
            guess.classList.toggle("hidden");
            guess.value = "";

        } else {
            console.log("incorrect");
             msg.innerHTML = `Sorry. It's incorrect. Plz try again ${randWords}`;
             guess.value = "";
            
        }

    }
})