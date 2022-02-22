const { PIECES, ROW, COL, SQ, VACANT, NEXTCOL, NEXTROW } = require('./tetrominoes.js');

let points = 0;
let cleans = 0;
let board = [];
let nextboard = [];
let pieceIndex = 0;
let piece = 0;
let nextPieceIndex = 0;
let nextPiece = 0;
let dropStart = Date.now();
let gameOver = false;
let isPaused = false;
let isFinished = false;
let cvs, ctx, nextElementCtx, pointsElement, cleansElement, levelElement;
let gameOverElement, pausedElement, lastGameStatsElement;

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
    if (currentCtx) {
        currentCtx.fillStyle = color;
        currentCtx.fillRect(x * SQ, y * SQ, SQ, SQ);

        currentCtx.strokeStyle = "BLACK";
        currentCtx.strokeRect(x * SQ, y * SQ, SQ, SQ);
    }
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
function createPiece(index, x = 0, y = 0) {
    return new Piece(PIECES[index][0], PIECES[index][1], x, y);
}

// The Object Piece
function Piece(tetromino, color, x = 0, y = 0) {
    this.tetromino = tetromino;
    this.color = color;
    this.tetrominoN = 0;
    this.activeTetromino = this.tetromino[this.tetrominoN];
    this.x = x;
    this.y = y;

    if (this.x === 0 && this.y === 0) {
        this.fill = fill;
        this.draw = draw;
        this.unDraw = unDraw;
    } else {
        this.fill = fill;
        this.draw = draw;
        this.unDraw = unDraw;
        this.moveDown = moveDown;
        this.moveLeft = moveLeft;
        this.moveRight = moveRight;
        this.dropElement = dropElement;
        this.rotate = rotate;
        this.collision = collision;
        this.lock = lock;
    }
}

// fill function
function fill(color, piece, ctx) {
    for (let r = 0; r < piece.activeTetromino.length; r++) {
        for (let c = 0; c < piece.activeTetromino.length; c++) {
            // we draw only occupied squares
            if (piece.activeTetromino[r][c]) {
                drawSquare(ctx, piece.x + c, piece.y + r, color);
            }
        }
    }
}

// draw a piece to the board
function draw(piece, ctx) {
    this.fill(this.color, piece, ctx);
}

// undraw a piece
function unDraw(piece, ctx) {
    this.fill(VACANT, piece, ctx);
}

// move Down the piece
function moveDown() {
    if (!this.collision(0, 1, this.activeTetromino)) {
        this.unDraw(piece, ctx);
        this.y++;
        this.draw(piece, ctx);
    } else {
        // we lock the piece and generate a new one
        this.lock();

        piece = createPiece(nextPieceIndex, 3, -2);
        piece.draw(piece, ctx)
        nextPiece.unDraw(nextPiece, nextElementCtx);
        nextPieceIndex = Math.floor(Math.random() * PIECES.length) // 0 -> 6
        nextPiece = createPiece(nextPieceIndex);
        nextPiece.draw(nextPiece, nextElementCtx);
    }
}

// move Right the piece
function moveRight() {
    if (!this.collision(1, 0, this.activeTetromino)) {
        this.unDraw(piece, ctx);
        this.x++;
        this.draw(piece, ctx);
    }
}

// move Left the piece
function moveLeft() {
    if (!this.collision(-1, 0, this.activeTetromino)) {
        this.unDraw(piece, ctx);
        this.x--;
        this.draw(piece, ctx);
    }
}

// rotate the piece
function rotate() {
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
        this.unDraw(piece, ctx);
        this.x += kick;
        this.tetrominoN = (this.tetrominoN + 1) % this.tetromino.length; // (0+1)%4 => 1
        this.activeTetromino = this.tetromino[this.tetrominoN];
        this.draw(piece, ctx);
    }
}

// Drop the piece to the down side of the board
function dropElement() {
    while (!this.collision(0, 1, this.activeTetromino)) {
        this.moveDown();
    }
}

//lock function
function lock() {
    for (let r = 0; r < this.activeTetromino.length; r++) {
        for (let c = 0; c < this.activeTetromino.length; c++) {

            // we skip the vacant squares
            if (!this.activeTetromino[r][c]) {
                continue;
            }
            // pieces to lock on top = game over
            if (this.y + r < 0) {
                // stop request animation frame
                gameOver = true;
                gameOverElement.style.display = "block";
                cvs.style.display = "none";
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

// collision function
function collision(x, y, piece) {
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

// drop the piece every 1sec
function drop() {
    let now = Date.now();
    let delta = now - dropStart;
    if (delta > 1000 - cleans * 10) {
        piece.moveDown();
        dropStart = Date.now();
    }

    if (!gameOver && !isPaused) {
        requestAnimationFrame(drop);
    }
}

//Starting a game as we creating boards for current and next piece and drawing the boards
function newGame() {
    createBoard(ROW, COL, board);
    createBoard(NEXTROW, NEXTCOL, nextboard);
    drawBoard(ctx, ROW, COL, board);
    drawBoard(nextElementCtx, NEXTROW, NEXTCOL, nextboard);

    pieceIndex = Math.floor(Math.random() * PIECES.length) // 0 -> 6
    piece = createPiece(pieceIndex, 3, -2);

    nextPieceIndex = Math.floor(Math.random() * PIECES.length) // 0 -> 6
    nextPiece = createPiece(nextPieceIndex);
    nextPiece.draw(nextPiece, nextElementCtx);

    points = 0;
    cleans = 0;
    if (pointsElement) pointsElement.innerHTML = points;
    if (cleansElement) cleansElement.innerHTML = cleans;
    if (levelElement) levelElement.innerHTML = 0;
    requestAnimationFrame(drop);
}

//Reset the elements from DOM and the flags
function resetElements() {
    isPaused = false;
    gameOver = false;
    isFinished = false;
    pausedElement.style.display = "none";
    cvs.style.display = "block";
    gameOverElement.style.display = "none";
    lastGameStatsElement.style.display = "none";
}

//Change isPaused flag and the pausedElement
function changePauseElement() {
    if (!isPaused) {
        isPaused = true;
        pausedElement.style.display = "block";
        cvs.style.display = "none";
    }
    else if (isPaused) {
        isPaused = false;
        pausedElement.style.display = "none";
        cvs.style.display = "block";
        requestAnimationFrame(drop);
    }
}

//Handler for Yes or No pressing for reset, after the Game is Over
function gameOverHandler(event) {
    let buttonId = event.target.id;

    if (buttonId === "Yes") {
        gameOver = false;
        requestAnimationFrame(drop);
        gameOverElement.style.display = "none";
        cvs.style.display = "block";
        newGame();
    }
    else if (buttonId === "No") {
        gameOverElement.style.display = "none";
        lastGameStatsElement.style.display = "block";
        lastGameStatsElement.innerHTML = `In your last game you got:\nPoints:${points}\nCleans:${cleans}\nLevel:${Math.ceil(cleans / 10)}`;
    }
}

//Handler for Yes or No pressing for continue, afther the Game is Paused
function pausedGameHandler(event) {
    let buttonId = event.target.id;

    if (buttonId === "Yes") {
        isPaused = false;
        pausedElement.style.display = "none";
        cvs.style.display = "block";
        requestAnimationFrame(drop);
    }
    else if (buttonId === "No") {
        isFinished = true;
        pausedElement.style.display = "none";
        lastGameStatsElement.style.display = "block";
        lastGameStatsElement.innerHTML = `You finished the game with:\nPoints:${points}\nCleans:${cleans}\nLevel:${Math.ceil(cleans / 10)}`;
    }
}

//onClick handler after clicking on the buttons
function onClickHandler(event) {
    actionsController(Number(event.target.id));
}

//onClick handler after pressing a button from the keyboard
function onKeyDownHandler(event) {
    actionsController(event.keyCode);
}

//A controller for all the functionality of the game
function actionsController(keyCode) {

    if (!isPaused && !gameOver) {
        switch (keyCode) {
            case 37:
                piece.moveLeft();
                break;

            case 38:
                piece.rotate();
                break;

            case 39:
                piece.moveRight();
                break;

            case 40:
                piece.moveDown();
                break;

            case 32:
                piece.dropElement();
                break;

            case 80:
                changePauseElement();
                break;

            case 82:
                resetElements();
                newGame();
                break;

            case 83:
                console.log("Sound");
                break;

            default:
                break;
        }
    }
    else if (isPaused && !isFinished) {
        switch (keyCode) {
            case 80:
                changePauseElement();
                break;

            case 82:
                resetElements();
                newGame();
                break;

            default:
                break;
        }
    }
    else if (isFinished) {
        switch (keyCode) {
            case 82:
                resetElements();
                newGame();
                break;

            default:
                break;
        }
    }
    else if (gameOver && !isPaused) {
        switch (keyCode) {
            case 82:
                resetElements();
                newGame();
                break;

            default:
                break;
        }
    }
}

function buildTetris(inputObject) {
    cvs = inputObject.cvs;
    ctx = inputObject.ctx;
    nextElementCtx = inputObject.nextElementCtx;
    pointsElement = inputObject.pointsElement;
    cleansElement = inputObject.cleansElement;
    levelElement = inputObject.levelElement;

    gameOverElement = document.getElementById("gameOver");
    pausedElement = document.getElementById("paused");
    lastGameStatsElement = document.getElementById("lastGameStats");

    //CONTROL the piece, click and keydown events
    document.addEventListener("keydown", onKeyDownHandler);
    document.addEventListener("click", onClickHandler);

    if (pausedElement) {
        pausedElement.addEventListener("click", pausedGameHandler);
    }

    if (gameOverElement) {
        gameOverElement.addEventListener("click", gameOverHandler);
    }

    //Start a new game
    newGame();
    drop();
}

module.exports = {
    buildTetris,
}