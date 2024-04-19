function createPlayer(userName, symbol) {
    return {userName, symbol};
}

function gameBoard(user1, user2) {
    // -- attributes --
    let currentUser = user1;

    let board = [
        0, 0, 0, 
        0, 0, 0, 
        0, 0, 0
    ];
    let boardPoints = {
        rowOne: 0, rowTwo: 0, rowThree: 0,
        colOne: 0, colTwo: 0, colThree: 0,
        diagOne: 0, diagTwo: 0
    };
    
    // -- methods --
    let setCurrentUser = () => {
        currentUser = (currentUser == user1) ? user2 : user1;
    };

    let getCurrentUser = () => {
        return currentUser;
    }

    let setBoard = (position, user) => {
        if (board[position] == 0) {
            if (user == user1) {
                board[position] = 1;
            } else {
                board[position] = -1;
            }
        }
    };

    let getBoard = () => {
        return board;
    }
    
    let setBoardPoints = () => {    
        // rows
        boardPoints["rowOne"] = board[0] + board[1] + board[2];
        boardPoints["rowTwo"] = board[3] + board[4] + board[5];
        boardPoints["rowThree"] = board[6] + board[7] + board[8];
        // columns
        boardPoints["colOne"] = board[0] + board[3] + board[6];
        boardPoints["colTwo"] = board[1] + board[4] + board[7];
        boardPoints["colThree"] = board[2] + board[5] + board[8];
        // diagonals
        boardPoints["diagOne"] = board[0] + board[4] + board[8];
        boardPoints["diagTwo"] = board[2] + board[4] + board[6];
    };
    
    let getBoardPoints = () => {
        return boardPoints;
    }
    
    let checkWinner = () => {
        // check if there is a winner
        setBoardPoints();
        for (let i in boardPoints) {
            if (boardPoints[i] == 3) {
                return "player1";
            } else if (boardPoints[i] == -3) {
                return "player2";
            }
        }
        // check if it is a draw or there is no winner
        if (!(board.includes(0))) {
            return "draw";
        } else {
            return "continue game"
        }
    };
    
    return {
        setCurrentUser,
        getCurrentUser,
        setBoard,
        getBoard,
        setBoardPoints,
        getBoardPoints,
        checkWinner,
    };
}

function changeHtml() {
    let spaces = document.querySelectorAll("button[data-index]");

    let writeHtmlSpaces = (board) => {
        spaces.forEach((oneSpace, index) => {
            valueInArray = board[index];
            if (valueInArray == 1) {
                oneSpace.textContent = "X";
            } else if (valueInArray == -1) {
                oneSpace.textContent = "O";
            }
        })
    }

    let addHtmlListenerSpaces = (game) => {
        spaces.forEach((oneSpace) => {
            oneSpace.addEventListener("click", (e) => {
                let index = e.currentTarget.getAttribute("data-index");

                // adds the new item to the array that represents the board
                game.setBoard(index, game.getCurrentUser());
                // writes the updated array to the website
                writeHtmlSpaces(game.getBoard());
                game.setCurrentUser();
                console.log("Winner: ", game.checkWinner());
            })
        })
    };

    return {writeHtmlSpaces, addHtmlListenerSpaces};
}
// const player1 = createPlayer(prompt("Player 1 - Enter your name: "),"X");
// const player2 = createPlayer(prompt("Player 2 - Enter your name: "), "O");
const player1 = createPlayer("One","X");
const player2 = createPlayer("Two", "O");

const game = gameBoard(player1, player2);
const website = changeHtml()

website.writeHtmlSpaces(game.getBoard());
website.addHtmlListenerSpaces(game);
