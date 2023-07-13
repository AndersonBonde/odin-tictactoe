const Player = (token) => {
    const getToken = () => token;

    return {
        getToken
    }
};

const gameBoard = (() => {
    let board = [];

    for(let i = 0; i < 3; i++) {
        board[i] = new Array(3).fill(null);
    }

    return {
        board
    }
})();

