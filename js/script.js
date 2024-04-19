function createPlayer(userName, symbol) {
    return {userName, symbol};
}

function gameBoard(user1, user2) {
    // -- attributes --
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
    let currentUser = null;
    
    // -- functions --
    let setCurrentUser = (user) => {
        // ...
    };

    let makeMove = (position, user) => {
        if (user == user1) {
            board[position] = 1;
        } else {
            board[position] = -1;
        }
    };
    
    let setBoardPoints = () => {
        // set the points each row has        
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
    
    let checkWinner = () => {
        // check if there is a winner
        for (let i in boardPoints) {
            if (boardPoints[i] == 3) {
                return "player1";
            } else if (boardPoints[i] == -3) {
                return "player2";
            }
        }
        // check if is a draw or there is no winner
        if (!(board.includes(0))) {
            return "draw";
        } else {
            return "continue game"
        }
    };
    
    return {
        board,
        boardPoints,
        currentUser,
        setCurrentUser,
        makeMove,
        setBoardPoints,
        checkWinner,
    };
}

const player1 = createPlayer(prompt("Player 1 - Enter your name: "),"X");
const player2 = createPlayer(prompt("Player 2 - Enter your name: "), "O");
console.log(player1, player2);

const game = gameBoard(player1, player2);
let currentPlayer = player2;
let currentMove;


while (game.checkWinner() == "continue game") {
    console.log("---\n");
    currentPlayer = (currentPlayer == player1) ? player2 : player1;
    console.log(`current player: ${currentPlayer.symbol}`);
    currentMove = Number(prompt("Move?"));
    game.makeMove(currentMove, currentPlayer);
    game.setBoardPoints();
    console.log(game.board);
}

console.log(`game finished: ${game.checkWinner()}`);