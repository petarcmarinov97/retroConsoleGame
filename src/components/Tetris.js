import React, { Component } from 'react';
import { manipulate } from '../utils/pieces.js';
import TetrisScoreBoard from './TetrisScoreBoard.js'

export default class Tetris extends Component {

    componentDidMount() {
        const cvs = document.getElementById("tetris");
        const nextElement = document.getElementById("next");
        const ctx = cvs.getContext('2d');
        const nextElementCtx = nextElement.getContext('2d');

        const scoreElement = document.getElementById("score");
        const linesElement = document.getElementById("lines");
        const levelElement = document.getElementById("level");

        manipulate(ctx, nextElementCtx, scoreElement, linesElement, levelElement);
    }

    render() {
        const canvasHeight = "400px";
        const canvasWidth = "200px";
        return <>
            <canvas id="tetris" height={canvasHeight} width={canvasWidth} />
            <TetrisScoreBoard />
        </>
    }
}
