import React, { Component } from 'react';
import "../styles/Display.css";
import Game from './Game';

export default class Display extends Component {
    render() {
        return <div className="display">
            <>
                <Game />
            </>
        </div>;
    }
}
