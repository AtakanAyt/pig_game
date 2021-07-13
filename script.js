'use strict';

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const btnRollEl = document.querySelector('.btn--roll');
const btnNewEl = document.querySelector('.btn--new');
const btnHoldEl = document.querySelector('.btn--hold');

const playerSection0 = document.querySelector('.player--0');
const playerSection1 = document.querySelector('.player--1');

const diceEl = document.querySelector('.dice');

let currentScore = 0;
let activePlayer = 0;
let game = true;
let score = [0, 0];

// Starting condition
function starting() {
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');
  game = true;
  activePlayer = 0;
  currentScore = 0;
}

// reset current and player switch
function switchPlayer() {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  playerSection1.classList.toggle('player--active');
  playerSection0.classList.toggle('player--active');
}
starting();

//Rolling the dice
btnRollEl.addEventListener('click', function () {
  if (game) {
    const rollDice = Math.trunc(Math.random() * 6) + 1;

    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${rollDice}.png`;

    if (rollDice !== 1) {
      currentScore += rollDice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else if (rollDice === 1) {
      switchPlayer();
    }
  }
});

//Hold button
btnHoldEl.addEventListener('click', function () {
  if (game) {
    score[activePlayer] += currentScore;
    score0El.textContent = score[0];
    score1El.textContent = score[1];
    if (score[activePlayer] >= 100) {
      game = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

//new game button

// winner

btnNewEl.addEventListener('click', function () {
  playerSection1.classList.remove('player--active');
  playerSection0.classList.add('player--active');
  starting();
  score = [0, 0];
  document.querySelector(`.player--0`).classList.remove('player--winner');
  document.querySelector(`.player--1`).classList.remove('player--winner');
  document.querySelector(`.player--0`).classList.add('player--active');
  document.getElementById(`current--0`).textContent = currentScore;
  document.getElementById(`current--1`).textContent = currentScore;
});
