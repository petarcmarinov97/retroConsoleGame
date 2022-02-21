import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from "enzyme-to-json";
import GameOver from '../components/GameOver';

describe('GameOver tests', () => {

    let wrapper;
    const defaultStyle = {
        display: "none"
    }

    beforeEach(() => {
        wrapper = shallow(
            <GameOver defaultStyle={defaultStyle} />);
    })

    describe('Snapshots', () => {
        it("should render correctly", () => {
            expect(shallowToJson(wrapper)).toMatchSnapshot();
        })
    })
})