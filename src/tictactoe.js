const PLAYER_X = 'x';
const PLAYER_O = 'o';

const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

class TicTacToe {

    constructor(objToClone=null) {
        if (objToClone == null) {
            this.activePlayer = PLAYER_X;
            this.turnNumber = 1;
            this.winner = null;

            this._board = Array(9).fill(null);

        } else {
            this.activePlayer = objToClone.activePlayer;
            this.turnNumber = objToClone.turnNumber;
            this.winner = objToClone.winner;

            this._board = objToClone._board.slice();
        }
    }

    get isGameOver() {
        return this.winner != null || this.turnNumber == 10;
    }

    getSquare(x, y) {
        return this._board[y * 3 + x];
    }

    nextMove(x, y) {
        const index = y * 3 + x;

        if (this.winner != null) {
            throw "Error: game already over";
        }
        if (this._board[index] != null) {
            throw "Error: square already occupied";
        }

        this._board[index] = this.activePlayer;
        this._checkWinner();
        if (this.winner == null) {
            this.activePlayer = this.activePlayer == PLAYER_X ? PLAYER_O : PLAYER_X;
            this.turnNumber += 1;
        }
    }

    _checkWinner() {
        const board = this._board;
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                this.winner = board[a];
                break;
            }
        }
    }

}

TicTacToe.X = PLAYER_X;
TicTacToe.O = PLAYER_O;

export default TicTacToe;
