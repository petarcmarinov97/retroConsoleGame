import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from "enzyme-to-json";
import { buildTetris } from '../utils/pieces.js';
import Tetris from '../components/Tetris';

describe('Tetris tests', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Tetris />);
    })

    describe('Snapshots', () => {

        it("should render correctly", () => {
            expect(shallowToJson(wrapper)).toMatchSnapshot();
        })
    })
})