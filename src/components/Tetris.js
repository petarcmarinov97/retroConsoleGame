import React, { Component } from 'react';
import { manipulate } from '../utils/pieces.js';
import TetrisScoreBoard from './TetrisScoreBoard.js'

export default class Tetris extends Component {

    constructor() {
        super();
        this.state = {
            isPaused: false
        }
        this.onClick = this.onClick.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.controller = this.controller.bind(this);
    }

    componentDidMount() {
        const cvs = document.getElementById("tetris");
        const nextElement = document.getElementById("next");
        const ctx = cvs.getContext('2d');
        const nextElementCtx = nextElement.getContext('2d');
        const pointsElement = document.getElementById("points");
        const cleansElement = document.getElementById("cleans");
        const levelElement = document.getElementById("level");

        manipulate(cvs,ctx, nextElementCtx, pointsElement, cleansElement, levelElement);

        document.addEventListener("click", this.onClick);
        document.addEventListener("keydown", this.onKeyDown);
    }

    onClick = (e) => {
        this.controller(Number(e.target.id));
    }

    onKeyDown = (e) => {
        this.controller(e.keyCode);
    }

    controller = (keyCode) => {
        if (keyCode === 80) {
            if (!this.state.isPaused) {
                this.setState({ isPaused: true });
            } else {
                this.setState({ isPaused: false });
            }
        }
    }

    render() {
        const canvasHeight = "400px";
        const canvasWidth = "200px";

        return <>
            <div id="paused" style={{display:'none'}}>The Game is Paused!</div>
            <canvas id="tetris" height={canvasHeight} width={canvasWidth} />
            <TetrisScoreBoard />
        </>
    }
}
