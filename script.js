const Player = (name, token) => {
    let playerName = name;

    const getName = () => playerName;
    const getToken = () => token;

    return {
        getName,
        getToken
    }
};

const gameBoard = (() => {
    let board = buildBoard();

    function buildBoard() {
        let board = [];
        let table = document.querySelector("table");
        
        for(let i = 0; i < 3; i++) {
            board[i] = new Array(3).fill(null);

            let tableRow = document.createElement("tr");
            table.appendChild(tableRow);

            for(let j = 0; j < 3; j++) {
                let tableData = document.createElement("td");
                tableData.dataset.x = i;
                tableData.dataset.y = j;

                addListeners(tableData);

                tableRow.appendChild(tableData);
            }
        }

        return board;
    };

    function addListeners(target) {
        target.addEventListener("click", placeMarker);
    }

    function placeMarker(event) {
        let data = event.target.dataset;
        let player = displayController.getPlayerName();

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

    let player1 = Player("Player 1", "X");
    let player2 = Player("Player 2", "O");

    const getRound = () => round;
    const incrementRound = () => {
        checkWinner();
        round++;
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
                victor = displayController.getPlayerName().getName();
                displayController.highlightWinner(victor);
                console.log(`The victor is: ${victor}`);

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
        player1,
        player2,
        incrementRound,
        getRound
    }
})();

const displayController = (() => {
    let playButton = document.querySelector(".play-button");
    let startButton = document.querySelector(".start-button");
    let playerNamesContainer = document.querySelector(".player-names-container");
    let tableContainer = document.querySelector(".table-container");
    let player1DisplayName = document.querySelector(".player1-display");
    let player2DisplayName = document.querySelector(".player2-display");
    
    playButton.addEventListener("click", askPlayerNames);
    startButton.addEventListener("click", startGame);
    
    function askPlayerNames() {
        playButton.style.display = "none";
        playerNamesContainer.style.display = "block";
    }
    
    function startGame() {
        let player1Field = document.querySelector("#player1");
        let player2Field = document.querySelector("#player2");

        game.player1 = Player(player1Field.value == "" ? "Player 1" : player1Field.value, "X");
        game.player2 = Player(player2Field.value == "" ? "Player 2" : player2Field.value, "O");

        displayNames();

        playerNamesContainer.style.display = "none";
        tableContainer.style.display = "block";
    }

    function displayNames() {
        player1DisplayName.textContent = `${game.player1.getName()} - X`;
        player1DisplayName.dataset.name = game.player1.getName();

        player2DisplayName.textContent = `O - ${game.player2.getName()}`;
        player2DisplayName.dataset.name = game.player2.getName();
    }

    function highlightWinner(winnerName) {
        let target = document.querySelector(`span[data-name=${winnerName}]`);
        target.classList.add("winner");
    }

    function getPlayerName() {
        let round = game.getRound();
        let victor = (round % 2) ? game.player1 : game.player2;

        return victor;
    }

    return {
        getPlayerName,
        highlightWinner
    }
})();