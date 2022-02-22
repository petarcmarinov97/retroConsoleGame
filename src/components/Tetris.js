import React, { Component } from 'react';
import { buildTetris } from '../utils/pieces.js';
import GameOver from './GameOver.js';
import LastGameStats from './LastGameStats.js';
import PausedGame from './PausedGame.js';
import TetrisScoreBoard from './TetrisScoreBoard.js'

export default class Tetris extends Component {

    componentDidMount() {
        const cvs = document.getElementById("tetris");
        const nextElement = document.getElementById("next");
        const ctx = cvs && cvs.getContext('2d');
        const nextElementCtx = nextElement && nextElement.getContext('2d');
        const pointsElement = document.getElementById("points");
        const cleansElement = document.getElementById("cleans");
        const levelElement = document.getElementById("level");

        let inputObject = {
            cvs, ctx, nextElementCtx, pointsElement, cleansElement, levelElement
        }
        
        buildTetris(inputObject);
    }

    render() {
        const canvasHeight = "400px";
        const canvasWidth = "200px";
        const defaultStyle = {
            display: "none"
        }

        return <>
            <PausedGame defaultStyle={defaultStyle} />
            <GameOver defaultStyle={defaultStyle} />
            <LastGameStats defaultStyle={defaultStyle} />
            <canvas id="tetris" height={canvasHeight} width={canvasWidth} />
            <TetrisScoreBoard />
        </>
    }
}
