import React from 'react'

import TicTacToe from './tictactoe'
import randomAI from './random-ai'

import Board from './board.react'


let CHAR = {
    [TicTacToe.X]: 'X',
    [TicTacToe.O]: 'O',
}

class Game extends React.Component {
    constructor() {
        super();

        this.ai = randomAI;

        this.setState({
            currentIndex: 0,
            history: [
                new TicTacToe(),
            ],
            waitingForAI: false,
        });
    }

    setState(update) {
        if (this.state === undefined) { // handle the first set
            this.state = this._latestState = update;
        } else {
            this._latestState = Object.assign(this._latestState, update);
            super.setState(this._latestState);
        }
    }
    getState() {
        return this._latestState;
    }

    handleLetAIPlay() {
        this.aiMoves();
    }

    handleClick(x, y) {
        // don't let player play if ai is calculating
        if (this.getState().waitingForAI) {
            return;
        }
        if (this.playMove(x, y)) {
            // only let ai play if the move was valid
            this.aiMoves();
        }
    }

    handleJumpTo(index) {
        this.setState({
            history: this.getState().history,
            currentIndex: index,
        });
    }

    aiMoves() {
        const gameState = this.getState().history[this.getState().currentIndex];

        if (!gameState.isGameOver) {
            this.setState({waitingForAI: true});
            this.ai(gameState)
                .then(([x, y]) => {
                    this.playMove(x, y);
                    this.setState({waitingForAI: false});
                });
        }
    }

    playMove(x, y) {
        const gameState = this.getState().history[this.getState().currentIndex];

        // do nothing if the current game state has a winner
        // or if the square is occupied
        if (gameState.isGameOver || gameState.getSquare(x, y)) {
            return false;
        }

        // otherwise update
        const history = this.getState().history
            .slice(0, this.getState().currentIndex + 1);
        const newGameState = new TicTacToe(gameState);
        newGameState.nextMove(x, y);

        this.setState({
            history: history.concat([newGameState]),
            currentIndex: history.length,
        });

        return true;
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
            status = 'Player is ' + CHAR[current.activePlayer];
        }

        const moves = history.map((gameState, index) => {
            const desc = index
                ? (index % 2 == 1
                    ? CHAR[TicTacToe.X]
                    : CHAR[TicTacToe.O]) + ' Move #' + Math.round(index / 2)
                : 'Game Start';
            const isCurrentMove = index == this.state.currentIndex;
            return (
                <li key={index}>
                    <a href="#"
                     className={isCurrentMove ? 'current-move' : null}
                     onClick={() => this.handleJumpTo(index)}>{desc}</a>
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

                    {this.state.waitingForAI
                        ? <div>Waiting for AI</div>
                        : <a href="#"
                           onClick={() => this.handleLetAIPlay()}>Let AI Play</a>
                    }

                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

export default Game;
