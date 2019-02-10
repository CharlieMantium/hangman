const gameWrapper = document.querySelector('.game-wrapper');
const alphabet = [...'abcdefghijklmnopqrstuvwxyz'];

gameSetup();

function gameSetup() {
  alphabet.forEach((item, i) => {
    let insertedDiv = document.createElement('div');
    let paragraph = document.createElement('p');
    let letter = String.fromCharCode(i + 97);
    paragraph.innerHTML = letter;
    insertedDiv.append(paragraph);
    addLetterClasses(insertedDiv, letter, i);
    gameWrapper.appendChild(insertedDiv);
  })
}

function addLetterClasses(letterDiv, letter, i) {
  letterDiv.classList.add('letter-wrapper', `${letter}`);
  if (i === 0) {
    letterDiv.classList.add('top-left');
  } else if (i > 0 && i < 6) {
    letterDiv.classList.add('top');
  } else if (i === 6) {
    letterDiv.classList.add('top-right');
  } else if (i > 6 && i < 13) {
    letterDiv.classList.add('right');
  } else if (i === 13) {
    letterDiv.classList.add('bottom-right');
  } else if (i > 13 && i < 19) {
    letterDiv.classList.add('bottom');
  } else if (i === 19) {
    letterDiv.classList.add('bottom-left');
  } else {
    letterDiv.classList.add('left');
  }
  return letterDiv;
}
