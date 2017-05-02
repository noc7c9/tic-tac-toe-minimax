const DELAY = 1000;

function randomAI(gameState) {
    return new Promise((resolve, reject) => {
        const moves = gameState.getMoves();
        if (moves.length == 0) {
            reject();
        } else {
            let move = moves[randInt(0, moves.length)];
            setTimeout((() => resolve(move)), DELAY);
        }
    });
}

function randInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

export default randomAI;
