import React, { Component } from 'react';
import Button from './Button';
import "../styles/OptionalButtons.css";
import { functionalButtonCfg } from '../configs/buttonsCfg';

export default class FunctionalButtons extends Component {
  render() {
    return <div className="optional">
      <>
        {functionalButtonCfg.map((btn, index) => (
          <div
            key={index}>
            <Button
              style={btn.style}
              size={btn.size}
              shape={btn.shape}
            />
            <span>{btn.text}</span>
          </div>
        ))}
      </>
    </div>;
  }
}
