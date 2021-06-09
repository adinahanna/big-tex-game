// GLOBAL VARS 
const startBtn = document.querySelector('#startBtn');
const fairGoerCounter = document.querySelector('#fair-goer-counter');
const fairGoerArr= [3, 4, 5, 6, 7, 8];
const gameBoard = document.querySelector('.board-flex-container');
let openedCards= [];
const cakeCounterDisplay = document.querySelector('#cake-counter');
let cakeCounter = 0;
let randomFairGoers;
let cardDiv;

// FUNCTIONS
// start game function
const handleStartBtnClick = event => {
  event.preventDefault;
// fair-goers number gets assigned and attendee counter populates
  updateFairGoers();
// card deck is shuffled 
//images placed
  addImages();
};

startBtn.addEventListener('click', handleStartBtnClick);

// randomly assign number of fair-goers
const updateFairGoers = () => {
  const randomIndex = Math.floor(Math.random() * fairGoerArr.length);
  //console.log(fairGoerArr[randomIndex]);
  randomFairGoers = (fairGoerArr[randomIndex]);
  fairGoerCounter.innerHTML = `
  <h4>FAIR VISITORS</h4>
  <p>There are ${randomFairGoers} people at the fair today. Make ${randomFairGoers} matches.</p>
  `
  generateVisitors();
};

//populate fair visitors
const generateVisitors = () => {
  const cowboysList = document.createElement('ul');
    for (let i = 0; i < randomFairGoers; i++){
      const cowboy = document.createElement('li');
      cowboy.innerText = '🤠';
      cowboy.setAttribute('class', 'cowboys');
      cowboysList.appendChild(cowboy);
      cowboysList.setAttribute('class', cowboysList);
      fairGoerCounter.appendChild(cowboysList);
    };
    console.log(cowboysList);
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
    //let image = cardArr[i].value;
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
  //console.log(cardId);
  if (event.target.classList.contains('card')){
    card = event.target;
    cardId = event.target.firstChild.id;
    //console.log(card);
    card.firstChild.classList.remove('hide');
    openedCards.push(cardId);
    if (openedCards.length > 1) {
      if (openedCards[1] === openedCards[0]) {
        console.log('you\'ve made a match');
        //update matches
        cakeCounter += 1;
        cakeCounterDisplay.innerHTML = `You've made ${cakeCounter} cakes!`;
        openedCards.splice(0, openedCards.length);
      } else {
        //grab elements with dom id
        //const clickedCards = document.querySelectorAll(`#${cardID}`);
        //loop over them and add hide class list to them
        for (let i = 0; i < openedCards.length; i++){
          const tempCard = document.querySelector(`[id="${openedCards[i]}"]`);
          tempCard.classList.add('hide');
          console.log(tempCard);
        }
        openedCards.splice(0, openedCards.length);
      }
      console.log(openedCards);
    }
  };
};
gameBoard.addEventListener('click', matchCards);



// update results - incorrect or correct match
// check for win or lose: after each match check if correct matches = number of fair-goers and if number of incorrect matches = 3
// update big tex image: mvp: changes to different colored big tex on lose; stretch: tints darker red on each incorrect match


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
}
modalBtn.addEventListener('click', showModal);

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};



