
const gameBoard = document.getElementById('game-board');
const statusMessage = document.getElementById('status-message');
const resetButton = document.getElementById("reset-button");

const winnigMessage = document.getElementById("winnigMessage");
const endOfGameMessageOn = document.getElementById("endOfGameMessageOn");
const endOfGameMessageTwo = document.getElementById("endOfGameMessageTwo");
const endOfGameMessageTrois = document.getElementById("endOfGameMessageTrois");
let go = "circle";

const clickSound = document.getElementById("clickSound")

const victorySound = document.getElementById("endGameSound")

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
    e.target.removeEventListener("click", addGo);// when one box get clicked, it remove the addgo function to the clicked box
    console.log(go);

    //Every click during the game will produice this song
    clickSound.currentTime = 0;
    clickSound.play()

    checkScore();
}

function checkScore() {

    // This gives us access to all 9 cells of the board.
    const allSquares = document.querySelectorAll(".square")

    // Store every possible winning combination. 

    // Each array contains the indexes of three cells  
    // that can create a winning line.
    const winningCombos = [

        // Horizontal combinations
        [0, 1, 2], [3, 4, 5], [6, 7, 8],

        // Vertical combinations
        [0, 3, 6], [1, 4, 7], [2, 5, 8],

        // Diagonal combinations
        [0, 4, 8], [2, 4, 6]
    ]


    // Check whether Circle has a winning combination. /

    // some() returns true if at least ONE combination 
    /// satisfies the condition.
    const circleWins = winningCombos.some(array =>

        // allSquares[cell] gets the corresponding cell.

        // firstChild gets the player's symbol inside the cell. 

        // ?. prevents an error if the cell is empty.

        // classList.contains("circle") checks whether
        array.every(cell =>
            allSquares[cell].firstChild?.classList.contains("circle")
        )
    )

    // Check whether Cross has a winning combination. 

    // The logic is exactly the same as for Circle,
    // but we check for the "cross" class.

    const crossWins = winningCombos.some(array =>
        array.every(cell =>
            allSquares[cell].firstChild?.classList.contains("cross")
        )
    )

    // Check whether every cell contains a symbol.

    // [...allSquares] converts the NodeList into an array.

    // every() then checks every cell. 

    // If every cell has a firstChild, the board is full.
    const boardFull = [...allSquares].every(square =>
        square.firstChild
    )

    if (circleWins) {

        statusMessage.textContent = ""
        endOfGameMessageOn.textContent = "Circle"
        endOfGameMessageTrois.textContent = ""
        endOfGameMessageTwo.textContent = " wins !"


        // Disable all cells. 

        // cloneNode(true) creates a copy of each cell.

        // The HTML content is copied, but the click event
        // added with addEventListener() is not copied. 

        // Therefore, the new cells can no longer be clicked.
        allSquares.forEach(square =>
            square.replaceWith(square.cloneNode(true))
        )

        winnigMessage.style.display = "block"

        // Affiche Reset
        resetButton.style.display = "block"

        // Play the victory sound.
        victorySound.play()

    } else if (crossWins) {

        statusMessage.textContent = ""
        endOfGameMessageOn.textContent = ""
        endOfGameMessageTrois.textContent = "Cross"
        endOfGameMessageTwo.textContent = " wins !"

        // If circle wins this audio will be played at the end of the game
        victorySound.play()

        // Disable all cells
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

        // Disable all cells
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

    // Remove all the cells from the game board.
    //  // // Setting innerHTML to an empty string removes
    //  // all HTML content inside the game board.
    gameBoard.innerHTML = "";

    // Make Circle the first player again.

    go = "circle";
    statusMessage.textContent = "Circle's turn";
    resetButton.style.display = "none";
    winnigMessage.style.display = "none"
    createBoard();
}

