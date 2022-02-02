import React, { Component } from 'react';
import "../styles/Display.css";
import Game from './Game';
import ScoreBoard from './ScoreBoard';

export default class Display extends Component {
    render() {
        const { game } = this.props
        return <div className="display">
            <>
                {game}
                <ScoreBoard />
            </>
        </div>;
    }
}
