import React, { Component } from 'react';
import Display from './Display';
import { Typography } from 'antd';
import Controller from './Controller';
import Game from './Game';

export default class GameBoy extends Component {

    render() {
        const { Title } = Typography;
        const { gameTitle } = this.props;
        const game = <Game />

        return <div className="game_boy">
            <>
                <Title level={4}>{gameTitle}</Title>
                <Display game={game} />
                <Controller />
            </>
        </div>;
    }
}
