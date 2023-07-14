class Player{
    constructor(color){
        this.color = color;
    }
}

class ConnectFourBoard {
    constructor(player1, player2) {
        this.players = [player1, player2];
        this.currPlayer = player1;
        this.gameOver = false;
        this.board = [];
        this.rows = 6;
        this.columns = 7;
        this.heights = [];
        this.setGame();
    }

    setGame() {
        this.heights = [5, 5, 5, 5, 5, 5, 5];
        let boardBackground = document.createElement("div");
        for (let r = 0; r < this.rows; r++) {
            let row = [];
            for (let c = 0; c < this.columns; c++) {
                row.push(' ');
                boardBackground.classList.add("board");
    
                let tile = document.createElement("div");
                tile.id = r.toString() + "-" + c.toString();
                tile.classList.add("tile");
                tile.addEventListener("click", (event) => this.setPiece(event));
    
                boardBackground.appendChild(tile); // Append tile to boardBackground
            }
            document.getElementById("container").appendChild(boardBackground); // Append boardBackground to container
            this.board.push(row);
        }
    }

    setPiece(event) {
        if (this.gameOver) {
            return;
        }
        let coords = event.target.id.split("-");
         
        
        let r = parseInt(coords[0]);
        let c = parseInt(coords[1]);
    
        r = this.heights[c]; 
    
        if (r < 0) { 
            return;
        }
    
        this.board[r][c] = this.currPlayer; 
        let tile = document.getElementById(r.toString() + "-" + c.toString());
        if (this.currPlayer == this.players[0]) {
            tile.classList.add("red-piece");
            this.currPlayer = this.players[1];
        }
        else {
            tile.classList.add("yellow-piece");
            this.currPlayer = this.players[0];
        }
    
        r -= 1; 
        this.heights[c] = r; 
    
        this.checkWinner();
    }
    checkWinner() {
        const { rows, columns, board } = this;
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < columns - 3; c++){
                if (board[r][c] != ' ') {
                    if (board[r][c] == board[r][c+1] && board[r][c+1] == board[r][c+2] && board[r][c+2] == board[r][c+3]) {
                        this.setWinner(r, c);
                        return;
                    }
                }
             }
        }
    
        
        for (let c = 0; c < columns; c++) {
            for (let r = 0; r < rows - 3; r++) {
                if (board[r][c] != ' ') {
                    if (board[r][c] == board[r+1][c] && board[r+1][c] == board[r+2][c] && board[r+2][c] == board[r+3][c]) {
                        this.setWinner(r, c);
                        return;
                    }
                }
            }
        }
    
        
        for (let r = 0; r < rows - 3; r++) {
            for (let c = 0; c < columns - 3; c++) {
                if (board[r][c] != ' ') {
                    if (board[r][c] == board[r+1][c+1] && board[r+1][c+1] == board[r+2][c+2] && board[r+2][c+2] == board[r+3][c+3]) {
                        this.setWinner(r, c);
                        return;
                    }
                }
            }
        }
    
        
        for (let r = 3; r < rows; r++) {
            for (let c = 0; c < columns - 3; c++) {
                if (board[r][c] != ' ') {
                    if (board[r][c] == board[r-1][c+1] && board[r-1][c+1] == board[r-2][c+2] && board[r-2][c+2] == board[r-3][c+3]) {
                        this.setWinner(r, c);
                        return;
                    }
                }
            }
        }
    }
    setWinner(r, c) {
        let winner = document.getElementById("winner");
        if (this.board[r][c] == this.players[0]) {
            winner.innerText = "Red Wins";             
        } else {
            winner.innerText = "Yellow Wins";
        }
        this.gameOver = true;
    }
}
const player1 = new Player("red");
const player2 = new Player("yellow");
const game = new ConnectFourBoard(player1, player2);


//clicking on second board puts the click on the first board.
// const player3 = new Player("red");
// const player4 = new Player("yellow");
// const game2 = new ConnectFourBoard(player1, player2);


