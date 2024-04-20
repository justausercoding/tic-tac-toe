function createPlayer(userName, userNumber) {
    return {userName, userNumber};
}

function gameBoard(user1, user2) {
    // ---- ATTRIBUTES: private ----
    let currentUser = user1;
    let board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    let boardPoints = {
        rowOne: 0, rowTwo: 0, rowThree: 0,
        colOne: 0, colTwo: 0, colThree: 0,
        diagOne: 0, diagTwo: 0
    };
    const indexWinPossibilities = {
        rowOne : [0, 1, 2], rowTwo: [3, 4, 5], rowThree: [6, 7, 8],
        colOne: [0, 3, 6], colTwo: [1, 4, 7], colThree: [2, 5, 8],
        diagOne: [0, 4, 8], diagTwo: [2, 4, 6]
    }

    // ---- METHODS: not private ----
    // change current user variable
    let setCurrentUser = () => {
        currentUser = (currentUser == user1) ? user2 : user1;
    };

    // returns the current user object
    let getCurrentUser = () => {
        return currentUser;
    }

    // adds the value (1 or -1) to the 'board' array
    let setBoard = (position, user) => {
        if (board[position] == 0) {
            if (user == user1) {
                board[position] = 1;
            } else {
                board[position] = -1;
            }
        }
    };

    // returns the 'board' array
    let getBoard = () => {
        return board;
    };

    // sets the whole 'board' array to 0
    let resetBoard = () => {
        board = [0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
    
    // calculates the values and updates the obj. 'boardPoints'
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
    
    // returns the obj. 'boardPoints'
    let getBoardPoints = () => {
        return boardPoints;
    };

    // returns a string: 'player1', 'player2', 'draw' or 'continue game'
    let checkWinner = () => {
        setBoardPoints();
        for (let i in boardPoints) {
            if (boardPoints[i] == 3) {
                return user1;
            } else if (boardPoints[i] == -3) {
                return user2;
            }
        }
        if (!(board.includes(0))) {
            return "draw";
        } else {
            return "continue game"
        }
    };

    // returns an array with the winning indexes
    let getWinnerIndex = () => {
        let winnerIndex = [];
        for (let i in boardPoints) {
            if (boardPoints[i] == 3 || boardPoints[i] == -3) {
                winnerIndex.push(indexWinPossibilities[i]);
            }
        }
        winnerIndex = new Set(winnerIndex.flat());
        return Array.from(winnerIndex);
    };
    return {
        setCurrentUser,
        getCurrentUser,
        setBoard,
        getBoard,
        resetBoard,
        setBoardPoints,
        getBoardPoints,
        checkWinner,
        getWinnerIndex,
    };
}

function changeHtml() {
    // ---- ATRIBUTES: private ----
    let message = document.querySelector(".message");
    let spaces = document.querySelectorAll("button[data-index]");
    let restart = document.querySelector(".restart");

    // ---- METHODS: not private ----
    // writes the 'X' and 'O' to the website -> is returned from changeHtml
    let htmlWriteSpaces = (board) => {
        spaces.forEach((oneSpace, index) => {
            valueInArray = board[index];
            if (valueInArray == 1) {
                oneSpace.textContent = "✕";
            } else if (valueInArray == -1) {
                oneSpace.textContent = "O";
            } else {
                oneSpace.textContent = "";
            }
        })
    }

    // adds event listeners to the space-buttons -> is returned from changeHtml
    let htmlAddListenerSpaces = (game) => {
        spaces.forEach((oneSpace) => {
            oneSpace.addEventListener("click", (e) => {
                let index = e.currentTarget.getAttribute("data-index");

                // adds the new item to the array that represents the board
                game.setBoard(index, game.getCurrentUser());
                // writes the updated array to the website
                htmlWriteSpaces(game.getBoard());
                oneSpace.classList.add("no-event");
                game.setCurrentUser();
                let status = game.checkWinner();
                if (status.userNumber == "player1" || status.userNumber == "player2") {
                    htmlAddNoEvent();
                    htmlChangeBackground();
                    message.textContent = `${status.userName} wins the game`;

                }
                if (status == "draw") {
                    message.textContent = "There are no winners";
                }
            })
        })
    };

    // adds an event listener to the restart button -> is returned from changeHtml
    let htmlAddListenerButton = (game) => {
        restart.addEventListener("click", () => {
            game.resetBoard();
            let user = game.getCurrentUser();
            if (user.userNumber == "player2") {
                game.setCurrentUser()
            }
            htmlClearMessage();
            htmlRemoveNoEvent();
            htmlRemoveBackground();
            htmlWriteSpaces(game.getBoard());
        })
    }

    // ---- METHODS: private ----
    // clears all the 'winner' message
    let htmlClearMessage = () => {
        message.textContent = "";
    }

    // changes the background of the winnig space-buttons
    let htmlChangeBackground = () => {
        let winnerIndex = game.getWinnerIndex();
        spaces.forEach((oneSpace) => {
            let index = Number(oneSpace.getAttribute("data-index"));
            if (winnerIndex.includes(index)) {
                oneSpace.classList.add("winner");
            }
        })
    }

    // changes the background of the space-buttons to default
    let htmlRemoveBackground = () => {
        spaces.forEach((oneSpace) => {
            oneSpace.classList.remove("winner");
        })
    }
    // adds a class in order to block the events 
    let htmlAddNoEvent = () => {
        spaces.forEach((oneSpace) => {
            oneSpace.classList.add("no-event");
        })
    };

    // removes the 'no-event' class, allowing buttons to be clicked
    let htmlRemoveNoEvent = () => {
        spaces.forEach((oneSpace) => {
            oneSpace.classList.remove("no-event");
        })
    }
    return {
        htmlWriteSpaces, 
        htmlAddListenerSpaces,
        htmlAddListenerButton
    };
}

let player1;
let player2;
let game;
let website;

const form = document.querySelector("form");
form.addEventListener("submit", () => {
    let data = new FormData(form);
    player1 = createPlayer(data.get("player1"), "player1");
    player2 = createPlayer(data.get("player2"), "player2");
    game = gameBoard(player1, player2);
    website = changeHtml();
    website.htmlWriteSpaces(game.getBoard());
    website.htmlAddListenerSpaces(game);
    website.htmlAddListenerButton(game);

})
const modalDialog = document.querySelector("#dialog");
modalDialog.showModal();
