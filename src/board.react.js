import React from 'react'

function Square(props) {
    return (
        <button
         className={'square ' + (props.value || '').toLowerCase()}
         onClick={() => props.onClick()}>
            {props.value}
        </button>
    );
}

export default function Board(props) {
    function renderSquare(x, y) {
        return (
            <Square
             value={props.gameState.getSquare(x, y)}
             onClick={() => props.onClick(x, y)}/>
        )
    }

    return (
        <div>
            <div className="board-row">
                {renderSquare(0, 0)}
                {renderSquare(1, 0)}
                {renderSquare(2, 0)}
            </div>
            <div className="board-row">
                {renderSquare(0, 1)}
                {renderSquare(1, 1)}
                {renderSquare(2, 1)}
            </div>
            <div className="board-row">
                {renderSquare(0, 2)}
                {renderSquare(1, 2)}
                {renderSquare(2, 2)}
            </div>
        </div>
    );
}
