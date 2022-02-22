import React, { Component } from 'react';
import "../styles/ScoreBoard.css";

export default class TetrisScoreBoard extends Component {
    render() {
        const canvasHeight = "80px";
        const canvasWidth = "80px";

        return <div className="scoreboard">
            <div >
                Points
                <span id="points">0</span>
            </div>
            <div >
                Cleans
                <span id="cleans">0</span>
            </div>
            <div >
                Level
                <span id="level">0</span>
            </div>
            <div>Next</div>
            <canvas id="next" height={canvasHeight} width={canvasWidth} />
        </div>;
    }
}
