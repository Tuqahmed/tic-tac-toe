/*-------------------------------- Constants --------------------------------*/

const winningCombos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]

/*---------------------------- Variables (state) ----------------------------*/

let board = ['', '', '', '', '', '', '', '', '']
let turn = 'X'
let winner = false
let tie = false

/*------------------------ Cached Element References ------------------------*/

const squareEls = document.querySelectorAll('.sqr')
const messageEl = document.querySelector('#message')
const resetBtnEl = document.querySelector('#reset')

/*-------------------------------- Functions --------------------------------*/

function init() {
    board = ['', '', '', '', '', '', '', '', '']
    turn = 'X'
    winner = false
    tie = false

    render()
}

function render() {
    updateBoard()
    updateMessage()
}

function updateBoard() {
    for (let i = 0; i < board.length; i++) {
        squareEls[i].textContent = board[i]
    }
}

function updateMessage() {
    if (winner === false && tie === false) {
        messageEl.textContent = `It's ${turn} turn`
    }
    else if (winner === false && tie === true) {
        messageEl.textContent = 'You Tied'
    }
    else {
        messageEl.textContent = 'You Won'
    }
}

function handleClick(event) {
    const squareIndex = Number(event.target.id)
    if (board[squareIndex] === 'X' || board[squareIndex] === 'O' || winner) {
        return
    }

    placePiece(squareIndex)
    checkForWinner()
    checkForTie()
    switchPlayerTurn()
    render()
}
function placePiece(index) {
    board[index] = turn
    squareEls[index].textContent = turn
}

function checkForWinner() {
    if (board[0] !== '' && board[0] === board[1] && board[0] === board[2]) {
        winner = true
    }
    else if (board[3] !== '' && board[3] === board[4] && board[3] === board[5]) {
        winner = true
    }
    else if (board[6] !== '' && board[6] === board[7] && board[6] === board[8]) {
        winner = true
    }
    else if (board[0] !== '' && board[0] === board[3] && board[0] === board[6]) {
        winner = true
    }
    else if (board[1] !== '' && board[1] === board[4] && board[1] === board[7]) {
        winner = true
    }
    else if (board[2] !== '' && board[2] === board[5] && board[2] === board[8]) {
        winner = true
    }
    else if (board[0] !== '' && board[0] === board[4] && board[0] === board[8]) {
        winner = true
    }
    else if (board[2] !== '' && board[2] === board[4] && board[2] === board[6]) {
        winner = true
    }

}

function checkForTie() {
    if (winner) {
        return
    }
    if (!board.includes('')) {
        tie = true
    }
    else {
        tie = false
    }

}

function switchPlayerTurn() {
    if (winner) {
        return
    }

    if (turn === 'X') {
        turn = 'O'
    }
    else {
        turn = 'X'
    }

}

/*----------------------------- Event Listeners -----------------------------*/

init()

for (let oneSquare of squareEls) {
    oneSquare.addEventListener('click', handleClick)
}

resetBtnEl.addEventListener('click', init)