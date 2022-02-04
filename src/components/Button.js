import React, { Component } from 'react';
import { Button as CircleButton } from 'antd';
export default class Button extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick = () => {
        const { handleClick, btnKey } = this.props;

        handleClick && handleClick(btnKey);
    }

    render() {
        const { size, style, shape, label } = this.props
        const span = <span style={{ color: "black" }}>&#8635;</span>;

        return <>
            <CircleButton
                onClick={this.handleClick}
                style={style}
                size={size}
                type="primary"
                shape={shape}
            >
                {label && span}
            </CircleButton>
        </>
    }
}
