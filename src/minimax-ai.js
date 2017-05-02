const MAX_DEPTH = 10;

const LOG_DEPTH = -1;

function minimax(gameState, playingAs, maxMode=true, depth=0) {
    if (depth <= LOG_DEPTH) {
        console.groupCollapsed(`minimax ${playingAs} ${maxMode ? 'max' : 'min'} mode depth: ${depth}`);
        console.log(`state:\n` + gameState);
    }

    let nodes = [];
    let moves = gameState.getMoves();
    for (let i = 0; i < moves.length; i++) {
        let [x, y] = moves[i];
        let node = {
            move: moves[i],
            score: null,
        };
        nodes.push(node);

        let state = gameState.clone();
        state.nextMove(x, y);

        if (state.isGameOver) {
            if (state.winner) {
                // score calculation ensures the ai will still prolong the game
                // if it can't win
                node.score = state.winner == playingAs
                    ? MAX_DEPTH - depth
                    : depth - MAX_DEPTH;
            } else {
                node.score = 0;
            }
        } else {
            node.score = minimax(state, playingAs, !maxMode, depth + 1).score;
        }
    }

    // choose the move
    let chosen = nodes[0];
    for (let i = 1; i < nodes.length; i++) {
        if (maxMode && nodes[i].score > chosen.score
                || !maxMode && nodes[i].score < chosen.score) {
            chosen = nodes[i];
        }
    }

    if (depth <= LOG_DEPTH) {
        for (let i = 0; i < nodes.length; i++) {
            let {move, score} = nodes[i];
            console.log(`possible move: ${move} score: ${score}`);
        }
        let {move, score} = chosen;
        console.log(`chosen move: ${move} score: ${score}`);
        console.groupEnd();
    }

    return chosen;
}

export default function minimaxAI(gameState) {
    return new Promise((resolve, reject) => {
        if (gameState.isGameOver) {
            reject();
        } else {
            resolve(minimax(gameState, gameState.activePlayer).move);
        }
    });
}
