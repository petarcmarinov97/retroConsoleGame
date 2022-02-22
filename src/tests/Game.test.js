import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from "enzyme-to-json";
import Game from '../components/Game';

describe('Game tests', () => {

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(
            <Game />);
    })

    describe('Snapshots', () => {
        it("should render correctly", () => {
            expect(shallowToJson(wrapper)).toMatchSnapshot();
        })
    })
})