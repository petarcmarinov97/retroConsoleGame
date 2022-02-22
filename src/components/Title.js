import React, { Component } from 'react';
import { Typography } from 'antd';


export default class Title extends Component {
    render() {
        const { Title } = Typography;
        const { gameTitle } = this.props;

        return (
            <Title level={4}>{gameTitle}</Title>
        )
    }
}
