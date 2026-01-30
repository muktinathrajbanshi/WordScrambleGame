const msg = document.querySelector(".msg");
const guess = document.querySelector("input");
const btn = document.querySelector(".btn");
let play = false;
let sWords = [
  "planet", "developer", "mirror", "neon",
  "matrix", "javascript", "friend", "flower"
];


const createNewWords = () => {
    let randomNum = Math.floor(Math.random() * sWords.length);
    console.log(randomNum);
    
    
}

btn.addEventListener("click", function(){
    if(!play) {
        play = true;
        btn.innerHTML = "Guess";
        guess.classList.toggle("hidden");
        createNewWords();
    }
})