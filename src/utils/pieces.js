const { color, PIECES, ROW, COL, SQ, VACANT, NEXTCOL, NEXTROW } = require('./tetrominoes.js');

let points = 0;
let cleans = 0;
let board = [];
let nextboard = [];
let pieceIndex = 0;
let piece = 0;
let nextPieceIndex = 0;
let nextPiece = 0;

function manipulate(cvs,ctx, nextElementCtx, pointsElement, cleansElement, levelElement) {

    //Start a new game
    newGame()

    //create the board
    function createBoard(currentRow, currentCol, currentBoard) {
        for (let r = 0; r < currentRow; r++) {
            currentBoard[r] = [];
            for (let c = 0; c < currentCol; c++) {
                currentBoard[r][c] = VACANT;
            }
        }
    }

    // draw a square
    function drawSquare(currentCtx, x, y, color) {
        currentCtx.fillStyle = color;
        currentCtx.fillRect(x * SQ, y * SQ, SQ, SQ);

        currentCtx.strokeStyle = "BLACK";
        currentCtx.strokeRect(x * SQ, y * SQ, SQ, SQ);
    }

    // draw the board
    function drawBoard(currentCtx, currentRow, currentCol, currentBoard) {
        for (let r = 0; r < currentRow; r++) {
            for (let c = 0; c < currentCol; c++) {
                drawSquare(currentCtx, c, r, currentBoard[r][c]);
            }
        }
    }

    // generate Piece
    function generatePiece(r) {
        return new Piece(PIECES[r][0], PIECES[r][1]);
    }

    //generate next Piece
    function generateNextPiece() {
        nextPieceIndex = Math.floor(Math.random() * PIECES.length) // 0 -> 6
        return new getNextPiece(PIECES[nextPieceIndex][0], PIECES[nextPieceIndex][1]);
    }

    function getNextPiece(tetromino, color) {
        this.tetromino = tetromino;
        this.color = color;
        this.tetrominoN = 0;
        this.activeTetromino = this.tetromino[this.tetrominoN];
        this.x = 0;
        this.y = 0;
    }

    //fill the next piece
    function nextPiecefill(color, nextPiece) {
        for (let r = 0; r < nextPiece.activeTetromino.length; r++) {
            for (let c = 0; c < nextPiece.activeTetromino.length; c++) {
                // we draw only occupied squares
                if (nextPiece.activeTetromino[r][c]) {
                    drawSquare(nextElementCtx, nextPiece.x + c, nextPiece.y + r, color);
                }
            }
        }
    }

    // draw a nextPiece to the nextBoard
    function nextPieceDraw(nextPiece) {
        nextPiecefill(color, nextPiece);
    }

    // undraw a nextPiece
    function nextPieceUnDraw(nextPiece) {
        nextPiecefill(VACANT, nextPiece);
    }

    // The Object Piece
    function Piece(tetromino, color) {
        this.tetromino = tetromino;
        this.color = color;

        this.tetrominoN = 0; // we start from the first pattern
        this.activeTetromino = this.tetromino[this.tetrominoN];

        // we need to control the pieces
        this.x = 3;
        this.y = -2;
    }

    // fill function
    Piece.prototype.fill = function (color) {
        for (let r = 0; r < this.activeTetromino.length; r++) {
            for (let c = 0; c < this.activeTetromino.length; c++) {
                // we draw only occupied squares
                if (this.activeTetromino[r][c]) {
                    drawSquare(ctx, this.x + c, this.y + r, color);
                }
            }
        }
    }

    // draw a piece to the board
    Piece.prototype.draw = function () {
        this.fill(this.color);
    }

    // undraw a piece
    Piece.prototype.unDraw = function () {
        this.fill(VACANT);
    }

    // move Down the piece
    Piece.prototype.moveDown = function () {
        if (!this.collision(0, 1, this.activeTetromino)) {
            this.unDraw();
            this.y++;
            this.draw();
        } else {
            // we lock the piece and generate a new one
            this.lock();

            piece = generatePiece(nextPieceIndex);

            nextPieceUnDraw(nextPiece);
            nextPiece = generateNextPiece();
            nextPieceDraw(nextPiece);
        }
    }

    // move Right the piece
    Piece.prototype.moveRight = function () {
        if (!this.collision(1, 0, this.activeTetromino)) {
            this.unDraw();
            this.x++;
            this.draw();
        }
    }

    // move Left the piece
    Piece.prototype.moveLeft = function () {
        if (!this.collision(-1, 0, this.activeTetromino)) {
            this.unDraw();
            this.x--;
            this.draw();
        }
    }

    // rotate the piece
    Piece.prototype.rotate = function () {
        let nextPattern = this.tetromino[(this.tetrominoN + 1) % this.tetromino.length];
        let kick = 0;

        if (this.collision(0, 0, nextPattern)) {
            if (this.x > COL / 2) {
                // it's the right wall
                kick = -1; // we need to move the piece to the left
            } else {
                // it's the left wall
                kick = 1; // we need to move the piece to the right
            }
        }

        if (!this.collision(kick, 0, nextPattern)) {
            this.unDraw();
            this.x += kick;
            this.tetrominoN = (this.tetrominoN + 1) % this.tetromino.length; // (0+1)%4 => 1
            this.activeTetromino = this.tetromino[this.tetrominoN];
            this.draw();
        }
    }

    //lock function
    Piece.prototype.lock = function () {
        for (let r = 0; r < this.activeTetromino.length; r++) {
            for (let c = 0; c < this.activeTetromino.length; c++) {

                // we skip the vacant squares
                if (!this.activeTetromino[r][c]) {
                    continue;
                }
                // pieces to lock on top = game over
                if (this.y + r < 0) {
                    alert("Game Over");
                    // stop request animation frame
                    gameOver = true;
                    break;
                }
                // we lock the piece
                board[this.y + r][this.x + c] = this.color;
            }
        }

        points += 1;
        pointsElement.innerHTML = `${points}`;

        // remove full rows
        for (let r = 0; r < ROW; r++) {
            let isRowFull = true;
            for (let c = 0; c < COL; c++) {
                isRowFull = isRowFull && (board[r][c] !== VACANT);
            }
            if (isRowFull) {
                // if the row is full
                // we move down all the rows above it
                for (let y = r; y > 1; y--) {
                    for (let c = 0; c < COL; c++) {
                        board[y][c] = board[y - 1][c];
                    }
                }
                // the top row board[0][..] has no row above it
                for (let c = 0; c < COL; c++) {
                    board[0][c] = VACANT;
                }
                // increment the score, lines, level
                points += 10;
                cleans += 1;
                pointsElement.innerHTML = `${points}`;
                cleansElement.innerHTML = `${cleans}`;
                levelElement.innerHTML = `${Math.ceil(cleans / 10)}`;
            }
        }

        // update the board
        drawBoard(ctx, ROW, COL, board);
    }

    // collision fucntion
    Piece.prototype.collision = function (x, y, piece) {
        for (let r = 0; r < piece.length; r++) {
            for (let c = 0; c < piece.length; c++) {
                // if the square is empty, we skip it
                if (!piece[r][c]) {
                    continue;
                }
                // coordinates of the piece after movement
                let newX = this.x + c + x;
                let newY = this.y + r + y;

                // conditions
                if (newX < 0 || newX >= COL || newY >= ROW) {
                    return true;
                }
                // skip newY < 0; board[-1] will crush our game
                if (newY < 0) {
                    continue;
                }
                // check if there is a locked piece alrady in place
                if (board[newY][newX] !== VACANT) {
                    return true;
                }
            }
        }

        return false;
    }

    // CONTROL the piece, click and keydown events
    document.addEventListener("keydown", onKeyDown);

    document.addEventListener("click", onClick);

    function onClick(event) {
        controller(Number(event.target.id));
    }

    function onKeyDown(event) {
        controller(event.keyCode);
    }

    function controller(keyCode) {
        if (keyCode === 37) {
            piece.moveLeft();
        }
        else if (keyCode === 38) {
            piece.rotate();
        }
        else if (keyCode === 39) {
            piece.moveRight();
        }
        else if (keyCode === 32) {
            console.log("Drop Down");
        }
        else if (keyCode === 40) {
            piece.moveDown();
        } else if (keyCode === 80) {
            isPaused=true;
            let pausedElement = document.getElementById("paused");
            console.log(pausedElement);
            pausedElement.style.display="block";
        }
        else if (keyCode === 82) {
            console.log("Reset");
            newGame();
        }
        else if (keyCode === 83) {
            console.log("Sound");
        }
    }

    // drop the piece every 1sec
    let dropStart = Date.now();
    let gameOver = false;
    let isPaused = false;

    function drop() {
        let now = Date.now();
        let delta = now - dropStart;
        if (delta > 1000 - cleans * 10) {
            piece.moveDown();
            dropStart = Date.now();
        }
        if (!gameOver && !isPaused) {
            requestAnimationFrame(drop);
        }else{
            cancelAnimationFrame(drop)
        }
    }

    drop();

    //Starting a game as we creating boards for current and next piece and drawing the boards
    function newGame() {
        createBoard(ROW, COL, board);
        createBoard(NEXTROW, NEXTCOL, nextboard);
        drawBoard(ctx, ROW, COL, board);
        drawBoard(nextElementCtx, NEXTROW, NEXTCOL, nextboard);

        pieceIndex = Math.floor(Math.random() * PIECES.length) // 0 -> 6
        piece = generatePiece(pieceIndex);

        nextPieceIndex = 0;
        nextPiece = generateNextPiece();
        nextPiecefill(color, nextPiece);

        points = 0;
        cleans = 0;
        pointsElement.innerHTML = points;
        cleansElement.innerHTML = cleans;
        levelElement.innerHTML = 0;
    }
}

module.exports = {
    manipulate,
}