import React, { Component } from 'react';
import "../styles/ScoreBoard.css";

export default class ScoreBoard extends Component {
    render() {
        return <div className="scoreboard">
            <div
                id="score"
                >
                    Score:
            </div>
        </div>;
    }
}
