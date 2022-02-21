import React, { Component } from 'react';
import { arrowButtonCfg } from '../configs/buttonsCfg';
import Button from './Button';
import "../styles/ArrowButtons.css";

export default class ArrowButtons extends Component {

    render() {
        const arrowSpan = <span>&#11164;</span>

        return <div className="arrows">
            <>
                {arrowButtonCfg.map(btn => (
                    <div
                        key={btn["--i"]}
                        className="button_wrapper">
                        <div
                            style={{ "--i": btn['--i'] }}>
                            <Button
                                style={btn.style}
                                size={btn.size}
                                shape={btn.shape}
                                label={btn.label}
                                btnkey={btn.btnkey}
                            />
                            {arrowSpan}
                        </div>
                    </div>
                ))}
            </>
        </div>;
    }
}
