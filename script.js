'use strict';

let playerOne = document.querySelector('.player--0');
let nameOne = document.querySelector('#name--0');
let scoreOne = document.querySelector('#score--0');
let currentOne = document.querySelector('#current--0');

let playerTwo = document.querySelector('.player--1');
let nameTwo = document.querySelector('#name--1');
let scoreTwo = document.querySelector('#score--1');
let currentTwo = document.querySelector('#current--1');

const dice = document.querySelector('.dice');
let btnNew = document.querySelector('.btn--new');
let btnRoll = document.querySelector('.btn--roll');
let btnHold = document.querySelector('.btn--hold');

let scores, curretScore, activePlayer, playing;

const init = function() {
    scores = [0, 0];
    curretScore = 0;
    activePlayer = 0;
    playing = true;

    scoreOne.textContent = 0;
    scoreTwo.textContent = 0;
    currentOne.textContent = 0;
    currentTwo.textContent = 0;

    dice.classList.add("hidden");
    playerOne.classList.remove("player--winner");
    playerTwo.classList.remove("player--winner");
    playerOne.classList.add("player--active");
    playerTwo.classList.remove("player--active");
    console.log(1)
};
init();

const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0
            curretScore = 0;
            if (activePlayer ===0) {
                activePlayer = 1;
            } else {
                activePlayer = 0;
            }
            playerOne.classList.toggle("player--active");
            playerTwo.classList.toggle("player--active");
}


btnRoll.addEventListener("click", function() {
    if (playing) {
        // 1.Выбрать случайный кубик
        const roll = Math.trunc(Math.random() * 6) + 1;
        // 2.Отобразить кубик
        dice.classList.remove("hidden");
        dice.src = `dice-${roll}.png`;
        // 3.Проверить, выкинули ли единичку
        if (roll !== 1) {
            curretScore += roll;
            document.getElementById(`current--${activePlayer}`).textContent = curretScore
        } else {
           switchPlayer();
        }

    }
});

btnHold.addEventListener("click", function() {
    if (playing) {
        // 1. добавить текущий счет к общему
        scores[activePlayer] += curretScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        // 2. победил ли игрок?
        if (scores[activePlayer] >= 100) {
            playing = false;
            dice.classList.add("hidden");

            document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
            document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
        } else {
            switchPlayer(); 
        }
    }
});

btnNew.addEventListener("click", function() {
    init();
}) 