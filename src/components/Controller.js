import React, { Component } from 'react';
import "../styles/Controller.css";
import ArrowButtons from './ArrowButtons';
import FunctionalButtons from './FunctionalButtons';

export default class Controller extends Component {

    constructor() {
        super();

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick = (e) => {
        console.log(e);
        this.setState({ isClicked: true })
    }

    render() {
        return <div className="controller">
            <>
                <FunctionalButtons handleClick={this.handleClick}/>
                <ArrowButtons handleClick={this.handleClick}/>
            </>
        </div>;
    }
}
