import React, { Component } from 'react';
import { Button as CircleButton } from 'antd';

export default class Button extends Component {

    render() {
        const { size, style, shape, label, btnkey } = this.props
        const span = <span id="38" style={{ color: "black" }}>&#8635;</span>;

        return <>
            <CircleButton
                id={btnkey}
                btnkey={btnkey}
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
