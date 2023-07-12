class C4Board {
    constructor() {
        this.playerRed = "R";
        this.playerYellow = "Y";
        this.currPlayer = this.playerRed;
        this.gameOver = false;
        this.board = [];
        this.rows = 6;
        this.columns = 7;
        this.heights = [];
    }

    setGame() {
        this.heights = [5, 5, 5, 5, 5, 5, 5];
        let boardBackground = document.createElement("div");
        for (let r = 0; r < this.rows; r++) {
            let row = [];
            for (let c = 0; c < this.columns; c++) {
                row.push(' ');
                boardBackground.classList.add("container");
    
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
        if (this.currPlayer == this.playerRed) {
            tile.classList.add("red-piece");
            this.currPlayer = this.playerYellow;
        }
        else {
            tile.classList.add("yellow-piece");
            this.currPlayer = this.playerRed;
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
        if (this.board[r][c] == this.playerRed) {
            winner.innerText = "Red Wins";             
        } else {
            winner.innerText = "Yellow Wins";
        }
        this.gameOver = true;
    }
}

const game = new C4Board();
game.setGame();
// const game2 = new C4Board();
// game2.setGame();
