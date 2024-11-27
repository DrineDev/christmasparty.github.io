
// Select all memory card elements
const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let matchedPairs = 0; // Counter for matched pairs
const totalPairs = cards.length / 2; // Total number of pairs

// Flip the card when clicked
function flipCard() {
  if (lockBoard) return; // Prevent interaction while the board is locked
  if (this === firstCard) return; // Prevent flipping the same card twice

  this.classList.add('flip');

  if (!hasFlippedCard) {
    // First card flipped
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  // Second card flipped
  secondCard = this;
  checkForMatch();
}

// Check if the two flipped cards match
function checkForMatch() {
  const isMatch =
    firstCard.querySelector('.front-face').src ===
    secondCard.querySelector('.front-face').src;

  if (isMatch) {
    disableCards();
    matchedPairs++; // Increment matched pairs count

    if (matchedPairs === totalPairs) {
      // Alert when all matches are found
      setTimeout(() => {
        alert('Congratulations! Please take a screenshot of this and proceed to the library to check if you have won!');
      }, 500); // Delay to allow last pair to finish flipping
    }
  } else {
    unflipCards();
  }
}

// Disable cards that have been matched
function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

// Unflip cards that do not match
function unflipCards() {
  lockBoard = true; // Lock the board while cards are flipping back

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500); // Delay for users to view unmatched cards
}

// Reset the board for the next turn
function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

// Initialize the game when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  const backImages = ["img/IDEAlogo.png", "img/GCC.png"]; // Alternating back-face images
  const frontImages = [
    "img/bell.png",
    "img/christmastree.png",
    "img/giftbox.png",
    "img/gingerbreadman.png",
    "img/reindeer.png",
    "img/santa.png"
  ];

  // Assign alternating back images
  cards.forEach((card, index) => {
    const backFace = card.querySelector('.back-face');
    backFace.src = backImages[index % 2];
  });

  // Shuffle and assign random front images
  const randomImages = [...frontImages, ...frontImages].sort(() => Math.random() - 0.5);
  cards.forEach((card, index) => {
    const frontFace = card.querySelector('.front-face');
    frontFace.src = randomImages[index];
  });

  // Add event listeners for flipping cards
  cards.forEach(card => card.addEventListener('click', flipCard));
});
ards.forEach(card => card.addEventListener('click', flipCard));
