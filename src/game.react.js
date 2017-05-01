import React from 'react'

import TicTacToe from './tictactoe'
import Board from './board.react'


let CHAR = {
    [TicTacToe.X]: 'X',
    [TicTacToe.O]: 'O',
}

class Game extends React.Component {
    constructor() {
        super();

        this.state = {
            currentIndex: 0,
            history: [
                new TicTacToe(),
            ],
        }
    }

    handleClick(x, y) {
        const gameState = this.state.history[this.state.currentIndex];

        // do nothing if the current game state has a winner
        // or if the square is occupied
        if (gameState.isGameOver || gameState.getSquare(x, y)) {
            return;
        }

        // otherwise update
        const history = this.state.history.slice(0, this.state.currentIndex + 1);
        const newGameState = new TicTacToe(gameState);
        newGameState.nextMove(x, y);
        this.setState({
            history: history.concat([newGameState]),
            currentIndex: history.length,
        });
    }

    jumpTo(index) {
        this.setState({
            currentIndex: index,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.currentIndex];

        let status;
        if (current.winner) {
            status = 'Winner: ' + CHAR[current.winner];
        } else if (current.isGameOver) {
            status = 'Draw';
        } else {
            status = 'Next Player: ' + CHAR[current.activePlayer];
        }

        const moves = history.map((gameState, index) => {
            const desc = index ?
                'Move #' + index :
                'Game Start';
            const isCurrentMove = index == this.state.currentIndex;
            return (
                <li key={index}>
                    <a href="#"
                        className={isCurrentMove ? 'current-move' : null}
                        onClick={() => this.jumpTo(index)}>{desc}</a>
                </li>
            );
        });

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        gameState={current}
                        onClick={(x, y) => this.handleClick(x, y)}/>
                </div>

                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

export default Game;
