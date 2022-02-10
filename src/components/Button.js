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
        const { size, style, shape, label, btnkey } = this.props
        const span = <span id="38" style={{ color: "black" }}>&#8635;</span>;

        return <>
            <CircleButton
                id={btnkey}
                btnkey={btnkey}
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
