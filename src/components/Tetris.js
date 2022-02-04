import React, { Component } from 'react';
import { manipulate } from '../utils/pieces';

export default class Tetris extends Component {

    componentDidMount() {
        const cvs = document.getElementById("tetris");
        const ctx = cvs.getContext('2d');

        manipulate(ctx);
    }

    render() {
        const canvasHeight = "400px";
        const canvasWidth = "200px";
        return <canvas id="tetris" height={canvasHeight} width={canvasWidth} />
    }
}
