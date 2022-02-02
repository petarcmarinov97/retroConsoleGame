import React, { Component } from 'react';
import { Button as CircleButton } from 'antd';
export default class Button extends Component {
    render() {
        const { size, style, shape, label } = this.props
        const span = <span style={{ color: "black" }}>&#8635;</span>;

        return <>
            <CircleButton
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
