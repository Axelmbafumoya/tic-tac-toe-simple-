const gameBoard = document.getElementById('game-board');
const statusMessage = document.getElementById('status-message');

const startCells = ["", "", "", "","","","","",""]

statusMessage.textContent = "Player X's turn";

function createBoard() {
    startCells.forEach((cell,index) => {
        const cellElement = document.createElement("div")
        cellElement.classList.add("square")
        const circleElement = document.createElement("div")
        circleElement.classList.add("cross")
        cellElement.append(circleElement)
        gameBoard.append(cellElement)
    })
}

createBoard()