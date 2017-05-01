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

class Board extends React.Component {
    renderSquare(x, y) {
        return (
            <Square
             value={this.props.gameState.getSquare(x, y)}
             onClick={() => this.props.onClick(x, y)}/>
        )
    }

    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0, 0)}
                    {this.renderSquare(1, 0)}
                    {this.renderSquare(2, 0)}
                </div>
                <div className="board-row">
                    {this.renderSquare(0, 1)}
                    {this.renderSquare(1, 1)}
                    {this.renderSquare(2, 1)}
                </div>
                <div className="board-row">
                    {this.renderSquare(0, 2)}
                    {this.renderSquare(1, 2)}
                    {this.renderSquare(2, 2)}
                </div>
            </div>
        );
    }
}

export default Board;
