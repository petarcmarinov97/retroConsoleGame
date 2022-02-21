import React, { Component } from 'react';
import Display from './Display';
import Controller from './Controller';
import Title from './Title';

export default class GameBoy extends Component {
    render() {
        const { gameTitle } = this.props;

        return <div className="game_boy">
            <>
                <Title gameTitle={gameTitle} />
                <Display />
                <Controller />
            </>
        </div>;
    }
}
