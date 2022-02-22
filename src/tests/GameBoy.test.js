import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from "enzyme-to-json";
import GameBoy from '../components/GameBoy';

describe('GameBoy tests', () => {

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(
            <GameBoy gameTitle="Tetris" />);
    })

    describe('Snapshots', () => {
        it("should render correctly", () => {
            expect(shallowToJson(wrapper)).toMatchSnapshot();
        })
    })
})