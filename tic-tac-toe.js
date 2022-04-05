//basic setup
var fullBoard;
const huPlayer = 'o';
const aiPlayer = 'x';

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2],  
]

const cells = document.querySelectorAll('.cell') 
startGame();

function startGame() {
    document.querySelector('.end-game').style.display = "none"
    fullBoard = Array.from(Array(9).keys());
    
    for (var i=0; i<cells.length; i++) {
        cells[i].innerText = '';
        cells[i].style.removeProperty('background-color');
        cells[i].addEventListener('click', turnClick, false);
    }
    
}
function turnClick(square) {
    if (typeof fullBoard[square.target.id] == 'number'){
        turn(square.target.id, huPlayer)
        if (!checkTie()) turn(bestSpot(), aiPlayer);
    }
  }

function turn(squareId, player) {
    fullBoard[squareId] = player;
    document.getElementById(squareId).innerText = player;
    let gameWon = checkWin(fullBoard, player)
    if (gameWon) gameOver(gameWon)
}

function checkWin(board, player) {
    let plays = board.reduce((a, e, i) =>
    (e === player) ? a.concat(i) : a, [])
    let gameWon = null;
    for(let [index, win] of winConditions.entries()){
        if (win.every(elem => plays.indexOf(elem) > -1)){
            gameWon = {index: index, player: player};
            break;
        }
    }
    return gameWon;
}

function gameOver(gameWon) {
    for (let index of winConditions[gameWon.index]){
        document.getElementById(index).style.backgroundColor = 
        gameWon.player == huPlayer ? "green" : "yellow";
    }
    for (var i=0; i< cells.length; i++) {
        cells[i].removeEventListener('click', turnClick, false )
    }
    declareWinner(gameWon.player == huPlayer ? "You Are Awesome" : "You lose.");
}

function declareWinner(who) {
    document.querySelector(".end-game").style.display = "block";
    document.querySelector(".end-game .text").innerText = who;
}

function emptySquares() {
    return fullBoard.filter(s => typeof s == 'number');
}

//Basic AI and winner algorithm
function bestSpot() {
    return emptySquares()[0];
}

function checkTie() {
    if (emptySquares().length == 0){
        for (var i=0; i< cells.length; i++) {
            cells[i].style.backgroundColor = "blue";
            cells[i].removeEventListener('click', turnClick, false);
        }
        declareWinner("Tie Game!")
        return true;
    }
    return false;
}






