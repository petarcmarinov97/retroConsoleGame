import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from "enzyme-to-json";
import TetrisScoreBoard from '../components/TetrisScoreBoard';

describe('TetrisScoreBoard tests', () => {

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(
            <TetrisScoreBoard />);
    })

    describe('Snapshots', () => {
        it("should render correctly", () => {
            expect(shallowToJson(wrapper)).toMatchSnapshot();
        })
    })
})