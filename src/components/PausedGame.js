import React, { Component } from 'react';

export default class PausedGame extends Component {
    render() {
        const pauseMsg = "The game is Paused.\n Do you want to continue ?";
        const { defaultStyle } = this.props;

        return <div id="paused" style={defaultStyle}>
            <span>{pauseMsg}</span>
            <div>
                <button id="Yes">Yes</button>
                <button id="No">No</button>
            </div>
        </div>
    }
}
