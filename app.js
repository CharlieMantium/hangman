const gameWrapper = document.querySelector('.game-wrapper');
const mainBtn = document.querySelector('.btn');
const imageWrapper = document.querySelector('.image-wrapper');
const sentence = document.querySelector('.sentence');
const sentences = [
  'Grass is always greener on the other side',
  'It takes two to tango',
  'Money makes the world go round'
];

appSetup();

function appSetup() {
  for (i = 0; i < 26; i++) {
    let insertedDiv = document.createElement('div');
    let paragraph = document.createElement('p');
    let letter = String.fromCharCode(i + 97);
    paragraph.innerHTML = letter;
    insertedDiv.append(paragraph);
    insertedDiv.classList.add('letter-wrapper', `${letter}`, 'border-all');
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
    gameWrapper.appendChild(insertedDiv);
  }
  mainBtn.addEventListener('click', gameSetup);
}

function gameSetup() {
  const letters = document.querySelectorAll('.letter-wrapper');
  letters.forEach(item => item.addEventListener('click', event => alert(`CHUJ`)));
  imageWrapper.innerHTML = '';
  let insertedImg = document.createElement('img');
  insertedImg.classList.add('image');
  insertedImg.src = 'img/s0.jpg';
  imageWrapper.appendChild(insertedImg);
  sentence.innerHTML = '';
  sentence.innerHTML = encryptSentence(sentences[getRandomInt(sentences.length)]);
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function encryptSentence(proverb) {
  encryptedArray = [...proverb].map(letter => {
    if (letter === ' ') {
      encryptedLetter = '-';
    } else {
      encryptedLetter = '_';
    }
    return encryptedLetter;
  })
  return encryptedArray.join('');
}
