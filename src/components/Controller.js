import React, { Component } from 'react';
import "../styles/Controller.css";
import ArrowButtons from './ArrowButtons';
import FunctionalButtons from './FunctionalButtons';

export default class Controller extends Component {

    render() {
        return <div className="controller">
            <>
                <FunctionalButtons />
                <ArrowButtons />
            </>
        </div>;
    }
}
