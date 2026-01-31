const msg = document.querySelector(".msg");
const guess = document.querySelector("input");
const btn = document.querySelector(".btn");
let play = false;
let newWords = "";
let randWords = "";
let sWords = [
  "planet", "developer", "mirror", "neon",
  "matrix", "javascript", "friend", "flower"
];


const createNewWords = () => {
    let randomNum = Math.floor(Math.random() * sWords.length);
    // console.log(randomNum);
    let newTempSwords = sWords[randomNum];
    // console.log(newTempSwords.split(""));
    
    return newTempSwords;
}

const scrambleWords = (arr) => {
    for (let i = arr.length - 1; i>0; i--) {
        let temp = arr[i];
        // console.log(temp);
        let j = Math.floor(Math.random()*(i+1));
        // console.log(i);
        // console.log(j);

        arr[i] = arr[j];
        arr[j] = temp;

        return arr;          
    }
}


btn.addEventListener("click", function(){
    if(!play) {
        play = true;
        btn.innerHTML = "Guess";
        guess.classList.toggle("hidden");
        newWords = createNewWords();
        randWords = scrambleWords(newWords.split(""));
    }
})