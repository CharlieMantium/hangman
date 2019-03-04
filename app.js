const gameWrapper = document.querySelector('.game-wrapper');
const alphabet = [...'abcdefghijklmnopqrstuvwxyz'];
const mainBtn = document.querySelector('.btn');
const imageWrapper = document.querySelector('.image-wrapper');
const sentence = document.querySelector('.sentence');
const state = {
  roundCounter: 0,
  proverb: '',
  correct: [],
  wrong: []
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
  mainBtn.addEventListener('click', gameSetup);
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
  displayProgress();
}

function displayProgress() {
  sentence.innerHTML = encryptProverb();
}

function addLetterListeners() {
  const letters = document.querySelectorAll('.letter-wrapper');
  [...letters].forEach(item => item.addEventListener('click', () => letterCheck(item.id)));
}

function insertNextImg() {
  let insertedImg = document.createElement('img');
  insertedImg.classList.add('image');
  insertedImg.src = `img/s${state.roundCounter}.jpg`;
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
  (state.proverb.includes(clickedLetter) === true) ? (state.correct.push(clickedLetter)) : (state.wrong.push(clickedLetter));
  displayProgress();
}
