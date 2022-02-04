import React, { Component } from 'react';
import "../styles/Display.css";
import Game from './Game';
import ScoreBoard from './ScoreBoard';

export default class Display extends Component {
    render() {
        return <div className="display">
            <>
                <Game />
                <ScoreBoard />
            </>
        </div>;
    }
}
