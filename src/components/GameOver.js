import React, { Component } from 'react';

export default class GameOver extends Component {
    render() {
        const gameOverMsg = "The Game is Over!\n Do you want to start a new game ?";
        const { defaultStyle } = this.props;

        return <div id="gameOver" style={defaultStyle}>
            <span>{gameOverMsg}</span>
            <div>
                <button id="Yes">Yes</button>
                <button id="No">No</button>
            </div>
        </div>
    }
}
