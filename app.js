const gameWrapper = document.querySelector('.game-wrapper');
const alphabet = [...'abcdefghijklmnopqrstuvwxyz'];
const mainBtn = document.querySelector('.btn');
const imageWrapper = document.querySelector('.image-wrapper');
const sentence = document.querySelector('.sentence');
const sentenceWrapper = document.querySelector('.sentence-wrapper');
const state = {
  roundCounter: 0,
  proverb: '',
  correct: [],
  wrong: [],
  isRunning: false
};
const proverbs = [
  'Grass is always greener on the other side',
  'It takes two to tango',
  'Money makes the world go round'
];

appSetup();

function appSetup() {
  alphabet.forEach((item, i) => {
    let insertedDiv = document.createElement('div');
    let paragraph = document.createElement('p');
    let letter = String.fromCharCode(i + 97);
    paragraph.innerHTML = letter;
    insertedDiv.append(paragraph);
    addClass(insertedDiv, letter, i);
    gameWrapper.appendChild(insertedDiv);
  });
  mainBtn.addEventListener('click', startGame);
}

function startGame() {
  (state.isRunning === true) ? (restartGame()) : (gameSetup());
}

function addClass(insertedDiv, letter, i) {
  insertedDiv.setAttribute("id", `${letter}`);
  insertedDiv.classList.add('letter-wrapper', `${letter}`);
    if (i === 0) {
      insertedDiv.classList.add('top-left');
    } else if (i > 0 && i < 6) {
      insertedDiv.classList.add('top');
    } else if (i === 6) {
      insertedDiv.classList.add('top-right');
    } else if (i > 6 && i < 13) {
      insertedDiv.classList.add('right');
    } else if (i === 13) {
      insertedDiv.classList.add('bottom-right');
    } else if (i > 13 && i < 19) {
      insertedDiv.classList.add('bottom');
    } else if (i === 19) {
      insertedDiv.classList.add('bottom-left');
    } else {
      insertedDiv.classList.add('left');
    }
  return insertedDiv;
}

function gameSetup() {
  addLetterListeners();
  insertNextImg();
  state.proverb = proverbs[getRandomInt(proverbs.length)].toLowerCase();
  state.isRunning = true;
  displayProgress();
  mainBtn.innerHTML = 'RESTART GAME';
}

function displayProgress() {
  sentence.innerHTML = encryptProverb();
}

function addLetterListeners() {
  const letters = document.querySelectorAll('.letter-wrapper');
  [...letters].forEach(item => item.addEventListener('click', () => {
    if ([...state.correct, ...state.wrong].includes(item.id)) return;
    letterCheck(item.id);
  }));
}

function insertNextImg() {
  let insertedImg = document.createElement('img');
  insertedImg.classList.add('image');
  insertedImg.src = `img/s${state.wrong.length}.jpg`;
  imageWrapper.innerHTML = '';
  imageWrapper.appendChild(insertedImg);
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function encryptProverb() {
  let encryptedArray = [...state.proverb].map(letter => {
    if (state.correct.indexOf(letter) === -1) {
      return (letter === ' ') ? (encryptedLetter = '-') : (encryptedLetter = '_');
    } else {
      return letter;
    }
  })
  return encryptedArray.join('');
}

function letterCheck(clickedLetter) {
  state.roundCounter++;
  (state.proverb.includes(clickedLetter)) ? (correctGuess(clickedLetter)) : (wrongGuess(clickedLetter));
  displayProgress();
}

function correctGuess(letter) {
  state.correct.push(letter);
  if (state.correct.length === uniqueProverbLettersLength()) gameOver(true);
  const clickedLetter = document.querySelector('.' + letter);
  clickedLetter.classList.add('clicked', 'clicked-correct');
}

function uniqueProverbLettersLength() {
  const uniqueLetters = [];
  [...state.proverb].forEach((item) => {if (uniqueLetters.includes(item) === false && item !== ' ') uniqueLetters.push(item)});
  return uniqueLetters.length;
}

function wrongGuess(letter) {
  state.wrong.push(letter);
  const clickedLetter = document.querySelector('.' + letter);
  clickedLetter.classList.add('clicked', 'clicked-wrong');
  insertNextImg();
  if (state.wrong.length === 9) {
    gameOver(false);
  }
}

function gameOver(win) {
  mainBtn.innerHTML = 'PLAY AGAIN?';
  alphabet.forEach(item => state.correct.push(item));
  sentenceWrapper.classList.add(win ? 'win' : 'lose');
}

function restartGame() {
  state.roundCounter = 0;
  state.proverb = '';
  state.correct = [];
  state.wrong = [];
  const usedLetters = document.querySelectorAll('.clicked');
  [...usedLetters].forEach(item => item.classList.remove('clicked', 'clicked-wrong', 'clicked-correct'));
  sentenceWrapper.classList.remove('win', 'lose');
  gameSetup();
}
