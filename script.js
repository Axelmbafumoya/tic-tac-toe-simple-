const gameBoard = document.getElementById('game-board');
const statusMessage = document.getElementById('status-message');
const resetButton = document.getElementById("reset-button");
const winnigMessage = document.getElementById("winnigMessage");
const endOfGameMessageOn = document.getElementById("endOfGameMessageOn");
const endOfGameMessageTwo = document.getElementById("endOfGameMessageTwo");
const endOfGameMessageTrois = document.getElementById("endOfGameMessageTrois");
let go = "circle";

const startCells = ["", "", "", "", "", "", "", "", ""];

statusMessage.textContent = "Player X's turn";

function createBoard() {

    startCells.forEach((cell, index) => {

        const cellElement = document.createElement("div");
        cellElement.classList.add("square");
        cellElement.id = index;
        cellElement.addEventListener("click", addGo);
        gameBoard.append(cellElement);

    })

}

createBoard()

function addGo(e) {

    console.log("click", e.target);
    const goDisplay = document.createElement("div");
    goDisplay.classList.add(go);
    e.target.append(goDisplay);
    go = go === "circle" ? "cross" : "circle" // if egal the string of "circle" and that is true, it is going to change to be cross , otherwise circle
    statusMessage.textContent = "it is now " + go + "'s go"
    e.target.removeEventListener("click", addGo) ;// when one box get clicked, it remove the addgo function to the clicked box
    console.log(go);
    checkScore();

}

function checkScore() {

    const allSquares = document.querySelectorAll(".square")

    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ]

  
    const circleWins = winningCombos.some(array =>
        array.every(cell =>
            allSquares[cell].firstChild?.classList.contains("circle")
        )
    )

    const crossWins = winningCombos.some(array =>
        array.every(cell =>
            allSquares[cell].firstChild?.classList.contains("cross")
        )
    )

    const boardFull = [...allSquares].every(square =>
        square.firstChild
    )

    if (circleWins) {

        statusMessage.textContent = ""
        endOfGameMessageOn.textContent = "Circle"
        endOfGameMessageTrois.textContent = ""
        endOfGameMessageTwo.textContent = " wins !"

        // Bloque les cases
        allSquares.forEach(square =>
            square.replaceWith(square.cloneNode(true))
        )

        winnigMessage.style.display = "block"

        // Affiche Reset
        resetButton.style.display = "block"

    } else if (crossWins) {

        statusMessage.textContent = ""
        endOfGameMessageOn.textContent = ""
        endOfGameMessageTrois.textContent = "Cross"
        endOfGameMessageTwo.textContent = " wins !"

        // Bloque les cases
        allSquares.forEach(square =>
            square.replaceWith(square.cloneNode(true))
        )

        winnigMessage.style.display = "block"

        // Affiche Reset
        resetButton.style.display = "block"

    } else if (boardFull) {

        statusMessage.textContent = ""
        endOfGameMessageOn.textContent = ""
        endOfGameMessageTrois.textContent = ""
        endOfGameMessageTwo.textContent = "it's a draw !"

        // Bloque les cases
        allSquares.forEach(square =>
            square.replaceWith(square.cloneNode(true))
        )

        winnigMessage.style.display = "block"

        // Affiche Reset
        resetButton.style.display = "block"
    }
}


resetButton.addEventListener("click", resetGame);

function resetGame() {
    gameBoard.innerHTML = "";
    go = "circle";
    statusMessage.textContent = "Circle's turn";
    resetButton.style.display = "none";
    winnigMessage.style.display = "none"
    createBoard();
}

