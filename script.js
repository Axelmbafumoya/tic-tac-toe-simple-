const gameBoard = document.getElementById('game-board');
const statusMessage = document.getElementById('status-message');
let go = "circle"
const resetButton = document.getElementById("reset-button");

const startCells = ["", "", "", "", "", "", "", "", ""]

statusMessage.textContent = "Player X's turn";

function createBoard() {

    startCells.forEach((cell, index) => {

        const cellElement = document.createElement("div");
        cellElement.classList.add("square");
        cellElement.id = index;
        cellElement.addEventListener("click", addGo)
        gameBoard.append(cellElement);

    })

}

createBoard()

function addGo(e) {

    console.log("click", e.target)
    const goDisplay = document.createElement("div")
    goDisplay.classList.add(go)
    e.target.append(goDisplay)
    go = go === "circle" ? "cross" : "circle" // if egal the string of "circle" and that is true, it is going to change to be cross , otherwise circle
    statusMessage.textContent = "it is now " + go + "'s go"
    e.target.removeEventListener("click", addGo) // when one box get clicked, it remove the addgo function to the clicked box
    console.log(go)
    checkScore()

}

function checkScore() {

    const allSquares = document.querySelectorAll(".square")

    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ]

    winningCombos.forEach(array => {

        const circleWins = array.every(cell =>
            allSquares[cell].firstChild?.classList.contains("circle"))

        if (circleWins) {
            statusMessage.textContent = "circle wins !"
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
        }

    })

    winningCombos.forEach(array => {

        const crossWins = array.every(cell =>
            allSquares[cell].firstChild?.classList.contains("cross"))
            
        if (crossWins) {
            statusMessage.textContent = "cross wins !"
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
        }

    })



}

resetButton.addEventListener("click", resetGame);

function resetGame() {
    gameBoard.innerHTML = "";
    go = "circle";
    statusMessage.textContent = "Circle's turn";
    createBoard();
}

