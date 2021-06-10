// GLOBAL VARS 
const startBtn = document.querySelector('#startBtn');
const fairGoerCounter = document.querySelector('#fair-goer-counter');
const fairGoerArr= [3, 4, 5, 6, 7, 8];
const gameBoard = document.querySelector('.board-flex-container');
let openedCards= [];
let cowboysList = document.createElement('ul');
const cakeCounterDisplay = document.querySelector('#cake-counter');
let cakeCounter = 0;
let randomFairGoers;
let cardDiv;
let incorrectMatchCounter = 0;
const incorrectMatchCounterDisplay = document.querySelector('.incorrect-matches');
const bigTexImg = document.querySelector('#tex');
const playAgainBtnWin = document.querySelector('#play-again-btn-win');
const playAgainBtnLose = document.querySelector('#play-again-btn-lose');

// FUNCTIONS
// start game function
const handleStartBtnClick = event => {
  event.preventDefault;
// fair-goers number gets assigned and attendee counter populates
  updateFairGoers();
// card deck is shuffled 
//images placed
  addImages();
  disableButton();
};
const disableButton = () => startBtn.disabled = true;
const enableButton = () => startBtn.disabled = false;

startBtn.addEventListener('click', handleStartBtnClick);

// randomly assign number of fair-goers
const updateFairGoers = () => {
  const randomIndex = Math.floor(Math.random() * fairGoerArr.length);
  randomFairGoers = (fairGoerArr[randomIndex]);
  fairGoerCounter.innerHTML = `
  <p>There are ${randomFairGoers} people at the fair. Make ${randomFairGoers} matches.</p>
  `;
  generateVisitors();
};

//populate fair visitors
const generateVisitors = () => {
    for (let i = 0; i < randomFairGoers; i++){
      const cowboy = document.createElement('li');
      cowboy.innerText = '🤠';
      cowboy.setAttribute('class', 'cowboys');
      cowboysList.appendChild(cowboy);
      cowboysList.setAttribute('class', cowboysList);
      fairGoerCounter.appendChild(cowboysList);
    };
};

//create card img array
const cardArr = ['images/skyline.png', 'images/dr-pepper.png', 'images/eggs.png', 'images/ferris-wheel.png', 'images/corn-dog.png', 'images/flour.png', 'images/milk.png', 'images/hat.png'];
const doubledCardArr = [...cardArr, ...cardArr];
 
// shuffle card deck - Fisher-Yates shuffle
function shuffle(array) {
  var currentIndex = array.length,  randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
};

//assign images randomly to card divs
const addImages = () => {
  shuffle(doubledCardArr);
  const cardElements = document.querySelectorAll('.card');
  for (let i = 0; i < doubledCardArr.length; i++) {
    // create a new div
    cardDiv = document.createElement('div');
    // use css to update background image
    cardDiv.setAttribute('id', doubledCardArr[i]);
    cardDiv.style.backgroundImage = `url('${doubledCardArr[i]}'`;
    // add class with display: none
    cardDiv.setAttribute('class', 'cardDisplay');
    cardDiv.classList.add('hide');
    // append the div to the container
    cardElements[i].appendChild(cardDiv);
  }
};

//have them show on click
const matchCards = (event) => {
  event.preventDefault;
  let card; 
  let cardId; 
  if (event.target.classList.contains('card')){
    card = event.target;
    cardId = event.target.firstChild.id;
    card.firstChild.classList.remove('hide');
    openedCards.push(cardId);
    if (openedCards.length > 1) {
      if (openedCards[1] === openedCards[0]) {
        console.log('you\'ve made a match');
       updateCakeCounter();
        openedCards.splice(0, openedCards.length);
      } else {
        setTimeout(() => {
          for (let i = 0; i < openedCards.length; i++){
            const tempCard = document.querySelectorAll(`[id="${openedCards[i]}"]`);
            tempCard.forEach((card) => card.classList.add('hide'));
            console.log(tempCard);
        }
        openedCards.splice(0, openedCards.length);
      }, 1000);
      updateIncorrectMatches();
    checkWin();
    }
  }
}
};
gameBoard.addEventListener('click', matchCards);

// update results - incorrect or correct match
const updateCakeCounter = () => {
  cakeCounter += 1;
  cakeCounterDisplay.innerHTML = `You've made ${cakeCounter} funnel cakes!`;
};
const updateIncorrectMatches = () => {
  incorrectMatchCounter +=1 ;
  incorrectMatchCounterDisplay.innerHTML = `${incorrectMatchCounter} incorrect matches`;
};

// check for win or lose: after each match check if correct matches = number of fair-goers and if number of incorrect matches = 3
const checkWin = () => {
  if (randomFairGoers === cakeCounter) {
    showWinOverlay();
  } else if (incorrectMatchCounter >= 4) {
      bigTexImg.style.border= '5px solid rgb(226, 51, 21)';
        showLoseOverlay();
      }
  };

//overlay functions
const showWinOverlay = () => document.getElementById('win-overlay').style.display = 'block';

const hideWinOverlay = () => document.getElementById('win-overlay').style.display = 'none';

const showLoseOverlay = () => document.getElementById('lose-overlay').style.display = 'block';

const hideLoseOverlay = () => document.getElementById('lose-overlay').style.display = 'none';

//reset game
const resetGame = () => {
  cakeCounter = 0;
  incorrectMatchCounter = 0;
  const cardArr = document.querySelectorAll('.cardDisplay').forEach((element) => {
    element.classList.add('hide');
  });
  randomFairGoers = 0;
};

const handlePlayAgainBtn = () => {
  cowboysList.innerText = '';
  incorrectMatchCounter.innerText = '';
  hideLoseOverlay();
  hideWinOverlay();
  resetGame();
  updateFairGoers();
  addImages();
  bigTexImg.style.border = '3px solid rgb(35, 30, 32)';
};
playAgainBtnWin.addEventListener('click', handlePlayAgainBtn);
playAgainBtnLose.addEventListener('click', handlePlayAgainBtn);


// MODAL FUNCTIONALITY
// Get the modal
const modal = document.getElementById("modal");

// Get the button that opens the modal
const modalBtn = document.getElementById("modalBtn");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
const showModal = (event) => {
    event.preventDevault;
    modal.style.display = 'block';
};
modalBtn.addEventListener('click', showModal);

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};