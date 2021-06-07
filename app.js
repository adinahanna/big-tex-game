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

// FUNCTIONS
    // start game function
        //on click:
            // fair-goers number gets assigned
            // attendee counter populates
            // card deck is shuffled and images placed
    // randomly assign number of fair-goers
    // populate cowboy emojis based on number of fair-goers
    // shuffle card deck and assign images randomly to card divs
    // check if match
    // update results - incorrect or correct match
    // check for win or lose: after each match check if correct matches = number of fair-goers and if number of incorrect matches = 3
    // update big tex image: mvp: changes to different colored big tex on lose; stretch: tints darker red on each incorrect match

