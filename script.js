const Player = (token) => {
    const getToken = () => token;

    return {
        getToken
    }
};

const gameBoard = (() => {
    let board = [];

    (function buildBoard() {
        let table = document.querySelector("table");
        
        for(let i = 0; i < 3; i++) {
            board[i] = new Array(3).fill(null);

            let tableRow = document.createElement("tr");
            table.appendChild(tableRow);

            for(let j = 0; j < 3; j++) {
                let tableData = document.createElement("td");
                tableData.dataset.x = i;
                tableData.dataset.y = j;

                appendListener(tableData);

                tableRow.appendChild(tableData);
            }
        }
    })();

    function appendListener(target) {
        target.addEventListener("click", placeMarker);
    }

    function placeMarker(event) {
        let data = event.target.dataset;
        let player = game.getPlayer();

        if(isEmpty(data.x, data.y, player)) {
            event.target.textContent = player.getToken();
            game.incrementRound();
        } else {
            console.log("Place already taken");
        }
    }

    function isEmpty(x, y, player) {
        if(board[x][y] == null) {
            board[x][y] = player.getToken();
            return true;
        }
    }

    return {
        board
    }
})();

const game = (() => {
    let round = 1;

    const player1 = Player("X");
    const player2 = Player("O");

    const getPlayer = () => {
        return (round % 2) ? player1 : player2; 
    };
    const getRound = () => round;
    const incrementRound = () => round++;

    return {
        getPlayer,
        getRound,
        incrementRound
    }
})();