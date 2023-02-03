let duration = 1000;
minutes = 1;
interval = 0;
startGame = document.querySelector('.start-game');
nameField = document.querySelector('.content input');
startBtn = document.querySelector('.content .start');
Info = document.querySelector('.info');
nameInfo = document.querySelector('.name span');
moves = document.querySelector('.moves span');
Timer = document.querySelector('.timer');
info = document.querySelector('.info');
containerBlocks = document.querySelector('.container-blocks');
gameResult = document.querySelector('.game-result');
socreResult = document.querySelector('.score-result');
resultTitle = document.querySelector('.result');
playAgainBtn = document.querySelector('.play-again');
blocksArray = Array.from(document.querySelectorAll('.block'));
orderRange = [...Array(blocksArray.length).keys()];
blockMatched = [];


// Start Game Function
startBtn.addEventListener('click', (event) => {
  if(nameField.value === '') {
    event.preventDefault();
  } else {
    // appear username 
    nameInfo.textContent = nameField.value;

    // Appear main divs
    info.classList.add('active');
    setTimeout(() => {
      containerBlocks.classList.add('active');

      setTimeout(() => { // Appear boxes on time when start game
        blocksArray.forEach(block => block.classList.add('appears-block'));

        setTimeout(() => { // disappear boxes on time when start game
          blocksArray.forEach(block => block.classList.remove('appears-block'));
        }, 2000);

        shuffle(orderRange);

        setTimeout(() => {
          reorderBlocks(orderRange);
          flipCard();
          countdown();
        }, 1000);

      }, 500);

    }, 500);

    startGame.remove();
  }
});


const countdown = () => {
  // set time for the particular countdown
  let time = minutes * 60 + 0;
  interval = setInterval(function() {
    // if the time is 0 then end the counter
    if(time == 0) {
      clearInterval(interval);
      appearResult();
    }

    let minutes = Math.floor(time / 60);
    if(minutes < 10) minutes = "0" + minutes;
    let seconds = time % 60;
    if(seconds < 10) seconds = "0" + seconds;
    let text = `Time: ${minutes} min ${seconds} sec`;
    Timer.innerHTML = text;
    time--;
  }, 1000);
};

// shuffle Function
const shuffle = (array) => {
  let arrLength = array.length;
  swap = 0;
  randomIndex = 0;

  while(arrLength > 0) {
    randomIndex = Math.floor(Math.random() * arrLength);

    arrLength--; // decreaise Iterable

    // swap indexes
    swap = array[arrLength];
    array[arrLength] = array[randomIndex];
    array[randomIndex] = swap;
  }
};

// reordered Function
const reorderBlocks = (orderRange) => blocksArray.forEach((block, index) => block.style.order = orderRange[index]);

// flipcard function
const flipCard = () => {
  blocksArray.forEach((block) => {
    block.addEventListener('click', () => {
      flippedCard(block);

      moves.textContent = parseInt(moves.textContent) + 1;
    });
  });
};

const flippedCard = (block) => {
  block.classList.add('flipped');

  let filterFlipped = blocksArray.filter(block => block.classList.contains('flipped'));

  if(filterFlipped.length === 2) {
    // Stop clicking
    unClickable();

    // checker
    Checker(filterFlipped[0], filterFlipped[1]);

    if(blockMatched.length === 16) {
      appearResult();
      clearInterval(interval);
    }
  }
};

// trigger Function
const unClickable = () => {
  containerBlocks.classList.add('unclickable');

  setTimeout(() => containerBlocks.classList.remove('unclickable'), duration);
};

// Checker Function
const Checker = (f_choice, s_choice) => {

  if(f_choice.dataset.social === s_choice.dataset.social) {
    f_choice.classList.remove('flipped');
    s_choice.classList.remove('flipped');

    f_choice.classList.add('match');
    s_choice.classList.add('match');

    blockMatched.push(f_choice, s_choice);
  } else {
    setTimeout(() => {

      f_choice.classList.remove('flipped');
      s_choice.classList.remove('flipped');

    }, duration);
  }
};

const appearResult = () => {
  socreResult.textContent = moves.textContent;

  gameResult.classList.add('appear-result');

  if(socreResult.textContent === '16') {
    resultTitle.textContent = 'excellent';
    resultTitle.style.color = 'green';
  }
  else if(socreResult.textContent > '16' && socreResult.textContent <= '25') {
    resultTitle.textContent = 'Very Good';
    resultTitle.style.color = 'white';
  } else if(socreResult.textContent > '25') {
    resultTitle.textContent = 'Improve your Memory';
    resultTitle.style.color = 'red';
  }
};


const playAgain = () => {
  window.location.reload();
};

// Event Play again
playAgainBtn.addEventListener('click', () => playAgain());