const gameWrapper = document.querySelector('.game-wrapper');
const alphabet = [...'abcdefghijklmnopqrstuvwxyz']
const mainBtn = document.querySelector('.btn');
const imageWrapper = document.querySelector('.image-wrapper');
const sentence = document.querySelector('.sentence');
let roundCounter = 1;
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
  const letters = document.querySelectorAll('.letter-wrapper');
  [...letters].forEach(item => item.addEventListener('click', function(item) {
    let pickedLetter = item.target.innerHTML;
    if (pickedLetter.charAt(0) === '<') {
      letterCheck(pickedLetter.charAt(3));
    } else {
      letterCheck(pickedLetter);
    }
  }));
  imageWrapper.innerHTML = '';
  let insertedImg = document.createElement('img');
  insertedImg.classList.add('image');
  insertedImg.src = 'img/s0.jpg';
  imageWrapper.appendChild(insertedImg);
  let rndPickedProverb = proverbs[getRandomInt(proverbs.length)];
  sentence.innerHTML = encryptSentence(rndPickedProverb);
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function encryptSentence(inputSentence) {
  let encryptedArray = [...inputSentence].map(letter => {
    if (letter === ' ') {
      encryptedLetter = '-';
    } else {
      encryptedLetter = '_';
    }
    return encryptedLetter;
  })
  return encryptedArray.join('');
}

letterCheck() {
  // to be continued...
}
