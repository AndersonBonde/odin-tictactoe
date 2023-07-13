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
    let victor = undefined;

    const player1 = Player("X");
    const player2 = Player("O");

    const getPlayer = () => {
        return (round % 2) ? player1 : player2; 
    };
    const getRound = () => round;
    const incrementRound = () => {
        checkWinner();
        round++;

        console.log(round);
    }

    function checkWinner() {
        let board = gameBoard.board;

        let firstRow = board[0];
        let secondRow = board[1];
        let thirdRow = board[2];

        let firstColumn = [board[0][0], board[1][0], board[2][0]];
        let secondColumn = [board[0][1], board[1][1], board[2][1]];
        let thirdColumn = [board[0][2], board[1][2], board[2][2]];

        let decrease = [board[0][0], board[1][1], board[2][2]];
        let increase = [board[2][0], board[1][1], board[0][2]];

        let victoryCondition = [firstRow, secondRow, thirdRow, firstColumn, secondColumn, thirdColumn, decrease, increase];

        victoryCondition.forEach(curr => {
            let firstElement = curr[0];
            
            if(curr.every(curr => curr == firstElement && curr != null)) {
                victor = getPlayer();

                console.log(`Victor is: ${victor.getToken()}`);

                return true;
            }
        })

        if(round >= 10 && victor == undefined) {
            draw();
        }
    }

    function draw() {
        console.log("Game was drawn");
    }

    return {
        getPlayer,
        getRound,
        incrementRound
    }
})();