const wordEl = document.getElementById("word");
const popup = document.getElementById("popup-container");
const messageEl = document.getElementById("success-message");
const wrongLettersEl = document.getElementById("wrong-letters");
const items = document.querySelectorAll(".item");
const message = document.getElementById("message");
const playAgainBtn = document.getElementById("play-again");

const correctLetters = [];
const wrongLetters = [];
let selectedWord = getRandomWord();

function getRandomWord() {
  const words = ["javascript", "java", "python", "css", "html"];

  return words[Math.floor(Math.random() * words.length)];
}

function displayWord() {
  wordEl.innerHTML = `
${selectedWord
  .split("")
  .map(
    (letter) => `
<div class="letter">
${correctLetters.includes(letter) ? letter : ""}
</div>`
  )
  .join("")}

`;

  const w = wordEl.innerText.replace(/\n/g, "");
  if (w === selectedWord) {
    popup.style.display = "flex";
    messageEl.innerText = "Congrulations Winner.";
  }

  //   console.log(wordEl.innerText.replace(/\n/g, "")); //? bilinen kelimeleri ekrana yazdirdim
}

//* function updateWrongLetters() burada hatali harfler girildikce adam olusturuluyor.
function updateWrongLetters() {
  wrongLettersEl.innerHTML = `
${wrongLetters.length > 0 ? `<h3>Wrong Letters</h3>` : ""}
${wrongLetters.map((letter) => `<span>${letter}</span>`)}
`;

  items.forEach((item, index) => {
    const errorCount = wrongLetters.length;

    if (index < errorCount) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });

  if (wrongLetters.length === items.length) {
    popup.style.display = "flex";
    messageEl.innerText = "unfortunately you lost";
  }
}

function displayMessage() {
  message.classList.add("show");

  setTimeout(function () {
    message.classList.remove("show");
  }, 2000);
}

playAgainBtn.addEventListener("click", function () {
  correctLetters.splice(0);
  wrongLetters.splice(0);

  selectedWord = getRandomWord();

  displayWord();
  updateWrongLetters();

  popup.style.display = "none";
});

window.addEventListener("keydown", function (e) {
  // console.log(e.key); //* klavye tuslarinin numaralarini bulmak icin
  // console.log(e.keyCode);
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;

    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        displayWord();
      } else {
        displayMessage();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
        // console.log("update incorrect letters.");
        updateWrongLetters();
      } else {
        displayMessage();
      }
    }
  }
});

displayWord();
