import React, { Component } from 'react';

export default class LastGameStats extends Component {
  render() {
    const { defaultStyle } = this.props;

    return <span id="lastGameStats" style={defaultStyle}></span>
  }
}
