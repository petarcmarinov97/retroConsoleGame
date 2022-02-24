import { shallow } from 'enzyme';
import { shallowToJson } from "enzyme-to-json";
import { buildTetris, createBoard, createPiece, draw, unDraw, moveDown, moveRight, moveLeft, dropElement, newGame } from '../utils/pieces.js';
const { O } = require("../utils/tetrominoes.js");

describe('Tetris tests', () => {
    let cvs, nextElement, ctx, nextElementCtx, pointsElement, cleansElement, levelElement, row, col, board, piece;

    beforeEach(() => {
        cvs = document.createElement('canvas');
        ctx = cvs.getContext('2d');
        nextElement = document.createElement('canvas');
        nextElementCtx = nextElement.getContext('2d');
        pointsElement = document.getElementById("points");
        cleansElement = document.getElementById("cleans");
        levelElement = document.getElementById("level");
        row = 20;
        col = 20;
    })

    describe("Functionallity", () => {
        it("should initialize the board correctly", () => {
            board = [];
            createBoard(row, col, board)

            expect(board.length).toBe(20);

            board.forEach(row => {
                expect(row.length).toBe(20);
            })
        })

        it("should create a piece", () => {
            let index = 3;
            let x = 3;
            let y = -2
            let expected = O[0];

            piece = createPiece(index, x, y);

            expect(piece["activeTetromino"]).toEqual(expected);
        });

        it(`should draw a piece on the board using the main ctx`, function () {
            draw(piece, ctx);

            expect(ctx.fillStyle).toBe("#000000");
            expect(ctx.strokeStyle).toBe("#000000");
        });

        it(`should undraw a piece from the board using the main ctx`, function () {
            unDraw(piece, ctx);

            expect(ctx.fillStyle).toBe("#87926e");
            expect(ctx.strokeStyle).toBe("#000000");
        });

        it(`should move the piece down by 1`, function () {
            newGame();
            piece.moveDown();

            expect(piece.y).toBe(-1);
        });

        it(`should move the piece right by 1`, function () {
            newGame();
            piece.moveRight();

            expect(piece.x).toBe(4);
        });

        it(`should move the piece left by 1`, function () {
            newGame();
            piece.moveLeft();

            expect(piece.x).toBe(3);
        });

        // it(`should drop the piece downside of the board`, function () {
        //     newGame();
        //     piece.dropElement();

        //     expect(board).toContain("#000000");
        // });

    })
})