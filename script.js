const inp = document.querySelector(".inputs"),
hTag = document.querySelector(".hint span"),
gL = document.querySelector(".guess-left span"),
wL = document.querySelector(".wrong-letter span"),
rB = document.querySelector(".reset-btn"),
tI = document.querySelector(".typing-input");
let word, maxGuesses, incorrectLetters = [], correctLetters = [];
function randomWord() {
    let ranItem = wordList[Math.floor(Math.random() * wordList.length)];
    word = ranItem.word;
    maxGuesses = word.length >= 5 ? 8 : 6;
    correctLetters = []; incorrectLetters = [];
    hTag.innerText = ranItem.hint;
    gL.innerText = maxGuesses;
    wL.innerText = incorrectLetters;
    let html = "";
    for (let i = 0; i < word.length; i++) {
        html += `<input type="text" disabled>`;
        inp.innerHTML = html;
    }
}
randomWord();
function initGame(e) {
    let key = e.target.value.toLowerCase();
    if(key.match(/^[A-Za-z]+$/) && !incorrectLetters.includes(` ${key}`) && !correctLetters.includes(key)) {
        if(word.includes(key)) {
            for (let i = 0; i < word.length; i++) {
                if(word[i] == key) {
                    correctLetters += key;
                    inp.querySelectorAll("input")[i].value = key;
                }
            }
        } else {
            maxGuesses--;
            incorrectLetters.push(` ${key}`);
        }
        gL.innerText = maxGuesses;
        wL.innerText = incorrectLetters;
    }
    tI.value = "";
    setTimeout(() => {
        if(correctLetters.length === word.length) {
            alert(`Congrats! You found the word ${word.toUpperCase()}`);
            return randomWord();
        } else if(maxGuesses < 1) {
            alert("Game over! You don't have remaining guesses");
            for(let i = 0; i < word.length; i++) {
                inp.querySelectorAll("input")[i].value = word[i];
            }
        }
    }, 100);
}
rB.addEventListener("click", randomWord);
tI.addEventListener("input", initGame);
inp.addEventListener("click", () => tI.focus());
document.addEventListener("keydown", () => tI.focus());